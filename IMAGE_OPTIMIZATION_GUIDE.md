# Image Optimization Guide - Yog Chumbak Website

## Current Image Inventory

### Local Images (src/images/)

| Filename | Current Size | Type | Usage | Optimization Priority |
|----------|--------------|------|-------|---------------------|
| `back_pain.png` | 1.2MB | PNG | Condition card background | HIGH ⚠️ |
| `frozen_shoulder.png` | 1.2MB | PNG | Condition card background | HIGH ⚠️ |
| `knee_pain.png` | 1.2MB | PNG | Condition card background | HIGH ⚠️ |
| `kids_yoga.jpeg` | 288KB | JPEG | Program card background | MEDIUM |
| `instructor_1.jpeg` | 111KB | JPEG | Unused/Gallery | LOW |
| `instructor_2.jpeg` | 66KB | JPEG | Unused/Gallery | LOW |
| `yogchumbak_logo.png` | 55KB | PNG | Header logo | LOW ✅ |

### External Images (Unsplash)

| Usage | Current Source | Recommendation |
|-------|---------------|----------------|
| Hero background | Unsplash CDN | Download, optimize, serve locally |
| Guide portrait | Unsplash CDN | Download, optimize, serve locally |
| Program cards (2) | Unsplash CDN | Download, optimize, serve locally |

## Optimization Targets

### High Priority (>1MB)
**Condition Card Backgrounds**: `back_pain.png`, `frozen_shoulder.png`, `knee_pain.png`

**Current**: 1.2MB each (3.6MB total)
**Target**: < 150KB each (< 450KB total)
**Savings**: ~3.2MB (88% reduction)

**Strategy**:
1. Convert PNG to WebP format
2. Compress to quality 80-85
3. Resize if currently larger than displayed size (typically 800px wide max for cards)
4. Provide JPEG fallback for older browsers

### Medium Priority (200KB-500KB)
**Kids Yoga Image**: `kids_yoga.jpeg`

**Current**: 288KB
**Target**: < 150KB
**Savings**: ~138KB (48% reduction)

**Strategy**:
1. Convert to WebP
2. Compress JPEG fallback to quality 80
3. Check actual display size and resize accordingly

### Low Priority (<100KB)
These images are already reasonably optimized:
- `instructor_1.jpeg` (111KB) ✅
- `instructor_2.jpeg` (66KB) ✅
- `yogchumbak_logo.png` (55KB) ✅

## Implementation Plan

### Phase 1: Convert High Priority Images

#### Tools Required
- **ImageMagick** or **Sharp** (Node.js library)
- **cwebp** (Google's WebP encoder)
- Or use online tools like Squoosh, TinyPNG, or Cloudinary

#### Command Examples

**Using ImageMagick**:
```bash
# Convert PNG to WebP
convert back_pain.png -quality 85 -resize 800x back_pain.webp

# Compress to optimized JPEG fallback
convert back_pain.png -quality 80 -resize 800x back_pain.jpg
```

**Using cwebp**:
```bash
# Convert to WebP with high quality
cwebp -q 85 -resize 800 0 back_pain.png -o back_pain.webp
```

**Using Sharp (Node.js)**:
```javascript
const sharp = require('sharp');

sharp('back_pain.png')
  .resize(800)
  .webp({ quality: 85 })
  .toFile('back_pain.webp');

sharp('back_pain.png')
  .resize(800)
  .jpeg({ quality: 80 })
  .toFile('back_pain.jpg');
```

### Phase 2: Update HTML with Picture Elements

Replace current `background-image` inline styles with `<picture>` elements or update CSS with WebP support.

#### Option 1: Picture Element (Recommended)
```html
<div class="condition-card">
  <picture>
    <source srcset="/images/back_pain.webp" type="image/webp">
    <source srcset="/images/back_pain.jpg" type="image/jpeg">
    <img src="/images/back_pain.jpg" alt="Back pain therapy" loading="lazy">
  </picture>
  <div class="condition-card-overlay"></div>
  <div class="condition-card-content">
    <!-- content -->
  </div>
</div>
```

#### Option 2: CSS with WebP Support
```css
.condition-card.back-pain {
  background-image: url('/images/back_pain.webp');
}

/* Fallback for browsers without WebP support */
.no-webp .condition-card.back-pain {
  background-image: url('/images/back_pain.jpg');
}
```

### Phase 3: Implement Responsive Images

Use `srcset` for different screen sizes:

```html
<picture>
  <source
    srcset="/images/back_pain-400.webp 400w,
            /images/back_pain-800.webp 800w,
            /images/back_pain-1200.webp 1200w"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/webp">
  <source
    srcset="/images/back_pain-400.jpg 400w,
            /images/back_pain-800.jpg 800w,
            /images/back_pain-1200.jpg 1200w"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
    type="image/jpeg">
  <img src="/images/back_pain-800.jpg" alt="Back pain therapy" loading="lazy">
</picture>
```

### Phase 4: Download and Optimize Unsplash Images

Current external images that should be localized:

1. **Hero Background**
   - URL: `https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80`
   - Download at 1920px width
   - Convert to WebP + JPEG
   - Target size: < 300KB

2. **Guide Portrait**
   - URL: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
   - Download at 800px width
   - Convert to WebP + JPEG
   - Target size: < 150KB

3. **Program Cards**
   - Regular batch: `photo-1545389336-cf090694435e`
   - Meditation: `photo-1506126613408-eca07ce68773`
   - Download at 800px width
   - Convert to WebP + JPEG
   - Target size: < 150KB each

## Expected Performance Gains

### Before Optimization
- Total image weight: ~5.5MB
- First load time: 8-12 seconds on 3G
- LCP (Largest Contentful Paint): ~4-6 seconds

### After Optimization
- Total image weight: ~1.2MB
- First load time: 2-4 seconds on 3G
- LCP: ~1.5-2.5 seconds
- **Improvement**: 78% reduction, 4-6 seconds faster

## Browser Support

### WebP Support
- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Safari 14+
- ✅ Edge 18+
- ✅ Opera 12.1+
- 📱 All modern mobile browsers

**Coverage**: ~96% of global users

### Fallback Strategy
Always provide JPEG/PNG fallback for:
- Older Safari versions (< 14)
- Internet Explorer
- Older Android browsers

## Automated Optimization Script

Create an npm script for future image optimization:

**package.json**:
```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js"
  },
  "devDependencies": {
    "sharp": "^0.33.0"
  }
}
```

**scripts/optimize-images.js**:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/images';
const outputDir = './src/images/optimized';

const sizes = [400, 800, 1200];
const quality = { webp: 85, jpeg: 80 };

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (!file.match(/\\.(png|jpg|jpeg)$/i)) continue;

    const inputPath = path.join(inputDir, file);
    const baseName = path.parse(file).name;

    for (const size of sizes) {
      // Generate WebP
      await sharp(inputPath)
        .resize(size)
        .webp({ quality: quality.webp })
        .toFile(path.join(outputDir, `${baseName}-${size}.webp`));

      // Generate JPEG
      await sharp(inputPath)
        .resize(size)
        .jpeg({ quality: quality.jpeg })
        .toFile(path.join(outputDir, `${baseName}-${size}.jpg`));
    }

    console.log(`✅ Optimized: ${file}`);
  }
}

optimizeImages().catch(console.error);
```

## Implementation Checklist

### Immediate Actions
- [ ] Install Sharp or ImageMagick
- [ ] Convert high-priority PNG files to WebP + JPEG
- [ ] Resize images to appropriate display dimensions
- [ ] Update HTML/CSS to use optimized images
- [ ] Test WebP support detection

### Short-term Actions
- [ ] Download Unsplash images locally
- [ ] Optimize and convert downloaded images
- [ ] Implement `<picture>` elements for all images
- [ ] Add `loading="lazy"` to all images
- [ ] Test on slow connection (Fast 3G)

### Long-term Actions
- [ ] Set up automated optimization pipeline
- [ ] Implement responsive image srcsets
- [ ] Consider CDN for image delivery
- [ ] Monitor Core Web Vitals (LCP, CLS)
- [ ] Set up image performance budgets

## Testing & Validation

### Performance Testing Tools
1. **Lighthouse** (Chrome DevTools)
   - Target: 90+ Performance score
   - Check: LCP < 2.5s, FCP < 1.8s

2. **WebPageTest**
   - Test on 3G connection
   - Check: Total image weight < 1.5MB

3. **PageSpeed Insights**
   - Validate Core Web Vitals
   - Check image optimization suggestions

### Visual Regression Testing
- Compare original vs optimized images
- Ensure no visible quality loss
- Verify aspect ratios maintained

## Maintenance

### Adding New Images
1. Always run through optimization script
2. Generate WebP + fallback format
3. Create multiple sizes for srcset
4. Add to image inventory
5. Update this documentation

### Quarterly Review
- Audit total image weight
- Check for unused images
- Verify optimization still effective
- Update browser support statistics

## Resources

### Tools
- [Squoosh](https://squoosh.app/) - Online image optimizer
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [Sharp](https://sharp.pixelplumbing.com/) - Node.js image processing
- [cwebp](https://developers.google.com/speed/webp/docs/cwebp) - WebP encoder

### References
- [WebP Browser Support](https://caniuse.com/webp)
- [MDN: Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Google: Optimize Images](https://web.dev/fast/#optimize-your-images)

---

**Status**: 📋 Documentation complete, optimization pending
**Priority**: HIGH - Immediate 3.2MB savings available
**Estimated Time**: 2-3 hours for full implementation
**Last Updated**: 2025-11-16
