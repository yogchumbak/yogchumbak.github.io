/** Run after npm run build: node scripts/check-retired-program.js */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const schedule = require('../src/_data/schedule.json');
const retiredProgram = /kids(?:[\s_-]|%20)*yoga/i;
assert.deepEqual(schedule.specialPrograms.map(program => program.name), ['Breathwork & Meditation']);

// Exercise the browser fallback without a DOM or additional dependencies.
const context = { document: { addEventListener() {} } };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'src/js/schedule.js'), 'utf8'), context);
assert.equal(retiredProgram.test(JSON.stringify(context.getScheduleData())), false);
assert.equal(context.getScheduleData().specialPrograms[0].name, 'Breathwork & Meditation');

for (const file of [
  'src/_data/schedule.json', 'src/_data/slider.json', 'src/_includes/footer.html',
  'src/index.html', 'scripts/generate-schedule-pdf.js', 'src/js/pdf-generator.js'
]) {
  assert.equal(retiredProgram.test(fs.readFileSync(path.join(root, file), 'utf8')), false, file);
}

// Inspect all rendered pages and copied code, but retain unused media assets.
function checkRendered(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) checkRendered(file);
    else if (/\.(html|js|css|json)$/i.test(entry.name)) {
      assert.equal(retiredProgram.test(fs.readFileSync(file, 'utf8')), false, file);
    }
  }
}
checkRendered(path.join(root, 'dist'));
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
assert.ok(html.includes('Breathwork & Meditation'));
for (const batch of schedule.batches) assert.ok(html.includes(batch.name), batch.name);

// jsPDF's current uncompressed text streams can be checked without a PDF dependency.
const pdf = fs.readFileSync(path.join(root, 'dist/YogChumbak-Schedule.pdf'), 'latin1');
assert.equal(retiredProgram.test(pdf), false, 'generated PDF');
assert.ok(pdf.includes('Weekend Meditation:'), 'PDF retains weekend meditation');
assert.ok(pdf.includes('Breathwork &'), 'PDF retains breathwork');
console.log('PASS: retired program absent from active content, fallback, rendered pages and PDF; meditation retained');
