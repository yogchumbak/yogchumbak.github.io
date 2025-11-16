# Typography System - Yog Chumbak Website

## 🎯 Overview

A modern, professional two-font typography system designed for maximum readability and clear visual hierarchy, optimized for therapeutic wellness content.

---

## 📚 Font Pairing Strategy

### **Primary Font: Plus Jakarta Sans** (Headings)
- **Role:** H1, H2, H3, H4, H5, H6
- **Character:** Bold, strong, modern display font
- **Weights Used:** 400, 500, 600, 700, 800
- **Purpose:** Creates strong visual hierarchy and professional presence
- **Ideal For:** Grabbing attention, section titles, card headings

### **Secondary Font: Inter** (Body Text)
- **Role:** Paragraphs, body copy, UI text
- **Character:** Highly legible, clean, comfortable to read
- **Weights Used:** 400, 500, 600, 700
- **Purpose:** Ensures comfortable reading for therapeutic content
- **Ideal For:** Long-form text, descriptions, therapeutic information

### **Accent Font: Noto Sans Devanagari**
- **Role:** Hindi/Devanagari text support
- **Weights Used:** 400, 500, 600, 700

---

## 📐 Typography Scale

### Desktop (> 768px)

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **H1** | 3.5rem (56px) | 800 (Extrabold) | 1.1 | -0.03em |
| **H2** | 2.75rem (44px) | 700 (Bold) | 1.2 | -0.02em |
| **H3** | 2rem (32px) | 600 (Semibold) | 1.2 | -0.02em |
| **H4** | 1.5rem (24px) | 600 (Semibold) | 1.2 | -0.02em |
| **H5** | 1.25rem (20px) | 600 (Semibold) | 1.2 | -0.02em |
| **H6** | 1rem (16px) | 600 (Semibold) | 1.2 | -0.02em |
| **Body** | 1.125rem (18px) | 400 (Normal) | 1.6 | 0em |
| **Small** | 0.875rem (14px) | 400 (Normal) | 1.6 | 0em |

### Mobile (≤ 768px)

| Element | Size | Weight |
|---------|------|--------|
| **H1** | 2.5rem (40px) | 800 |
| **H2** | 2rem (32px) | 700 |
| **H3** | 1.5rem (24px) | 600 |
| **H4** | 1.25rem (20px) | 600 |
| **Body** | 1rem (16px) | 400 |

### Small Mobile (≤ 480px)

| Element | Size |
|---------|------|
| **H1** | 2rem (32px) |
| **H2** | 1.75rem (28px) |
| **H3** | 1.375rem (22px) |

---

## 🎨 CSS Variables

### Font Families
```css
--font-heading: var(--theme-font-heading, 'Plus Jakarta Sans', 'Inter', ...);
--font-body: var(--theme-font-body, 'Inter', 'Work Sans', ...);
--font-display: var(--font-heading);  /* Legacy compatibility */
--font-primary: var(--font-body);     /* Legacy compatibility */
```

### Typography Scale
```css
--font-size-h1: 3.5rem;
--font-size-h2: 2.75rem;
--font-size-h3: 2rem;
--font-size-h4: 1.5rem;
--font-size-body: 1.125rem;
--font-size-small: 0.875rem;
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Line Heights
```css
--line-height-tight: 1.2;      /* Headings */
--line-height-normal: 1.6;     /* Body text - spacious & scannable */
--line-height-relaxed: 1.8;    /* Therapeutic content */
```

### Letter Spacing
```css
--letter-spacing-tight: -0.02em;   /* Large headings */
--letter-spacing-normal: 0em;      /* Body text */
--letter-spacing-wide: 0.02em;     /* Small caps, labels */
```

---

## 🎯 Hierarchy Guidelines

### H1 - Hero Title
- **Purpose:** Large, impactful, visually distinct
- **Usage:** Main page title, hero section headline
- **Example:** "Transform Your Body & Mind"
- **Characteristics:**
  - Largest font size (56px desktop)
  - Extrabold weight (800)
  - Tightest line height (1.1)
  - Maximum visual impact

### H2 - Section Titles
- **Purpose:** Strong presence, clear structure
- **Usage:** Major section headings (About, Schedule, etc.)
- **Example:** "Why Choose Yog Chumbak?"
- **Characteristics:**
  - 44px desktop
  - Bold weight (700)
  - Draws eye to key sections

### H3 - Card Titles
- **Purpose:** Clear hierarchy, eye-catching
- **Usage:** Card headings, subsection titles
- **Example:** "Pain Relief Through Yoga"
- **Characteristics:**
  - 32px desktop
  - Semibold weight (600)
  - Balances prominence with readability

### Body Text
- **Purpose:** Maximum readability
- **Size:** Generous 18px (desktop)
- **Line Height:** Spacious 1.6 (60% extra space)
- **Special:** Therapeutic content uses 1.8 line height for extra comfort

---

## 📱 Responsive Behavior

### Desktop First Approach
1. **Desktop (> 768px):** Full scale typography
2. **Tablet (≤ 768px):** Reduced by ~30%
3. **Mobile (≤ 480px):** Further reduced for small screens

### Automatic Scaling
- CSS variables automatically adjust at breakpoints
- All components inherit responsive sizes
- No manual updates needed per component

---

## 🎨 Theme-Level Configuration

### Yog Chumbak Theme (Default)
```css
[data-theme="yog-chumbak"] {
  --theme-font-heading: 'Plus Jakarta Sans', 'Inter', ...;
  --theme-font-body: 'Inter', 'Work Sans', ...;
}
```

### Original Magenta Theme
```css
[data-theme="original"] {
  --theme-font-heading: 'Spectral', 'Noto Sans Devanagari', Georgia, serif;
  --theme-font-body: 'Work Sans', ...;
}
```

### Deep Focus Theme
```css
[data-theme="deep-focus"] {
  --theme-font-heading: 'Space Mono', 'Courier New', monospace;
  --theme-font-body: 'Inter', ...;
}
```

Each theme can define custom typography!

---

## ✅ Readability Features

### 1. **Generous Body Text**
- 18px base size (vs standard 16px)
- Easier reading for therapeutic content
- Reduces eye strain

### 2. **Spacious Line Heights**
- 1.6 for normal text (60% extra space between lines)
- 1.8 for therapeutic content (80% extra)
- Improves scannability

### 3. **Consistent Spacing**
- Margins between paragraphs: 1rem (16px)
- Margins after headings: Scaled by hierarchy
- Clear vertical rhythm

### 4. **Therapeutic Content Class**
```css
.therapeutic-content p,
.about-content p {
  line-height: var(--line-height-relaxed);  /* 1.8 */
  margin-bottom: var(--space-5);            /* 20px */
}
```

---

## 🚀 Implementation

### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### CSS Integration
All typography is centrally managed in `main.css` via CSS variables. Components automatically inherit the system.

---

## 📊 Design Rationale

### Why This Pairing?

1. **Plus Jakarta Sans** (Headings)
   - Modern, geometric sans-serif
   - Excellent weight range for hierarchy
   - Professional yet approachable
   - Perfect for wellness brand

2. **Inter** (Body)
   - Designed specifically for screen readability
   - Clear at all sizes
   - Neutral, doesn't compete with headings
   - Industry-standard for modern web

3. **Contrast Without Conflict**
   - Both are sans-serif for cohesion
   - Different enough for clear hierarchy
   - Both optimized for digital reading

---

## 🎯 Best Practices

### Do's ✅
- Use H1 only once per page (hero title)
- Follow hierarchical order (H1 → H2 → H3)
- Use body text size variables for consistency
- Apply `.therapeutic-content` class for long-form wellness content

### Don'ts ❌
- Don't skip heading levels (H2 → H4)
- Don't hardcode font sizes
- Don't use headings for styling (use classes)
- Don't reduce body text below 16px on mobile

---

## 🔄 Migration from Previous System

### Old → New
- `--font-display: 'Spectral'` → `--font-heading: 'Plus Jakarta Sans'`
- `--font-body: 'Work Sans'` → `--font-body: 'Inter'`
- Fixed sizes → CSS variable-based scale
- Manual responsive sizes → Automatic breakpoint adjustments

### Legacy Support
Old variable names still work via aliases for backward compatibility.

---

## 📈 Performance

- **Font Loading:** Preconnect + optimized weights
- **File Size:** Only necessary weights loaded
- **FOUT Prevention:** System font fallbacks
- **Render Speed:** Variable fonts for faster loading

---

**Last Updated:** 2025-11-16
**Version:** 2.0
**Status:** Production Ready ✅
