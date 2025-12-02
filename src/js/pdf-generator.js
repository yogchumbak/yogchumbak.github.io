/**
 * Schedule PDF Generator
 * Generates a downloadable PDF with schedule, contact info, location, and QR code
 */

class SchedulePDFGenerator {
  constructor() {
    this.siteName = 'Yog Chumbak';
    this.websiteUrl = 'https://yogchumbak.com';
    this.scheduleData = [];
  }

  /**
   * Parse schedule data from the HTML table
   */
  parseScheduleData() {
    const table = document.querySelector('.schedule-table');
    if (!table) return;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.scheduleData = [];

    // Get all rows (skip header row)
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const batchNameCell = row.querySelector('.batch-name');
      if (!batchNameCell) return;

      const batchName = batchNameCell.textContent.trim();
      const rowData = [batchName];

      // Get all time cells (skip first column which is batch name)
      const timeCells = row.querySelectorAll('td:not(.batch-name)');

      timeCells.forEach((cell, index) => {
        if (index >= days.length) return;

        const isActive = cell.classList.contains('active');
        if (isActive) {
          const timeText = cell.textContent.trim();
          // Remove line breaks and get just the time
          const time = timeText.split('\n')[0].trim();
          rowData.push(time);
        } else {
          rowData.push('-');
        }
      });

      this.scheduleData.push(rowData);
    });
  }

  /**
   * Get contact information from the page
   */
  getContactInfo() {
    // Parse from site data or use defaults
    return {
      address: 'D 60/2 B, Anand Vihar',
      address_line2: 'Ghaziabad, Uttar Pradesh 201012',
      phone: '+91 99992 41199',
      phone2: '+91 99588 41199',
      email: 'yogchumbak@gmail.com'
    };
  }

  /**
   * Generate and download the PDF
   */
  async generatePDF() {
    try {
      // Check if jsPDF is available
      if (typeof window.jspdf === 'undefined') {
        alert('PDF library is loading. Please try again in a moment.');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');

      let yPosition = 20;

      // ========================================
      // HEADER SECTION
      // ========================================

      // Title
      doc.setFontSize(24);
      doc.setTextColor(131, 36, 124); // Primary color
      doc.text(this.siteName, 105, yPosition, { align: 'center' });

      yPosition += 8;

      // Tagline
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text('Yoga for Pain Relief & Holistic Wellness', 105, yPosition, { align: 'center' });

      yPosition += 12;

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

      // Parse schedule data
      this.parseScheduleData();

      // Create schedule table using autoTable
      doc.autoTable({
        startY: yPosition,
        head: [['Batch', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']],
        body: this.scheduleData,
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

      // Weekend Meditation - get dates from the page
      const meditationDates = document.getElementById('meditation-dates')?.textContent || '2nd & 4th Sunday';
      doc.setFont(undefined, 'bold');
      doc.text('Weekend Meditation:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(`${meditationDates}, 12:30 - 1:30 PM`, 56, yPosition);

      yPosition += 12;

      // ========================================
      // CONTACT INFORMATION
      // ========================================

      const contact = this.getContactInfo();

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
      doc.text(contact.address, 45, yPosition);
      yPosition += 5;
      doc.text(contact.address_line2, 45, yPosition);

      yPosition += 7;

      // Phone
      doc.setFont(undefined, 'bold');
      doc.text('Phone:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(`${contact.phone}, ${contact.phone2}`, 45, yPosition);

      yPosition += 7;

      // Email
      doc.setFont(undefined, 'bold');
      doc.text('Email:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(contact.email, 45, yPosition);

      yPosition += 7;

      // Website
      doc.setFont(undefined, 'bold');
      doc.text('Website:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(41, 128, 185); // Blue link color
      doc.text(this.websiteUrl, 45, yPosition);

      // ========================================
      // QR CODE
      // ========================================

      // Generate QR code
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, this.websiteUrl, {
        width: 300,
        margin: 1,
        color: {
          dark: '#83247C',  // Primary color
          light: '#FFFFFF'
        }
      });

      const qrDataUrl = qrCanvas.toDataURL('image/png');

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

      const fileName = `YogChumbak-Schedule-${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  }
}

// Initialize PDF generator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const pdfButton = document.getElementById('download-schedule-pdf');

  if (pdfButton) {
    pdfButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const generator = new SchedulePDFGenerator();
      await generator.generatePDF();
    });
  }
});
