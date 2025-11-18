# Content Layout & Imagery Strategy - Yog Chumbak Homepage

## 🎯 Vision

Transform the Yog Chumbak homepage into a **high-end, therapeutic wellness experience** that combines professional design, compelling content, and curated imagery to match the visual impact of premium wellness brands.

---

## 📐 Homepage Architecture

### **Layout Flow (Top to Bottom)**

1. **Hero Section** - Visual Impact + Primary CTA
2. **Why Yog Chumbak?** - 3-Column Trust Builders
3. **Meet Your Guide** - 2-Column Story Section
4. **Conditions We Specialize In** - 2-Column Icon List
5. **Our Programs** - 3-Column Visual Cards
6. **Testimonials** - Social Proof Slider
7. **Visit Our Studio** - Location + Ambiance
8. **FAQ** - Common Questions

---

## 1️⃣ HERO SECTION - Visual Impact

### **Design Approach: Full-Width Visual Hero**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│            [FULL-WIDTH HERO IMAGE]                  │
│         (Soft-focus, peaceful yoga scene)           │
│                                                     │
│         Transform Your Body & Mind                  │
│    Therapeutic Iyengar Yoga for Pain Relief &       │
│              Holistic Wellness                      │
│                                                     │
│          [Book Your First Class] CTA                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### **Content Structure**
```html
<section class="hero-visual">
  <div class="hero-image-container">
    <img src="[HIGH-QUALITY HERO IMAGE]" alt="Peaceful yoga practice">
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content">
    <h1>Transform Your Body & Mind</h1>
    <p class="hero-subtitle">Therapeutic Iyengar Yoga for Pain Relief & Holistic Wellness</p>
    <a href="#schedule" class="cta-button-primary">Book Your First Class</a>
  </div>
</section>
```

### **Imagery Requirements**

**Hero Image Criteria:**
- **Type:** Professional yoga photography
- **Subject:** Single person or small group in peaceful pose
- **Setting:** Natural light, clean studio environment
- **Mood:** Calm, therapeutic, aspirational
- **Quality:** High-resolution (1920x1080 minimum)
- **Color Palette:** Warm, neutral tones with soft focus
- **Composition:** Rule of thirds, space for text overlay

**Recommended Unsplash Searches:**
- "therapeutic yoga calm"
- "peaceful yoga studio natural light"
- "iyengar yoga props"
- "wellness meditation peace"

**Example URLs (Unsplash):**
1. `https://images.unsplash.com/photo-1599901860904-17e6ed7083a0` - Peaceful yoga pose
2. `https://images.unsplash.com/photo-1506126613408-eca07ce68773` - Serene meditation
3. `https://images.unsplash.com/photo-1588286840104-8957b019727f` - Yoga with props

---

## 2️⃣ WHY YOG CHUMBAK? - Trust Builders

### **Design Approach: 3-Column Icon Cards**

```
┌──────────────┬──────────────┬──────────────┐
│   [ICON]     │   [ICON]     │   [ICON]     │
│              │              │              │
│Expert        │Iyengar       │Individual    │
│Guidance      │Method        │Care          │
│              │              │              │
│[Description] │[Description] │[Description] │
└──────────────┴──────────────┴──────────────┘
```

### **Content Structure**
```html
<section class="why-section">
  <div class="container">
    <h2>Why Yog Chumbak?</h2>
    <p class="section-subtitle">What sets us apart in Delhi's yoga landscape</p>

    <div class="why-grid">
      <!-- Card 1 -->
      <div class="why-card">
        <div class="why-icon">
          <svg><!-- Expert Icon --></svg>
        </div>
        <h3>Expert Guidance</h3>
        <p>10+ years experience with Certified Pranic Healer expertise</p>
      </div>

      <!-- Card 2 -->
      <div class="why-card">
        <div class="why-icon">
          <svg><!-- Iyengar Icon --></svg>
        </div>
        <h3>Iyengar Method</h3>
        <p>Precision alignment using props for therapeutic healing</p>
      </div>

      <!-- Card 3 -->
      <div class="why-card">
        <div class="why-icon">
          <svg><!-- Care Icon --></svg>
        </div>
        <h3>Individual Care</h3>
        <p>Small batches (max 8-10) for personalized attention</p>
      </div>
    </div>
  </div>
</section>
```

### **Icon Strategy**

**Modern, Line-Based Icons:**
- Use Lucide Icons or Heroicons
- Style: Outline (not filled)
- Size: 48px - 64px
- Color: `var(--primary-color)` (magenta)
- Stroke width: 2px

**Recommended Icons:**
1. **Expert Guidance:** `user-check`, `award`, `shield-check`
2. **Iyengar Method:** `activity`, `target`, `compass`
3. **Individual Care:** `heart`, `users`, `hand-heart`

**Implementation:**
```html
<div class="why-icon">
  <svg width="48" height="48" fill="none" stroke="var(--primary-color)" stroke-width="2">
    <!-- Icon path -->
  </svg>
</div>
```

---

## 3️⃣ MEET YOUR GUIDE - Story Section

### **Design Approach: 2-Column Layout (Image + Story)**

```
┌────────────────────────────────────────────┐
│  ┌────────────┐   ┌──────────────────────┐ │
│  │            │   │  Meet Suman Hora     │ │
│  │  PORTRAIT  │   │                      │ │
│  │   IMAGE    │   │  [Story Text]        │ │
│  │            │   │  [Credentials]       │ │
│  └────────────┘   │  [Call to Action]    │ │
│                   └──────────────────────┘ │
└────────────────────────────────────────────┘
```

### **Content Structure**
```html
<section class="instructor-section">
  <div class="container">
    <div class="instructor-grid">
      <!-- Image Column -->
      <div class="instructor-image-wrapper">
        <img src="[PROFESSIONAL PORTRAIT]" alt="Suman Hora - Founder">
        <div class="image-accent"></div>
      </div>

      <!-- Story Column -->
      <div class="instructor-story">
        <h2>Meet Your Guide</h2>
        <h3>Suman Hora</h3>
        <p class="instructor-title">Founder & Certified Iyengar Yoga Teacher</p>

        <div class="story-content">
          <p>From homemaker to yogapreneur—proof that transformation is possible at any age.</p>
          <p>[Personal journey, credentials, philosophy]</p>
        </div>

        <div class="credentials">
          <ul>
            <li>10+ years of teaching experience</li>
            <li>Certified Pranic Healer</li>
            <li>Specialized in therapeutic applications</li>
          </ul>
        </div>

        <a href="#schedule" class="cta-button-secondary">Book a Session</a>
      </div>
    </div>
  </div>
</section>
```

### **Imagery Requirements**

**Portrait Criteria:**
- **Type:** Professional headshot or 3/4 body shot
- **Setting:** Clean, neutral background or yoga studio
- **Lighting:** Soft, natural, professional
- **Expression:** Warm, approachable, confident
- **Composition:** Eye-level, well-framed
- **Quality:** High-resolution portrait

**Style Notes:**
- Professional but approachable
- Yoga attire appropriate
- Natural, authentic expression
- No overly staged poses

---

## 4️⃣ CONDITIONS WE SPECIALIZE IN - Icon List

### **Design Approach: 2-Column Icon List**

```
┌─────────────────────────────────────────────┐
│   Conditions We Can Help With               │
├─────────────────┬───────────────────────────┤
│ ✓ Back Pain     │ ✓ Sciatica               │
│ ✓ Knee Issues   │ ✓ Shoulder Problems      │
│ ✓ Cervical      │ ✓ Anxiety & Stress       │
│ ✓ Arthritis     │ ✓ Poor Posture           │
└─────────────────┴───────────────────────────┘
```

### **Content Structure**
```html
<section class="conditions-section">
  <div class="container">
    <h2>Conditions We Specialize In</h2>
    <p class="section-subtitle">Therapeutic healing through precise, mindful practice</p>

    <div class="conditions-grid">
      <div class="condition-item">
        <svg class="check-icon"><!-- Check icon --></svg>
        <span>Chronic Back Pain</span>
      </div>
      <div class="condition-item">
        <svg class="check-icon"><!-- Check icon --></svg>
        <span>Sciatica Relief</span>
      </div>
      <!-- Repeat for all conditions -->
    </div>
  </div>
</section>
```

### **Icon Strategy**

**Checkmark Icon:**
- **Style:** Filled circle with check
- **Size:** 24px
- **Color:** `var(--primary-color)` (magenta)
- **Effect:** Subtle shadow or glow

**Layout:**
```css
.condition-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
}

.check-icon {
  flex-shrink: 0;
  color: var(--primary-color);
}
```

---

## 5️⃣ OUR PROGRAMS - Visual Cards

### **Design Approach: 3-Column Image Cards**

```
┌──────────┬──────────┬──────────┐
│  IMAGE   │  IMAGE   │  IMAGE   │
│          │          │          │
│One-to-One│ Regular  │  Kids    │
│ Therapy  │  Batch   │  Yoga    │
│          │          │          │
│  [CTA]   │  [CTA]   │  [CTA]   │
└──────────┴──────────┴──────────┘
```

### **Content Structure**
```html
<section class="programs-section">
  <div class="container">
    <h2>Our Programs</h2>
    <p class="section-subtitle">Find the perfect program for your journey</p>

    <div class="programs-grid">
      <!-- Program 1: One-to-One -->
      <div class="program-card">
        <div class="program-image">
          <img src="[THERAPY IMAGE]" alt="One-to-One Therapy">
          <div class="program-overlay"></div>
        </div>
        <div class="program-content">
          <h3>One-to-One Therapy</h3>
          <p>Personalized healing for specific conditions</p>
          <ul class="program-highlights">
            <li>Custom treatment plan</li>
            <li>Focused attention</li>
            <li>Faster results</li>
          </ul>
          <a href="#contact" class="cta-button">Book Therapy Session</a>
        </div>
      </div>

      <!-- Program 2: Regular Batch -->
      <div class="program-card">
        <div class="program-image">
          <img src="[GROUP CLASS IMAGE]" alt="Regular Classes">
          <div class="program-overlay"></div>
        </div>
        <div class="program-content">
          <h3>Regular Classes</h3>
          <p>Small group sessions with personalized attention</p>
          <ul class="program-highlights">
            <li>12 classes per month</li>
            <li>Max 8-10 students</li>
            <li>All levels welcome</li>
          </ul>
          <a href="#schedule" class="cta-button">View Schedule</a>
        </div>
      </div>

      <!-- Program 3: Kids Yoga -->
      <div class="program-card">
        <div class="program-image">
          <img src="/images/kids_yoga.jpeg" alt="Kids Yoga">
          <div class="program-overlay"></div>
        </div>
        <div class="program-content">
          <h3>Kids Yoga</h3>
          <p>Fun, engaging practice for children</p>
          <ul class="program-highlights">
            <li>Weekend classes</li>
            <li>Age-appropriate poses</li>
            <li>Build confidence</li>
          </ul>
          <a href="#contact" class="cta-button">Enroll Your Child</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### **Imagery Requirements**

**Program Card Images:**

1. **One-to-One Therapy**
   - **Subject:** Instructor helping single student with prop
   - **Mood:** Focused, therapeutic, professional
   - **Props:** Visible props (blocks, straps, bolsters)
   - **Unsplash:** "yoga therapy props instruction"

2. **Regular Batch**
   - **Subject:** Small group (4-6 people) in synchronized pose
   - **Mood:** Community, focus, harmony
   - **Setting:** Clean studio with natural light
   - **Unsplash:** "yoga class small group studio"

3. **Kids Yoga** ✅
   - **Current:** `/images/kids_yoga.jpeg` (already have)
   - **Subject:** Children practicing with ropes/props
   - **Mood:** Fun, engaged, active

**Image Specifications:**
- **Aspect Ratio:** 4:3 or 16:9
- **Resolution:** 800x600 minimum
- **Format:** WebP with JPEG fallback
- **Optimization:** Compressed for web

---

## 🎨 CONSISTENT IMAGERY THEME

### **Photography Style Guidelines**

**Overall Aesthetic:**
- **Tone:** Warm, natural, therapeutic
- **Lighting:** Soft, diffused natural light
- **Colors:** Neutral backgrounds, earth tones
- **Mood:** Calm, peaceful, professional
- **Authenticity:** Real practice moments, not overly staged

**Avoid:**
- ❌ Overly bright, saturated colors
- ❌ Busy backgrounds
- ❌ Stock photo "perfection" look
- ❌ Generic fitness imagery
- ❌ Low-resolution or pixelated images

**Preferred:**
- ✅ Natural, authentic moments
- ✅ Soft, diffused lighting
- ✅ Clean, minimal backgrounds
- ✅ Professional but approachable
- ✅ Therapeutic, healing atmosphere

---

## 📏 CARD DESIGN SYSTEM

### **Universal Card Styling**

```css
.card {
  background: var(--background-color);
  border-radius: var(--border-radius);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
```

### **Card Variants**

1. **Why Cards** (Icon + Text)
   - Icon at top
   - Centered content
   - Light background

2. **Program Cards** (Image + Content)
   - Full-width image
   - Overlay on image
   - CTA button at bottom

3. **Instructor Card** (Portrait + Story)
   - Side-by-side layout
   - Accent border
   - Story emphasis

---

## 🖼️ IMAGE SOURCING GUIDE

### **Recommended Unsplash Collections**

1. **Yoga & Wellness**
   - Search: "iyengar yoga"
   - Search: "therapeutic yoga"
   - Search: "yoga props"

2. **Studio Environments**
   - Search: "yoga studio natural light"
   - Search: "minimalist yoga space"
   - Search: "peaceful wellness center"

3. **Instructors & Practice**
   - Search: "yoga teacher instruction"
   - Search: "yoga class small group"
   - Search: "mindful yoga practice"

### **Image Optimization Checklist**

- [ ] Resize to appropriate dimensions
- [ ] Compress for web (TinyPNG, ImageOptim)
- [ ] Convert to WebP with JPEG fallback
- [ ] Add descriptive alt text
- [ ] Lazy load below-fold images
- [ ] Optimize for retina displays (2x)

---

## 🎯 CALL-TO-ACTION STRATEGY

### **Primary CTAs**
- **Hero:** "Book Your First Class"
- **Programs:** "View Schedule" / "Book Session"
- **Instructor:** "Book a Session"

### **Secondary CTAs**
- **WhatsApp:** Floating button (already implemented)
- **Social Proof:** "Read More Reviews"
- **Footer:** Contact information

### **CTA Button Design**

**Primary Button:**
```css
.cta-button-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  padding: 1rem 2rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
}
```

**Secondary Button:**
```css
.cta-button-secondary {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 1rem 2rem;
  font-weight: 600;
}
```

---

## 📱 RESPONSIVE LAYOUT STRATEGY

### **Desktop (> 1024px)**
- Full 3-column grids
- Large imagery
- Ample whitespace

### **Tablet (768px - 1024px)**
- 2-column grids
- Adjusted image sizes
- Maintained spacing

### **Mobile (< 768px)**
- Single column stack
- Full-width images
- Larger touch targets

---

## ✅ IMPLEMENTATION CHECKLIST

### **Phase 1: Hero Section**
- [ ] Select high-quality hero image
- [ ] Update hero section HTML structure
- [ ] Add full-width visual hero CSS
- [ ] Test on desktop and mobile
- [ ] Optimize image loading

### **Phase 2: Why Section**
- [ ] Select and integrate modern icons
- [ ] Update card styling with shadows
- [ ] Test 3-column grid responsiveness
- [ ] Refine content copy

### **Phase 3: Instructor Section**
- [ ] Get professional portrait photo
- [ ] Create 2-column layout
- [ ] Add accent styling elements
- [ ] Test image/text balance

### **Phase 4: Conditions Section**
- [ ] Design icon list layout
- [ ] Add checkmark icons
- [ ] Style 2-column grid
- [ ] Optimize spacing

### **Phase 5: Programs Section**
- [ ] Source program images
- [ ] Create visual card components
- [ ] Add hover effects
- [ ] Test CTA buttons

### **Phase 6: Polish**
- [ ] Optimize all images
- [ ] Test loading performance
- [ ] Check mobile responsiveness
- [ ] Validate accessibility
- [ ] Cross-browser testing

---

**Document Version:** 1.0
**Last Updated:** 2025-11-16
**Status:** Ready for Implementation 🚀
