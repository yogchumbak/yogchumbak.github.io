module.exports = function(eleventyConfig) {
  const fs = require('fs');
  const path = require('path');
  const Image = require('@11ty/eleventy-img');

  // Copy CSS and JS files to output
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Copy gallery images
  eleventyConfig.addPassthroughCopy("src/galleries/**/images");
  
  // Gallery collection - load gallery data files
  eleventyConfig.addCollection("galleries", function(collection) {
    const galleries = [];
    
    // Read gallery data from each gallery's gallery.json file
    const fs = require('fs');
    const path = require('path');
    
    const galleriesDir = path.join(__dirname, 'src/galleries');
    
    if (fs.existsSync(galleriesDir)) {
      const galleryFolders = fs.readdirSync(galleriesDir);
      
      galleryFolders.forEach(folder => {
        const galleryJsonPath = path.join(galleriesDir, folder, 'gallery.json');
        if (fs.existsSync(galleryJsonPath)) {
          const galleryData = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
          galleries.push({
            fileSlug: folder,
            data: galleryData
          });
        }
      });
    }
    
    return galleries;
  });
  
  // Gallery pages collection
  eleventyConfig.addCollection("galleryPages", function(collection) {
    return collection.getFilteredByGlob("src/galleries/*/index.md");
  });
  
  // Shortcode to include gallery data
  eleventyConfig.addShortcode("galleryData", function(gallerySlug) {
    const galleryJsonPath = path.join(__dirname, 'src/galleries', gallerySlug, 'gallery.json');

    if (fs.existsSync(galleryJsonPath)) {
      return JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
    }
    return null;
  });

  // Optimize and copy images after build
  eleventyConfig.on('eleventy.after', async () => {
    console.log('Optimizing and copying images...');

    // 1. Optimize cervical_pain.png
    const cervicalPainSrc = path.join(__dirname, 'src/images/cervical_pain.png');
    if (fs.existsSync(cervicalPainSrc)) {
      console.log('Optimizing cervical_pain.png...');
      await Image(cervicalPainSrc, {
        widths: [800, 1200],
        formats: ['webp', 'jpeg'],
        outputDir: './dist/images/optimized/',
        filenameFormat: function (id, src, width, format) {
          return `cervical_pain-${width}.${format}`;
        }
      });
      console.log('✓ Optimized cervical_pain.png');
    }

    // 2. Copy and rename gallery images
    console.log('Copying and renaming gallery images...');

    const galleryRootPath = path.join(__dirname, 'gallery');
    const outputPath = path.join(__dirname, 'dist/galleries-images');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Get galleries data (same logic as _data/galleries.js)
    if (!fs.existsSync(galleryRootPath)) {
      console.warn('Gallery directory not found:', galleryRootPath);
      return;
    }

    const galleryFolders = fs.readdirSync(galleryRootPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.startsWith('_'))
      .map(dirent => dirent.name);

    let totalCopied = 0;

    for (const folderName of galleryFolders) {
      const folderPath = path.join(galleryRootPath, folderName);

      // Generate slug
      const slug = folderName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

      // Create output directory for this gallery
      const galleryOutputPath = path.join(outputPath, slug);
      if (!fs.existsSync(galleryOutputPath)) {
        fs.mkdirSync(galleryOutputPath, { recursive: true });
      }

      // Read and copy files
      const allFiles = fs.readdirSync(folderPath)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm'].includes(ext);
        });

      // Separate cover images from regular images (same logic as galleries.js)
      const coverImages = allFiles.filter(file => file.toLowerCase().startsWith('cover_')).sort();
      const regularImages = allFiles.filter(file => !file.toLowerCase().startsWith('cover_')).sort();

      // Combine: cover images first, then regular images
      const files = [...coverImages, ...regularImages];

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const sourcePath = path.join(folderPath, file);
        const ext = path.extname(file).toLowerCase();
        const sequenceNum = (index + 1) * 10;
        const paddedNum = String(sequenceNum).padStart(3, '0');

        // Generate new filename
        let baseName = slug;
        if (baseName.length > 20) {
          baseName = baseName.split('-').slice(0, 3).join('-');
        }
        const newFilename = `${baseName}-${paddedNum}${ext}`;

        // For videos, just copy
        if (['.mp4', '.webm'].includes(ext)) {
          const destPath = path.join(galleryOutputPath, newFilename);
          fs.copyFileSync(sourcePath, destPath);
          totalCopied++;
        } else {
          // For images, optimize them and crop ultra-wide images to max 2:1 aspect ratio
          const sharp = require('sharp');
          const metadata = await sharp(sourcePath).metadata();
          const aspectRatio = metadata.width / metadata.height;
          const maxAspectRatio = 2.0;
          const baseWithoutExt = newFilename.replace(ext, '');

          // If ultra-wide, pre-process with Sharp to crop to 2:1, then use eleventy-img
          if (aspectRatio > maxAspectRatio) {
            const tempPath = path.join(galleryOutputPath, `${baseWithoutExt}-temp.jpg`);

            try {
              // Crop to 2:1 aspect ratio with Sharp, save as temp file
              await sharp(sourcePath)
                .resize(metadata.width, Math.round(metadata.width / maxAspectRatio), {
                  fit: 'cover',
                  position: 'center'
                })
                .jpeg({ quality: 90 })
                .toFile(tempPath);

              // Delete old files first to force regeneration
              const formats = ['webp', 'jpeg'];
              const widths = [600, 960];
              for (const width of widths) {
                for (const format of formats) {
                  const existingFile = path.join(galleryOutputPath, `${baseWithoutExt}-${width}.${format}`);
                  if (fs.existsSync(existingFile)) {
                    fs.unlinkSync(existingFile);
                  }
                }
              }

              // Now process the cropped temp file with eleventy-img
               try {
                 // For ultra-wide images, always use width-based sizing since we're cropping to 2:1
                 await Image(tempPath, {
                   widths: [600, 960],
                   formats: ['webp', 'jpeg'],
                   outputDir: galleryOutputPath,
                   filenameFormat: function (id, src, width, format) {
                     // Use consistent naming for ultra-wide images
                     const targetWidth = width === 600 ? 600 : 960;
                     return `${baseWithoutExt}-${targetWidth}.${format}`;
                   }
                 });
              } catch (imgError) {
                console.error(`Error processing ${newFilename} with eleventy-img:`, imgError.message);
                throw imgError;
              }
            } finally {
              // Always delete temp file, even if processing failed
              if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
              }
            }
          } else {
            // Smart processing based on image orientation
            const metadata = await sharp(sourcePath).metadata();
            const aspectRatio = metadata.width / metadata.height;
            
            // First, fix any rotation issues by ensuring correct orientation
            let fixedImage;
            if (metadata.orientation && metadata.orientation > 1) {
              // Auto-rotate to correct orientation
              fixedImage = await sharp(sourcePath)
                .rotate(metadata.orientation)
                .toBuffer();
            } else {
              // No rotation needed, use original
              fixedImage = sourcePath;
            }
            
            // Always generate both 600px and 960px variants for all images
            // This ensures consistency with template expectations
            if (aspectRatio < 0.75) {
              // Portrait images (tall): generate each size separately to ensure both exist
              await Image(fixedImage, {
                heights: [600],
                formats: ['webp', 'jpeg'],
                outputDir: galleryOutputPath,
                filenameFormat: function (id, src, height, format) {
                  return `${baseWithoutExt}-600.${format}`;
                }
              });
              
              await Image(fixedImage, {
                heights: [960],
                formats: ['webp', 'jpeg'],
                outputDir: galleryOutputPath,
                filenameFormat: function (id, src, height, format) {
                  return `${baseWithoutExt}-960.${format}`;
                }
              });
            } else {
              // Landscape/square images: generate each size separately to ensure both exist
              await Image(fixedImage, {
                widths: [600],
                formats: ['webp', 'jpeg'],
                outputDir: galleryOutputPath,
                filenameFormat: function (id, src, width, format) {
                  return `${baseWithoutExt}-600.${format}`;
                }
              });
              
              await Image(fixedImage, {
                widths: [960],
                formats: ['webp', 'jpeg'],
                outputDir: galleryOutputPath,
                filenameFormat: function (id, src, width, format) {
                  return `${baseWithoutExt}-960.${format}`;
                }
              });
            }
          totalCopied++;
        }
      }
    }
    }

    console.log(`✓ Processed and optimized ${totalCopied} gallery files`);
  });

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};