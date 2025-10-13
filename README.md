# Yog Chumbak - Eleventy Website

A modern, templated static website for Yog Chumbak yoga studio built with Eleventy (11ty).

## Features

✅ **Templated Structure**: Modular components and sections  
✅ **Gallery System**: Easy-to-manage image galleries with JSON configuration  
✅ **Front Page Slider**: Configurable hero slider with multiple slides  
✅ **Responsive Design**: Mobile-first approach  
✅ **GitHub Pages Ready**: Automatic deployment with GitHub Actions  
✅ **Easy Content Management**: Update content without touching HTML  

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
# Visit http://localhost:8080

# Build for production
npm run build
```

## Directory Structure

```
src/
├── _includes/          # Template includes (header, footer, etc.)
├── _data/             # Global data files (JSON)
├── sections/          # Individual page sections
├── galleries/         # Gallery collections
│   ├── studio/        
│   │   ├── images/    # Gallery images
│   │   ├── gallery.json # Gallery configuration
│   │   └── index.md   # Gallery page
│   ├── events/
│   └── classes/
├── css/              # Stylesheets
├── js/               # JavaScript
└── index.html        # Homepage
```

## Adding New Content

### 1. Adding Gallery Collections

Create a new folder in `src/galleries/`:

```bash
mkdir src/galleries/new-gallery
mkdir src/galleries/new-gallery/images
```

Add `gallery.json`:
```json
{
  "title": "New Gallery",
  "description": "Description of your gallery",
  "preview_image": "https://example.com/preview.jpg",
  "images": [
    {
      "filename": "image1.jpg",
      "title": "Image Title",
      "caption": "Image caption"
    }
  ]
}
```

Copy `index.md` from another gallery and update the title.

### 2. Updating Slider

Edit `src/_data/slider.json`:
```json
[
  {
    "title": "Slide Title",
    "subtitle": "Slide description", 
    "image": "https://example.com/image.jpg",
    "link": "#section",
    "buttonText": "Button Text"
  }
]
```

### 3. Updating Site Info

Edit `src/_data/site.json` to update contact info, social links, etc.

## Deployment

### GitHub Pages (Automatic)

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select "GitHub Actions" as source
4. The site will auto-deploy on every push to main/master

### Manual Deployment

```bash
npm run build
# Upload contents of `dist/` folder to your web host
```

## File Organization

- **Sections**: Individual page sections in `src/sections/`
- **Templates**: Reusable templates in `src/_includes/`
- **Data**: Configuration files in `src/_data/`
- **Galleries**: Self-contained gallery collections
- **Assets**: CSS, JS, and images automatically copied to output

## Benefits of This Setup

✅ **Easy Updates**: Edit individual sections without touching whole pages  
✅ **Simple Galleries**: Drop images in folders + update JSON  
✅ **No Database**: Everything is file-based  
✅ **Fast Loading**: Static HTML, optimized for performance  
✅ **Version Control**: All content is in Git  
✅ **Scalable**: Add new pages and sections easily  

## Customization

- **Styles**: Edit `src/css/main.css`
- **JavaScript**: Edit `src/js/main.js`  
- **Templates**: Modify files in `src/_includes/`
- **Content**: Update data files and sections

---

Built with ❤️ using [Eleventy](https://www.11ty.dev/)