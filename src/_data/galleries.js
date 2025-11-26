const fs = require('fs');
const path = require('path');

module.exports = function() {
  const galleries = [];
  const galleryRootPath = path.join(__dirname, '../../gallery');

  // Check if gallery directory exists
  if (!fs.existsSync(galleryRootPath)) {
    console.warn('Gallery directory not found:', galleryRootPath);
    return galleries;
  }

  // Read all folders in gallery directory (exclude hidden/disabled folders)
  const galleryFolders = fs.readdirSync(galleryRootPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.startsWith('_'))
    .map(dirent => dirent.name);

  galleryFolders.forEach(folderName => {
    const folderPath = path.join(galleryRootPath, folderName);

    // Read all image and video files
    const allFiles = fs.readdirSync(folderPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.heic'].includes(ext);
      });

    // Separate cover images from regular images
    // Files starting with 'cover_' (case-insensitive) will be used as cover photos
    const coverImages = allFiles.filter(file => file.toLowerCase().startsWith('cover_')).sort();
    const regularImages = allFiles.filter(file => !file.toLowerCase().startsWith('cover_')).sort();
    
    // Combine: cover images first, then regular images
    // This ensures the first image (images[0]) is always the cover photo if one exists
    const files = [...coverImages, ...regularImages];

    if (files.length === 0) {
      return; // Skip empty folders
    }

    // Generate slug from folder name
    const slug = folderName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Generate gallery title (capitalize words)
    const title = folderName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Generate description based on folder name
    let description = `Photo and video gallery of ${title.toLowerCase()} sessions`;

    // Customize descriptions based on folder name patterns
    if (folderName.toLowerCase().includes('kids')) {
      description = 'Yoga classes specially designed for children to build strength, flexibility, and mindfulness';
    } else if (folderName.toLowerCase().includes('therapy') || folderName.toLowerCase().includes('therapies')) {
      description = 'Personalized therapeutic yoga sessions tailored to individual needs for pain relief and healing';
    } else if (folderName.toLowerCase().includes('regular')) {
      description = 'Group yoga classes for all levels focusing on props-based practice and alignment';
    } else if (folderName.toLowerCase().includes('social')) {
      description = 'Community outreach programs and free yoga sessions for social welfare';
    } else if (folderName.toLowerCase().includes('video')) {
      description = 'Therapeutic yoga practice videos and demonstrations';
    }

    // Generate images array with spaced numbering
    const images = files.map((file, index) => {
      const ext = path.extname(file);
      const isVideo = ['.mp4', '.webm'].includes(ext.toLowerCase());
      const sequenceNum = (index + 1) * 10;
      const paddedNum = String(sequenceNum).padStart(3, '0');

      // Generate new filename with descriptive name and spaced numbering
      let baseName = slug;
      if (baseName.length > 20) {
        // Shorten very long names
        baseName = baseName.split('-').slice(0, 3).join('-');
      }
      const newFilename = `${baseName}-${paddedNum}${ext}`;

      // Generate title
      const itemNumber = index + 1;
      let itemTitle = `${title} ${itemNumber}`;
      if (isVideo) {
        itemTitle = `${title} Video ${itemNumber}`;
      }

      // Generate caption
      let caption = isVideo ? 'Video demonstration' : 'Yoga session';
      if (folderName.toLowerCase().includes('kids')) {
        caption = 'Fun and engaging yoga for children';
      } else if (folderName.toLowerCase().includes('therapy')) {
        caption = 'Personalized healing session';
      } else if (folderName.toLowerCase().includes('regular')) {
        caption = 'Group practice session';
      } else if (folderName.toLowerCase().includes('social')) {
        caption = 'Free yoga for the community';
      }

      // Assign size for variable bento-grid layout
      let size = 'small';
      let featured = false;

      // First item is always large and featured for nice hero
      if (index === 0) {
        size = 'large';
        featured = true;
      }
      // Every 9th item (after first) is large and featured (creates visual anchor points)
      else if (index % 9 === 0) {
        size = 'large';
        featured = true;
      }
      // Every 3rd item (but not 9th or first) is medium
      else if (index % 3 === 0) {
        size = 'medium';
      }
      // All others are small

      return {
        originalFilename: file,
        filename: newFilename,
        title: itemTitle,
        caption: caption,
        type: isVideo ? 'video' : 'image',
        sequenceNumber: sequenceNum,
        size: size,
        featured: featured
      };
    });

    galleries.push({
      slug: slug,
      title: title,
      folderName: folderName,
      description: description,
      fileCount: files.length,
      images: images,
      previewImage: images[0]?.filename || '',
      url: `/galleries/${slug}/`
    });
  });

  // Sort galleries alphabetically by title
  galleries.sort((a, b) => a.title.localeCompare(b.title));

  console.log(`Found ${galleries.length} galleries with ${galleries.reduce((sum, g) => sum + g.fileCount, 0)} total files`);

  return galleries;
};
