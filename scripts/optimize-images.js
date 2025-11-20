const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const inputDir = './src/images';
const outputDir = './src/images/optimized';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image sizes to generate (responsive images)
const sizes = [400, 800, 1200];
const quality = { webp: 85, jpeg: 80 };

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(inputDir);
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    // Skip if not an image or if it's the optimized directory
    if (!file.match(/\.(png|jpg|jpeg|heic)$/i) || file === 'optimized') {
      continue;
    }

    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = (originalStats.size / 1024).toFixed(2);
    totalOriginalSize += originalStats.size;

    const isHeic = file.toLowerCase().endsWith('.heic');
    const fileType = isHeic ? 'HEIC' : 'Image';
    console.log(`📷 Processing ${fileType}: ${file} (${originalSizeKB} KB)`);

    // For HEIC files, convert to JPEG buffer first
    let imageBuffer;
    if (isHeic) {
      try {
        const heicBuffer = fs.readFileSync(inputPath);
        const jpegBuffer = await heicConvert({
          buffer: heicBuffer,
          format: 'JPEG',
          quality: 0.9
        });
        imageBuffer = jpegBuffer;
        console.log(`   🔄 Converted HEIC to JPEG buffer`);
      } catch (convertError) {
        console.error(`   ❌ HEIC conversion failed:`, convertError.message);
        continue; // Skip this file if conversion fails
      }
    }

    for (const size of sizes) {
      try {
        let sharpInstance;
        if (isHeic && imageBuffer) {
          sharpInstance = sharp(imageBuffer);
        } else {
          sharpInstance = sharp(inputPath);
        }

        // Generate WebP
        const webpPath = path.join(outputDir, `${baseName}-${size}.webp`);
        await sharpInstance
          .resize(size)
          .webp({ quality: quality.webp })
          .toFile(webpPath);

        const webpStats = fs.statSync(webpPath);
        const webpSizeKB = (webpStats.size / 1024).toFixed(2);
        totalOptimizedSize += webpStats.size;
        console.log(`   ✅ ${baseName}-${size}.webp (${webpSizeKB} KB)`);

        // Generate JPEG fallback
        const jpegPath = path.join(outputDir, `${baseName}-${size}.jpg`);
        // Create a new sharp instance for the second conversion
        const jpegSharpInstance = isHeic && imageBuffer ? sharp(imageBuffer) : sharp(inputPath);
        await jpegSharpInstance
          .resize(size)
          .jpeg({ quality: quality.jpeg })
          .toFile(jpegPath);

        const jpegStats = fs.statSync(jpegPath);
        const jpegSizeKB = (jpegStats.size / 1024).toFixed(2);
        totalOptimizedSize += jpegStats.size;
        console.log(`   ✅ ${baseName}-${size}.jpg (${jpegSizeKB} KB)`);

      } catch (error) {
        console.error(`   ❌ Error processing ${file} at ${size}px:`, error.message);
      }
    }

    console.log('');
  }

  // Summary
  const originalSizeMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
  const optimizedSizeMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);
  const savedMB = (originalSizeMB - optimizedSizeMB).toFixed(2);
  const savedPercent = ((savedMB / originalSizeMB) * 100).toFixed(1);

  console.log('=' .repeat(60));
  console.log('✨ Image Optimization Complete!\n');
  console.log(`📊 Original size:   ${originalSizeMB} MB`);
  console.log(`📊 Optimized size:  ${optimizedSizeMB} MB`);
  console.log(`💾 Savings:         ${savedMB} MB (${savedPercent}% reduction)`);
  console.log('=' .repeat(60));
  console.log('\n📁 Optimized images saved to: src/images/optimized/');
  console.log('\n📝 Next steps:');
  console.log('   1. Update HTML to use <picture> elements with WebP + JPEG fallback');
  console.log('   2. Replace old image references with optimized versions');
  console.log('   3. Test on multiple browsers to verify WebP support');
  console.log('');
}

optimizeImages().catch(console.error);
