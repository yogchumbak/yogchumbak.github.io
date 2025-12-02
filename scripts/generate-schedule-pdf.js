/**
 * Build-time PDF Generator for Yog Chumbak Schedule
 * Generates a static PDF during the build process
 */

const jsPDF = require('jspdf').jsPDF;
const autoTable = require('jspdf-autotable').default;
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Load site data and schedule data from JSON configs
const siteData = require('../src/_data/site.json');
const scheduleConfig = require('../src/_data/schedule.json');

// Prepare site data
const site = {
  name: siteData.title,
  tagline: siteData.subtitle,
  websiteUrl: siteData.url,
  address: siteData.address,
  addressLine2: siteData.address_line2,
  phone: siteData.phone,
  phone2: siteData.phone2,
  email: siteData.email,
  logoPath: path.join(__dirname, '../src/images/yogchumbak_logo.png')
};

/**
 * Convert schedule JSON to PDF table format
 */
function convertScheduleToTableData() {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const tableData = [];

  // Process regular batches
  scheduleConfig.batches.forEach(batch => {
    const row = [batch.name];
    days.forEach(day => {
      row.push(batch.schedule[day] || '-');
    });
    tableData.push(row);
  });

  // Process special programs
  scheduleConfig.specialPrograms.forEach(program => {
    const row = [program.name];
    days.forEach(day => {
      row.push(program.schedule[day] || '-');
    });
    tableData.push(row);
  });

  return tableData;
}

/**
 * Calculate 2nd and 4th Sunday of current month
 */
function calculate2ndAnd4thSunday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Find the first Sunday
  let firstSunday = 1;
  while (new Date(year, month, firstSunday).getDay() !== 0) {
    firstSunday++;
  }

  // Calculate 2nd and 4th Sunday
  const secondSunday = firstSunday + 7;
  const fourthSunday = firstSunday + 21;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = monthNames[month];

  // Check if 4th Sunday exists in current month
  const date4th = new Date(year, month, fourthSunday);
  const nextMonth = new Date(year, month + 1, 1);
  const isFourthSundayValid = date4th < nextMonth;

  if (isFourthSundayValid) {
    return `${secondSunday} ${currentMonth} & ${fourthSunday} ${currentMonth}`;
  } else {
    return `${secondSunday} ${currentMonth} only`;
  }
}

/**
 * Generate the PDF
 */
async function generatePDF() {
  try {
    console.log('🎨 Generating schedule PDF...');

    const doc = new jsPDF('p', 'mm', 'a4');
    let yPosition = 15;

    // ========================================
    // HEADER SECTION WITH LOGO
    // ========================================

    // Load and add logo
    if (fs.existsSync(site.logoPath)) {
      const logoBuffer = fs.readFileSync(site.logoPath);
      const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

      // Add logo centered at top
      // Logo aspect ratio: 1079/451 = 2.39:1
      const logoWidth = 40;
      const logoHeight = logoWidth / 2.39; // Maintain correct aspect ratio: ~16.74mm
      const logoX = (210 - logoWidth) / 2; // Center on A4 width (210mm)

      doc.addImage(logoBase64, 'PNG', logoX, yPosition, logoWidth, logoHeight);
      yPosition += logoHeight + 5;
    } else {
      // Fallback to text-only header
      doc.setFontSize(24);
      doc.setTextColor(131, 36, 124);
      doc.text(site.name, 105, yPosition, { align: 'center' });
      yPosition += 8;
    }

    // Tagline
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(site.tagline, 105, yPosition, { align: 'center' });

    yPosition += 10;

    // Divider line
    doc.setDrawColor(131, 36, 124);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    yPosition += 10;

    // ========================================
    // SCHEDULE TABLE
    // ========================================

    doc.setFontSize(16);
    doc.setTextColor(131, 36, 124);
    doc.text('Weekly Class Schedule', 20, yPosition);

    yPosition += 8;

    // Create schedule table using JSON config data
    const scheduleTableData = convertScheduleToTableData();

    autoTable(doc, {
      startY: yPosition,
      head: [['Batch', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']],
      body: scheduleTableData,
      theme: 'grid',
      headStyles: {
        fillColor: [131, 36, 124],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        halign: 'center',
        valign: 'middle'
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold', cellWidth: 40 }
      },
      alternateRowStyles: {
        fillColor: [246, 239, 245]
      },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable.finalY + 10;

    // ========================================
    // SPECIAL PROGRAMS
    // ========================================

    doc.setFontSize(12);
    doc.setTextColor(131, 36, 124);
    doc.text('Special Programs', 20, yPosition);

    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);

    // Kids Yoga
    doc.setFont(undefined, 'bold');
    doc.text('Kids Yoga:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text('Saturday & Sunday, 11:00 AM - 12:00 PM', 45, yPosition);

    yPosition += 5;

    // Weekend Meditation
    const meditationDates = calculate2ndAnd4thSunday();
    doc.setFont(undefined, 'bold');
    doc.text('Weekend Meditation:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(`${meditationDates}, 12:30 - 1:30 PM`, 56, yPosition);

    yPosition += 12;

    // ========================================
    // CONTACT INFORMATION
    // ========================================

    doc.setFontSize(14);
    doc.setTextColor(131, 36, 124);
    doc.text('Contact Information', 20, yPosition);

    yPosition += 8;

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    // Address
    doc.setFont(undefined, 'bold');
    doc.text('Address:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(site.address, 45, yPosition);
    yPosition += 5;
    doc.text(site.addressLine2, 45, yPosition);

    yPosition += 7;

    // Phone
    doc.setFont(undefined, 'bold');
    doc.text('Phone:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(`${site.phone}, ${site.phone2}`, 45, yPosition);

    yPosition += 7;

    // Email
    doc.setFont(undefined, 'bold');
    doc.text('Email:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.text(site.email, 45, yPosition);

    yPosition += 7;

    // Website
    doc.setFont(undefined, 'bold');
    doc.text('Website:', 20, yPosition);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(41, 128, 185); // Blue link color
    doc.text(site.websiteUrl, 45, yPosition);

    // ========================================
    // QR CODE
    // ========================================

    console.log('📱 Generating QR code...');

    // Generate QR code
    const qrDataUrl = await QRCode.toDataURL(site.websiteUrl, {
      width: 300,
      margin: 1,
      color: {
        dark: '#83247C',  // Primary color
        light: '#FFFFFF'
      }
    });

    // Position QR code on the right side
    const qrSize = 50;
    const qrX = 190 - qrSize - 10;
    const qrY = yPosition - 40;

    doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

    // QR Code label
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Scan to visit website', qrX + (qrSize / 2), qrY + qrSize + 4, { align: 'center' });

    // ========================================
    // FOOTER
    // ========================================

    yPosition = 280;

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated on ${new Date().toLocaleDateString('en-IN')}`, 105, yPosition, { align: 'center' });

    yPosition += 4;
    doc.text('© 2025 Yog Chumbak. All rights reserved.', 105, yPosition, { align: 'center' });

    // ========================================
    // SAVE PDF
    // ========================================

    // Ensure output directory exists (11ty builds to dist)
    const outputDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'YogChumbak-Schedule.pdf');
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    fs.writeFileSync(outputPath, pdfBuffer);

    console.log(`✅ PDF generated successfully: ${outputPath}`);
    return outputPath;

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    throw error;
  }
}

// Run the generator
if (require.main === module) {
  generatePDF()
    .then(() => {
      console.log('✨ PDF generation complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ PDF generation failed:', error);
      process.exit(1);
    });
}

module.exports = { generatePDF };
