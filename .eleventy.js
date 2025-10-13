module.exports = function(eleventyConfig) {
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
    const fs = require('fs');
    const path = require('path');
    const galleryJsonPath = path.join(__dirname, 'src/galleries', gallerySlug, 'gallery.json');
    
    if (fs.existsSync(galleryJsonPath)) {
      return JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
    }
    return null;
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