# Gallery Cover Photo Selection

## Overview
You can now control which photo appears as the cover image for each gallery by using the `cover_` filename prefix convention.

## How to Use

### Method 1: Rename Existing Photo
1. Choose the photo you want as the cover
2. Rename it to start with `cover_`
3. Example: `IMG-20250118-WA0017.jpg` → `cover_IMG-20250118-WA0017.jpg`

### Method 2: Copy and Prefix
1. Copy the desired cover photo
2. Rename the copy with `cover_` prefix
3. Example: `cp photo.jpg cover_photo.jpg`

## Examples

```
gallery-folder/
├── cover_best-photo.jpg          ← This becomes the cover photo
├── regular-photo-1.jpg
├── regular-photo-2.jpg
└── another-photo.jpg
```

## Behavior

- **Priority**: Any file starting with `cover_` (case-insensitive) becomes the cover photo
- **Multiple covers**: If multiple `cover_` files exist, the first alphabetically becomes the cover
- **Fallback**: If no `cover_` image exists, the first image (alphabetically) is used (previous behavior)
- **Supported formats**: All supported image formats (.jpg, .jpeg, .png, .gif, .webp, .heic)

## Implementation Notes

- The cover photo appears in:
  - Gallery index page (`/galleries/`)
  - Gallery preview cards
  - Social media previews
- The original photo remains in the gallery with all other images
- No configuration files needed - pure filename convention

## Current Galleries with Cover Photos

- **Kids Yoga**: `cover_20241025_154836.jpg`
- **One to One Therapies**: `cover_IMG-20250118-WA0017.jpg`
- **Prop based Yoga Sessions**: (no cover photo - uses first image)
- **Social Cause**: (no cover photo - uses first image)