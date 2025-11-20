const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const galleryDir = './gallery';
const backupDir = './gallery-backup';
const maxWidth = 1920; // Maximum width for web
const quality = { webp: 85, jpeg: 80 };

// Create backup directory
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function optimizeGalleryImages() {
  console.log('🖼️  Starting gallery image optimization...\n');

  const galleryFolders = fs.readdirSync(galleryDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedFiles = 0;
  let skippedFiles = 0;

  for (const folder of galleryFolders) {
    const folderPath = path.join(galleryDir, folder);
    const backupFolderPath = path.join(backupDir, folder);
    
    // Create backup folder
    if (!fs.existsSync(backupFolderPath)) {
      fs.mkdirSync(backupFolderPath, { recursive: true });
    }

    console.log(`\n📁 Processing folder: ${folder}`);
    
    const files = fs.readdirSync(folderPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.heic'].includes(ext);
      });

    for (const file of files) {
      const inputPath = path.join(folderPath, file);
      const backupPath = path.join(backupFolderPath, file);
      const ext = path.extname(file).toLowerCase();
      const baseName = path.parse(file).name;
      const isHeic = ext === '.heic';

      // Skip if already optimized (check file size)
      const stats = fs.statSync(inputPath);
      const fileSizeKB = (stats.size / 1024).toFixed(2);
      
      // Skip files smaller than 200KB (already optimized)
      if (stats.size < 200 * 1024 && !isHeic) {
        console.log(`   ⏭️  Skipping ${file} (${fileSizeKB} KB) - already small enough`);
        skippedFiles++;
        continue;
      }

      // Create backup
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
        console.log(`   💾 Backed up: ${file}`);
      }

      totalOriginalSize += stats.size;
      console.log(`   🔄 Optimizing: ${file} (${fileSizeKB} KB)`);

      try {
        let imageBuffer;
        let processedImage;

        if (isHeic) {
          // Convert HEIC to JPEG buffer first
          const heicBuffer = fs.readFileSync(inputPath);
          imageBuffer = await heicConvert({
            buffer: heicBuffer,
            format: 'JPEG',
            quality: 0.9
          });
          processedImage = sharp(imageBuffer);
        } else {
          processedImage = sharp(inputPath);
        }

        // Get metadata to determine if resizing is needed
        const metadata = await processedImage.metadata();
        
        // Resize if image is wider than maxWidth
        if (metadata.width > maxWidth) {
          processedImage = processedImage.resize(maxWidth, null, {
            withoutEnlargement: true,
            fit: 'inside'
          });
          console.log(`   📏 Resizing from ${metadata.width}px to ${maxWidth}px`);
        }

        // Determine output format
        let outputPath;
        if (isHeic) {
          // Convert HEIC to JPEG
          outputPath = path.join(folderPath, `${baseName}.jpg`);
          await processedImage.jpeg({ quality: quality.jpeg }).toFile(outputPath);
          
          // Remove original HEIC file
          fs.unlinkSync(inputPath);
          console.log(`   🗑️  Removed original HEIC: ${file}`);
          console.log(`   ✅ Created optimized: ${baseName}.jpg`);
        } else {
          // Use temporary file for in-place optimization
          const tempPath = path.join(folderPath, `${baseName}_temp${ext}`);
          
          if (ext === '.png') {
            await processedImage.png({ quality: 90 }).toFile(tempPath);
          } else {
            await processedImage.jpeg({ quality: quality.jpeg }).toFile(tempPath);
          }
          
          // Replace original with optimized version
          fs.unlinkSync(inputPath);
          fs.renameSync(tempPath, inputPath);
          console.log(`   ✅ Optimized: ${file}`);
        }

        // Calculate new size
        const newStats = fs.statSync(isHeic ? outputPath : inputPath);
        totalOptimizedSize += newStats.size;
        processedFiles++;

        const savingsKB = ((stats.size - newStats.size) / 1024).toFixed(2);
        const savingsPercent = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);
        console.log(`   💾 Size reduction: ${savingsKB} KB (${savingsPercent}%)`);

      } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
        
        // Restore from backup if optimization failed
        if (fs.existsSync(backupPath)) {
          fs.copyFileSync(backupPath, inputPath);
          console.log(`   🔄 Restored from backup: ${file}`);
        }
      }
    }
  }

  // Summary
  const originalSizeMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const optimizedSizeMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);
  const savedMB = (originalSizeMB - optimizedSizeMB).toFixed(2);
  const savedPercent = originalSizeMB > 0 ? ((savedMB / originalSizeMB) * 100).toFixed(1) : 0;

  console.log('\n' + '='.repeat(60));
  console.log('✨ Gallery Optimization Complete!\n');
  console.log(`📊 Files processed: ${processedFiles}`);
  console.log(`📊 Files skipped: ${skippedFiles}`);
  console.log(`📊 Original size:   ${originalSizeMB} MB`);
  console.log(`📊 Optimized size:  ${optimizedSizeMB} MB`);
  console.log(`💾 Savings:         ${savedMB} MB (${savedPercent}% reduction)`);
  console.log('=' .repeat(60));
  console.log('\n📁 Backups saved to: ./gallery-backup/');
  console.log('\n📝 Next steps:');
  console.log('   1. Test the website to ensure images display correctly');
  console.log('   2. If everything works, delete the backup folder');
  console.log('   3. Commit the optimized images to git');
  console.log('');
}

// Run the optimization
optimizeGalleryImages().catch(console.error);