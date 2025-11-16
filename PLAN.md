# YOG CHUMBAK WEBSITE REDESIGN - V1.0 IMPLEMENTATION PLAN

## 🎯 PROJECT GOAL
Transform Yog Chumbak website from current state to PowerFlow-level professional quality with mobile-first responsive design. Static 11ty build for GitHub Pages deployment.

**Target Quality**: 9+/10 overall design score
**Timeline**: ~14 hours focused implementation
**Deployment**: GitHub Pages (static site)

---

## 📊 CURRENT STATE ANALYSIS

### Existing Assets ✅
- Logo: yogchumbak_logo.png
- Instructor: instructor.png
- Medical illustrations: frozen_shoulder.png, back_pain.png, knee_pain.png
- Meditation: weekend_meditation.jpeg
- Schedule: current_schedule.jpeg (reference)
- Typography: Spectral + Work Sans (KEEP)
- Brand colors: Purple #83247C + Pink #E54992 (KEEP)

### Issues to Fix ❌
- Emoji icons on therapy cards (unprofessional)
- Excessive glassmorphism everywhere
- Staggered card heights (already fixed)
- Generic "AI slop" aesthetics
- No mobile optimization

---

## 📱 MOBILE-FIRST REQUIREMENTS (CRITICAL)

### Breakpoints
- **Mobile**: < 768px (PRIMARY focus)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile Must-Haves
- [ ] Touch-friendly buttons (44px minimum height)
- [ ] Hamburger navigation menu
- [ ] Swipeable hero carousel
- [ ] Readable text (16px minimum body)
- [ ] No horizontal scroll
- [ ] Fast load on 3G (<3s)
- [ ] Responsive images (srcset)
- [ ] Stacked layouts (not cramped)
- [ ] WhatsApp button thumb-accessible

---

## 🏗️ SITE STRUCTURE

### V1.0 Scope: **SINGLE PAGE WEBSITE** (Homepage Only)

```
Homepage Sections (scroll-based):
├── 1. Hero Slider (4 slides)
├── 2. About Section
├── 3. Why Yog Chumbak? (4 points)
├── 4. Meet Suman Hora (Instructor)
├── 5. One-to-One Therapies (3 condition cards)
├── 6. Class Schedule + Kids Yoga + Meditation
├── 7. Testimonials Carousel (6 reviews)
├── 8. FAQ (5 questions, accordion)
└── 9. Footer (4 columns + WhatsApp button)
```

**No separate pages** - everything on homepage for V1 simplicity.

---

## 🎨 DESIGN SYSTEM SPECIFICATIONS

### Color Palette
```css
--primary: #83247C;          /* Deep Purple (brand) */
--secondary: #E54992;        /* Vibrant Pink */
--text-primary: #1a1a1a;     /* Almost black */
--text-secondary: #666666;   /* Medium gray */
--background: #FFFFFF;       /* White */
--background-alt: #F6EFF5;   /* Light purple tint */
--border: #E8D5E6;           /* Soft purple border */
```

### Typography Scale
```css
--font-display: 'Spectral', Georgia, serif;
--font-body: 'Work Sans', sans-serif;

/* Desktop Sizes */
--text-hero: 64px;       /* Hero headlines */
--text-h1: 48px;         /* Section titles */
--text-h2: 36px;         /* Subsection titles */
--text-h3: 24px;         /* Card titles */
--text-body: 18px;       /* Paragraph text */
--text-small: 14px;      /* Fine print */

/* Mobile Sizes (scale down 35%) */
--text-hero-mobile: 42px;
--text-h1-mobile: 32px;
--text-h2-mobile: 24px;
--text-h3-mobile: 20px;
--text-body-mobile: 16px;
--text-small-mobile: 13px;
```

### Spacing System (4px base)
```css
--space-xs: 8px;
--space-sm: 16px;
--space-md: 24px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
--space-3xl: 96px;
--space-4xl: 128px;

/* Section Padding */
Desktop: 96px top/bottom
Tablet: 64px top/bottom
Mobile: 48px top/bottom
```

### Shadows (Subtle, professional)
```css
--shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
--shadow-hover: 0 12px 32px rgba(131,36,124,0.15);
```

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
```

### Design Principles
1. **REMOVE glassmorphism** except header (on scroll)
2. **Clean white cards** with subtle shadows
3. **Medical image cards**: Dark overlay for text contrast
4. **Generous whitespace** - don't cram content
5. **Professional photography** over illustrations
6. **Consistent hover states** - lift + shadow increase

---

## 📋 SECTION-BY-SECTION SPECIFICATIONS

### 1. HERO SLIDER

**Functionality**:
- 4 slides, full-screen (100vh desktop, 70vh mobile)
- Auto-advance every 5 seconds
- Manual navigation: Left/right arrows + dot indicators
- Swipe gesture on mobile
- Smooth fade transition (600ms)
- Pause on hover (desktop only)

**Slide Content**:

#### Slide 1: Body, Mind & Soul
```
Background: Peaceful yoga practice image (serene, professional)
Overlay: Dark gradient 50% opacity
Headline: "Transform Your Body, Mind & Soul"
Subtext: "Experience the healing power of Iyengar Yoga"
CTA Button: "Start Your Journey" (scroll to about section)
```

#### Slide 2: Kids Yoga
```
Background: Kids doing yoga (happy, playful)
Overlay: Dark gradient 40% opacity
Headline: "Train Them Young"
Subtext: "Weekend kids yoga every Saturday & Sunday"
Details Badge: "Sat/Sun 11am-12pm • ₹2400/month"
CTA Button: "Learn More" (scroll to kids section)
```

#### Slide 3: One-to-One Therapy
```
Background: Montage of frozen_shoulder.png, back_pain.png, knee_pain.png
Overlay: Dark gradient 60% opacity
Headline: "Chronic Pain Needs Focused Attention"
Subtext: "Normal yoga builds strength. Chronic conditions need specialized therapy."
CTA Button: "Book Assessment" (WhatsApp link)
```

#### Slide 4: Weekend Meditation
```
Background: weekend_meditation.jpeg
Overlay: Dark gradient 50% opacity
Headline: "Weekend Meditation"
Subtext: "2nd & 4th Sunday • 12:30-1:30pm"
Badge: "Only 10 Spots Available"
CTA Button: "Reserve Your Spot" (WhatsApp link)
```

**Mobile Adaptations**:
- Reduce height to 70vh
- Stack text center-aligned
- Larger touch targets for navigation (44px min)
- Disable auto-advance (user control)
- Enable swipe gestures

---

### 2. ABOUT SECTION - "YOUR WELLNESS JOURNEY"

**Layout**: 60/40 split (image left, text right) → Stack on mobile

```
Section Tag: "ABOUT YOG CHUMBAK"
Headline: "Your Journey to Holistic Wellness"

Body Copy:
At Yog Chumbak, we believe true wellness comes from balancing Body, Mind, and Soul. Our approach integrates the precision of Iyengar Yoga with therapeutic healing, helping you not just exercise, but transform.

BODY: Build strength, flexibility, and proper alignment through precise postures held with awareness. Using props like blocks, straps, and bolsters, we make yoga accessible to all bodies and abilities.

MIND: Find mental clarity, reduce stress, and cultivate mindfulness. Each practice becomes a moving meditation, connecting breath to movement.

SOUL: Experience inner peace and spiritual connection. Yoga is not just physical—it's a journey toward your best self.

CTA: "Explore Our Classes" (scroll to schedule)
```

**Image**: Yoga studio interior or group practice (professional photography)

---

### 3. WHY YOG CHUMBAK? (4 Numbered Points)

**Layout**: 2x2 grid (desktop) → 1 column (mobile)

```
┌─────────────┬─────────────┐
│  [1]        │  [2]        │
│  Since 2019 │  Expert     │
│             │  Instructor │
├─────────────┼─────────────┤
│  [3]        │  [4]        │
│  Not Regular│  Personal   │
│  Yoga       │  Attention  │
└─────────────┴─────────────┘
```

#### Point 1: Established Since 2019
```
Icon: 🏛️ (or simple calendar SVG)
Headline: "Trusted Since 2019"
Body: "6 years of transforming lives in Shalimar Bagh. A community built on results, not promises."
```

#### Point 2: Expert Instructor - 10+ Years
```
Icon: ⭐ (or certification badge SVG)
Headline: "Expert Guidance"
Body: "Suman Hora brings 10+ years of experience and Certified Pranic Healer expertise. Homemaker turned yogapreneur—proof that transformation is possible at any age."
```

#### Point 3: Not Your Regular Yoga
```
Icon: 🧘 (or yoga pose SVG)
Headline: "Iyengar Method with Props"
Body: "Precision, alignment, and therapeutic focus using blocks, straps, bolsters, and chairs. Suitable for all levels—from complete beginners to advanced practitioners."
```

#### Point 4: Personalized Attention
```
Icon: 💚 (or hands holding heart SVG)
Headline: "Individual Care"
Body: "Small batch sizes ensure personal attention. Individual assessments. One-to-one therapy options for chronic conditions. You're not just a number."
```

---

### 4. MEET SUMAN HORA (Instructor Profile)

**Layout**: Unified card with image (40%) + text (60%) side-by-side → Stack on mobile

```
┌────────────────────────────────────┐
│  ┌─────────┐  SUMAN HORA          │
│  │         │  [Pranic Healer]     │
│  │ Photo   │  [10+ Years]         │
│  │         │                      │
│  │ instructor│  "At 59, I dared   │
│  │ .png    │  to pursue my       │
│  │         │  passion..."        │
│  │         │                      │
│  │         │  Bio paragraphs...   │
│  └─────────┘                      │
└────────────────────────────────────┘
```

**Image**: instructor.png (professional headshot)

**Credentials Badges**:
- "Certified Pranic Healer"
- "10+ Years Experience"
- "Iyengar Certified" (if applicable)

**Bio Copy**:
```
Headline: Suman Hora
Subheadline: "Your Guide to Transformation"

Quote: "At 59, I dared to pursue my passion and live my mission—proving it's never too late to transform your life and serve others."

Bio:
Suman Hora is a remarkable homemaker turned yogapreneur, married to a visionary entrepreneur and mother of 2. As a certified Pranic Healer with 10+ years of yoga expertise, she is on a mission to serve 100,000 people to help them reverse aging and reclaim vitality.

Her journey represents the power of transformation at any age. She opened Yog Chumbak's flagship studio in Shalimar Bagh, where ancient wisdom meets modern healing. Specializing in therapeutic applications of Iyengar Yoga, Suman has helped countless students find relief from chronic pain, build strength, and discover inner peace.
```

**Styling**:
- Clean white card with shadow
- Professional, trustworthy aesthetic
- NO glassmorphism
- Badge chips: Purple background, white text

---

### 5. ONE-TO-ONE THERAPIES SECTION

**Introduction Block**:
```
Section Tag: "THERAPEUTIC YOGA"
Headline: "One-to-One Therapies"
Subtext: "When chronic conditions need more than group classes"

Explanation:
Regular yoga classes build overall alignment, strength, and wellness. But chronic pain conditions—frozen shoulder, persistent back pain, knee issues—require focused, personalized attention. Our one-to-one therapy sessions are specially designed for those dealing with long-term physical limitations.
```

**3-Step Process** (Visual timeline):
```
[1] ────> [2] ────> [3]

Assessment     Personalized Plan     Gradual Transition
Evaluate your  Custom exercises     Progress to care
condition &    targeting root       batch or regular
flexibility    causes of pain       classes
```

**Condition Cards** (3 cards with medical illustration backgrounds):

#### Card Styling Specification:
```css
.condition-card {
  background-image: url('/images/[condition].png');
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  min-height: 400px;
  padding: 32px;
}

.condition-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.4) 0%,
    rgba(0,0,0,0.7) 100%
  );
  z-index: 1;
}

.condition-card-content {
  position: relative;
  z-index: 2;
  color: #ffffff;
}
```

#### Card 1: Frozen Shoulder
```
Background: frozen_shoulder.png
Overlay: Dark gradient (40% to 70%)
Icon: 🦴 → REPLACE with small anatomical icon or none
Title: "Frozen Shoulder"
Description: "Gentle mobilization and strengthening exercises to restore range of motion and reduce pain in frozen shoulder conditions."
Benefits:
  • Pain Reduction
  • Mobility Restoration
  • Strength Building
```

#### Card 2: Chronic Back Pain
```
Background: back_pain.png
Overlay: Dark gradient (40% to 70%)
Icon: 🧘‍♀️ → REPLACE with spine icon or none
Title: "Chronic Back Pain"
Description: "Targeted spinal alignment and core strengthening techniques to address the root causes of chronic back pain."
Benefits:
  • Spinal Alignment
  • Core Strength
  • Posture Correction
```

#### Card 3: Knee Pain
```
Background: knee_pain.png
Overlay: Dark gradient (40% to 70%)
Icon: 🦵 → REPLACE with knee joint icon or none
Title: "Knee Pain"
Description: "Specialized sequences to strengthen supporting muscles and improve joint flexibility while protecting the knee structure."
Benefits:
  • Joint Protection
  • Muscle Support
  • Flexibility Enhancement
```

**CTA Section**:
```
Headline: "Ready to Find Relief?"
Body: "Schedule a free assessment to determine if one-to-one therapy is right for you."
Button: "Book Assessment" (WhatsApp link)
```

**Mobile**: Stack cards vertically, maintain dark overlay for readability

---

### 6. CLASS SCHEDULE SECTION

**Section Headline**: "Weekly Class Schedule"
**Subtext**: "Choose a batch that fits your lifestyle—we offer flexible timings"

#### Regular Batches Table

**Desktop Layout** (Table format):
```
┌─────────────┬──────┬──────┬──────┬──────┬──────┬──────┐
│ BATCH       │ MON  │ TUE  │ WED  │ THU  │ FRI  │ SAT  │
├─────────────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ Morning     │ 7:15 │      │ 7:15 │ 7:15 │      │      │
│ Batch       │ 8:15 │      │ 8:15 │ 8:15 │      │      │
├─────────────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ Morning     │ 9:00 │ 9:00 │      │      │ 9:00 │      │
│ Batch 2     │ 10:00│ 10:00│      │      │ 10:00│      │
├─────────────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ Afternoon   │      │ 12:00│      │ 12:00│      │ 12:00│
│ Batch       │      │ 1:00 │      │ 1:00 │      │ 1:00 │
├─────────────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ Evening     │ 6:00 │ 6:00 │      │ 6:00 │      │      │
│ Batch       │ 7:00 │ 7:00 │      │ 7:00 │      │      │
└─────────────┴──────┴──────┴──────┴──────┴──────┴──────┘
```

**Schedule Data** (from current_schedule.jpeg):
```json
{
  "batches": [
    {
      "name": "Morning Batch",
      "time": "7:15AM - 8:15AM",
      "days": ["Monday", "Wednesday", "Thursday"]
    },
    {
      "name": "Morning Batch 2",
      "time": "9:00AM - 10:00AM",
      "days": ["Monday", "Tuesday", "Friday"]
    },
    {
      "name": "Afternoon Batch",
      "time": "12:00PM - 1:00PM",
      "days": ["Tuesday", "Thursday", "Saturday"]
    },
    {
      "name": "Evening Batch",
      "time": "6:00PM - 7:00PM",
      "days": ["Monday", "Tuesday", "Thursday"]
    }
  ]
}
```

**Table Styling**:
- Header row: Purple background (#83247C), white text
- Cells: White background for filled, light gray (#F6EFF5) for empty
- Border: Subtle purple (#E8D5E6)
- Purple lotus decorations in corners (existing design element)

**Mobile Layout**: Convert table to list of cards
```
[ Morning Batch ]
7:15AM - 8:15AM
Mon • Wed • Thu

[ Morning Batch 2 ]
9:00AM - 10:00AM
Mon • Tue • Fri
...
```

#### Kids Yoga Card (Below schedule)

```
┌───────────────────────────────────┐
│  🧒 KIDS YOGA                     │
│                                   │
│  Every Weekend                    │
│  Saturday & Sunday                │
│  11:00 AM - 12:00 PM              │
│                                   │
│  ₹2,400/month                     │
│  (8 classes per month)            │
│                                   │
│  [Enroll Your Child] button       │
└───────────────────────────────────┘
```

#### Weekend Meditation Card (Below Kids Yoga)

```
┌───────────────────────────────────┐
│  [Background: weekend_meditation.jpeg with overlay]
│                                   │
│  WEEKEND MEDITATION               │
│                                   │
│  📅 2nd & 4th Sunday only         │
│  ⏰ 12:30 PM - 1:30 PM            │
│  👥 Limited to 10 spots           │
│  💰 ₹1,500 (2 months)             │
│                                   │
│  Highlights:                      │
│  • Every session is unique        │
│  • Meditate with breath & props   │
│  • In yoga poses too              │
│                                   │
│  Eligibility: 3+ months membership│
│  📵 Phones on Airplane mode       │
│                                   │
│  [Reserve Your Spot] button       │
└───────────────────────────────────┘
```

---

### 7. TESTIMONIALS CAROUSEL

**Layout**: Full-width section with background image + dark overlay

**Background**: Yoga studio interior or peaceful practice scene (blurred, 60% dark overlay)

**Carousel Functionality**:
- 1 review visible at a time
- Auto-rotate every 6 seconds
- Pause on hover
- Navigation: Dot indicators + left/right arrows
- Smooth fade transitions (500ms)

**Google Reviews to Extract** (from https://maps.app.goo.gl/aGe6xTr9iRokxMe39):

#### Review 1: Sunita, New Delhi ⭐⭐⭐⭐⭐
```
"I joined Yog Chumbak on 16th April, 2025. In three months, I got relief in Cervical & Anxiety. They give lot of personal attention with lot of care & keep a humble attitude..."

Name: Sunita
Location: New Delhi
Rating: 5 stars
Date: 3 months ago
```

#### Review 2: Sonika Garg ⭐⭐⭐⭐⭐
```
"Hello, I was suffering from major cervical spondylosis for over three months. I consulted three different doctors and even tried physiotherapy, but nothing brought lasting relief. Then a friend recommended Yog Chumbak, assuring me that they..."

Name: Sonika Garg
Rating: 5 stars
Date: 3 months ago
```

**TODO**: Extract 4 more best reviews from Google Maps (need full text)

**Testimonial Card Design**:
```
┌───────────────────────────────────┐
│  ⭐⭐⭐⭐⭐                        │
│                                   │
│  "Quote text here in larger       │
│  font, centered, white text"      │
│                                   │
│  — Name                           │
│  Location                         │
└───────────────────────────────────┘
```

**Styling**:
- White text on dark background
- Quote text: 20-24px, center-aligned
- Name: 16px, semi-bold
- Location: 14px, lighter weight
- Stars: Gold color (#FFD700)

---

### 8. FAQ SECTION (Accordion)

**Section Headline**: "Frequently Asked Questions"

**Accordion Behavior**:
- Questions visible as clickable headers
- Click to expand/collapse answer
- One open at a time (collapse others automatically)
- Smooth animation (300ms ease)
- Plus/minus icon indicator (+ when closed, − when open)

**FAQ Items**:

#### Q1: I go to Gym, do I need Yoga?
```
A: Absolutely! While gym workouts build muscle strength and cardiovascular fitness, yoga improves flexibility, balance, posture, and mental well-being. They complement each other perfectly.

Many gym-goers find yoga helps prevent injuries, improves recovery time, and enhances overall performance. Plus, yoga addresses stress and mental health—benefits that gym workouts alone cannot provide. Think of gym as building your house, and yoga as creating a home.
```

#### Q2: I am a working professional, when can I join classes?
```
A: We offer flexible timing specifically for working professionals across morning, afternoon, and evening slots:

• Morning Batches: 7:15-8:15am, 9:00-10:00am
• Afternoon Batch: 12:00-1:00pm (lunch break option)
• Evening Batch: 6:00-7:00pm (after work)

Each batch runs 3 days per week, giving you 12 classes per month. Choose the schedule that fits your routine. Many working professionals prefer our morning batches to start the day energized, or evening batches to unwind after work.
```

#### Q3: How many classes do you take?
```
A: Each batch gets 3 classes per week, totaling 12 classes per month.

This frequency is intentionally designed for the Iyengar method, where we hold poses longer and focus intensely on alignment. Your body needs adequate rest between sessions to integrate the practice and build strength safely. Consistent 3x/week attendance shows better results than sporadic daily practice.
```

#### Q4: I have a chronic ailment, can I do yoga?
```
A: Yes, you absolutely should! However, chronic conditions require personalized attention rather than jumping into group classes.

We strongly recommend coming in for a free assessment where we'll:
• Evaluate your specific condition
• Test your current flexibility and range of motion
• Understand your pain triggers and limitations

Based on this assessment, we'll determine whether you're suited for our regular batches or would benefit more from one-to-one therapy sessions. Many of our students have found lasting relief from chronic pain, frozen shoulder, back issues, and knee problems through our therapeutic approach.
```

#### Q5: How is it different from Physiotherapy?
```
A: This is a great question! The key difference is scope and approach:

PHYSIOTHERAPY: Works on the pain area only, providing symptomatic relief. If your knee hurts, physio treats your knee.

YOGA (our approach): Finds the SOURCE of the problem causing misalignment. Your knee pain might actually stem from hip misalignment, poor posture habits, or weak core muscles—issues built over years that you never noticed.

We address:
• Shoulder misalignment causing neck pain
• Neck shortening from desk work causing headaches
• Wrong posture habits causing back pain
• Muscle imbalances creating joint stress

With yoga, you don't just work on fixing the pain—you fix the ROOT CAUSES: postural habits, structural misalignments, and muscle imbalances. This comprehensive approach leads to lasting relief, not temporary band-aids. Think long-term transformation, not short-term fixes.
```

**Styling**:
- Question (header): 18px, bold, purple color, clickable
- Answer: 16px, regular weight, gray text, hidden until expanded
- Icon: Purple + or − on right side
- Border bottom: Light purple separator between items
- Padding: Generous (24px top/bottom per item)
- Hover state: Slight background tint on question

---

### 9. FOOTER

**Layout**: 4-column grid (desktop) → Stack 1 column (mobile)

```
┌─────────┬─────────┬─────────┬─────────┐
│ Brand   │ Links   │ Programs│ Contact │
│         │         │         │         │
│ Logo    │ Home    │ Regular │ Address │
│ Tagline │ About   │ Kids    │ Phone   │
│ Social  │ Schedule│ Therapy │ Email   │
│         │ Contact │ Meditation         │
└─────────┴─────────┴─────────┴─────────┘
       ┌─────────────────────────┐
       │ SEO Keywords            │
       │ Copyright               │
       └─────────────────────────┘
```

#### Column 1: Branding
```
[Yog Chumbak Logo]

Tagline: "Yoga for Pain Relief & Holistic Wellness"

Social Media:
[Instagram icon] @yog.chumbak
[Facebook icon] /yogchumbakindia
```

#### Column 2: Quick Links
```
• Home
• About
• Schedule
• Therapies
• Contact
```

#### Column 3: Programs
```
• Regular Classes (12/month)
• Kids Yoga (Weekends)
• One-to-One Therapy
• Weekend Meditation
```

#### Column 4: Contact & Location
```
📍 Address:
Fourth Floor, Singalpur Village
SE 30, Above Mac
Opposite BT Block
West Shalimar Bagh
Delhi - 110088

📞 Phone:
+91 98113 34069
+91 99108 26170

✉️ Email:
info@yogchumbak.com
```

#### Bottom Bar (Full Width)
```
SEO Keywords (Small text):
Yoga in Delhi | Yoga in Shalimar Bagh | Iyengar Yoga Delhi | Yoga for Back Pain | Yoga Therapy Delhi | Best Yoga Studio Shalimar Bagh | Therapeutic Yoga | Kids Yoga Delhi

────────────────────────────────

© 2025 Yog Chumbak. All rights reserved.
```

#### WhatsApp Float Button
```
Position: Fixed bottom-right
Icon: WhatsApp logo (green #25D366)
Size: 60px × 60px
Border radius: 50% (circle)
Shadow: 0 4px 12px rgba(0,0,0,0.15)
Hover: Scale 1.1, stronger shadow
Z-index: 9999 (always on top)

Click action: Open WhatsApp chat
Link: https://wa.me/919811334069?text=Hi%20Yog%20Chumbak,%20I'd%20like%20to%20know%20more%20about%20your%20classes
```

**Mobile Footer**:
- Stack all columns vertically
- Optional: Accordion collapse for "Quick Links" and "Programs" sections
- Contact info always visible
- WhatsApp button: Position for right-thumb reach (bottom-right, 16px from edge)

---

## 📂 FILE STRUCTURE

```
yogchumbak-11ty/
├── src/
│   ├── _data/
│   │   ├── site.json           (metadata: title, description, contact)
│   │   ├── schedule.json       (batch timings, easy to update)
│   │   ├── slider.json         (hero slide content)
│   │   └── testimonials.json   (Google reviews)
│   │
│   ├── _includes/
│   │   ├── base.html           (main layout wrapper)
│   │   ├── header.html         (nav + logo)
│   │   └── footer.html         (4-column footer + WhatsApp)
│   │
│   ├── css/
│   │   ├── main.css            (design system + all styles)
│   │   ├── mobile.css          (responsive overrides)
│   │   └── animations.css      (scroll reveals, transitions)
│   │
│   ├── js/
│   │   ├── slider.js           (hero carousel)
│   │   ├── accordion.js        (FAQ expand/collapse)
│   │   ├── animations.js       (scroll-triggered reveals)
│   │   └── schedule.js         (mobile schedule toggle)
│   │
│   ├── images/
│   │   ├── frozen_shoulder.png ✅
│   │   ├── back_pain.png ✅
│   │   ├── knee_pain.png ✅
│   │   ├── instructor.png ✅
│   │   ├── yogchumbak_logo.png ✅
│   │   ├── weekend_meditation.jpeg ✅
│   │   └── hero/
│   │       ├── slide1.jpg       ❌ (need)
│   │       ├── slide2.jpg       ❌ (need)
│   │       ├── slide3.jpg       ❌ (need)
│   │       └── slide4.jpg       ❌ (need)
│   │
│   └── index.html              (single homepage)
│
├── .eleventy.js                (11ty config)
├── package.json
└── README.md
```

---

## ✅ IMPLEMENTATION TASK LIST

### PHASE 1: FOUNDATION & CLEANUP (3 hours)

#### 1.1 Design System Overhaul
- [ ] Update CSS variables (colors, typography, spacing)
- [ ] Remove excessive glassmorphism
- [ ] Implement 4px spacing system
- [ ] Create utility classes (margin, padding, text sizes)
- [ ] Define shadow levels (sm, md, lg, hover)
- [ ] Set up mobile-first media queries

#### 1.2 Header & Navigation
- [ ] Update header with logo only (remove redundant text)
- [ ] Implement sticky header behavior (transparent → solid on scroll)
- [ ] Add subtle glassmorphism to scrolled header only
- [ ] Build hamburger menu for mobile (<768px)
- [ ] Ensure header height accounts for logo size
- [ ] Add smooth scroll behavior for anchor links

#### 1.3 Footer Structure
- [ ] Build 4-column grid layout
- [ ] Add branding + social links (Column 1)
- [ ] Add quick links (Column 2)
- [ ] Add programs list (Column 3)
- [ ] Add contact info with icons (Column 4)
- [ ] Add SEO keywords footer bar
- [ ] Implement mobile stack (1 column)

#### 1.4 WhatsApp Float Button
- [ ] Create fixed position button (bottom-right)
- [ ] Style as circle with WhatsApp logo
- [ ] Add hover animation (scale 1.1)
- [ ] Link to WhatsApp chat with pre-filled message
- [ ] Ensure thumb-accessible on mobile (16px from edge)
- [ ] Set z-index to always appear on top

---

### PHASE 2: HERO SLIDER & CORE SECTIONS (4 hours)

#### 2.1 Hero Slider Implementation
- [ ] Create slider.json data file with 4 slide content
- [ ] Build slider HTML structure
- [ ] Implement auto-advance (5s interval)
- [ ] Add left/right arrow navigation
- [ ] Add dot indicators (active state)
- [ ] Add fade transition animation (600ms)
- [ ] Implement pause on hover (desktop)
- [ ] Add swipe gesture support (mobile)
- [ ] Optimize hero images (WebP + fallback)
- [ ] Add dark overlay to each slide
- [ ] Style CTAs (different actions per slide)
- [ ] Reduce hero height on mobile (70vh)

**VISUAL CHECK**:
- [ ] All text readable on all backgrounds
- [ ] CTA buttons clear and clickable
- [ ] Smooth transitions, no janky animations
- [ ] Swipe works naturally on mobile
- [ ] Navigation arrows visible but not obtrusive

#### 2.2 About Section
- [ ] Create 60/40 split layout (image/text)
- [ ] Add section tag "ABOUT YOG CHUMBAK"
- [ ] Write body copy (Body/Mind/Soul theme)
- [ ] Add "Explore Our Classes" CTA
- [ ] Find/add suitable yoga studio image
- [ ] Stack vertically on mobile (image top, text bottom)

**VISUAL CHECK**:
- [ ] Generous whitespace, not cramped
- [ ] Text readable and scannable
- [ ] Image high quality, not pixelated
- [ ] Mobile stack maintains readability

#### 2.3 Why Yog Chumbak Section
- [ ] Create 2x2 grid layout (numbered 1-4)
- [ ] Design number badges (large, purple)
- [ ] Add icons (simple SVGs, not emojis)
- [ ] Write copy for all 4 points
- [ ] Style cards with subtle shadows
- [ ] Make responsive (2 cols tablet, 1 col mobile)

**VISUAL CHECK**:
- [ ] Numbers visually prominent
- [ ] Cards equal height (grid alignment)
- [ ] Icons professional, not clipart
- [ ] Text hierarchy clear (title > body)

#### 2.4 Instructor Profile (Suman Hora)
- [ ] Create unified card layout (40% image, 60% text)
- [ ] Use instructor.png
- [ ] Add credential badges (chips/pills design)
- [ ] Format bio with proper hierarchy
- [ ] Add quote callout styling
- [ ] Stack vertically on mobile
- [ ] Remove any overlap tricks (clean alignment)

**VISUAL CHECK**:
- [ ] Professional, trustworthy appearance
- [ ] No overlapping elements causing misalignment
- [ ] Badges readable and credible
- [ ] Bio scannable with clear paragraphs

---

### PHASE 3: THERAPIES & TESTIMONIALS (3 hours)

#### 3.1 One-to-One Therapies Section
- [ ] Write introduction copy (regular vs. chronic)
- [ ] Create 3-step process visual (timeline/arrows)
- [ ] Build 3 therapy cards with medical image backgrounds
- [ ] Add dark gradient overlays (40-70% opacity)
- [ ] Ensure white text readable on all 3 images
- [ ] Remove emoji icons completely
- [ ] Add benefits bullets (clean, aligned)
- [ ] Style "Book Assessment" CTA
- [ ] Test card alignment (clean top alignment, no stagger)
- [ ] Make responsive (stack on mobile)

**VISUAL CHECK**:
- [ ] Medical images visible but not overwhelming
- [ ] Text perfectly readable on all cards (contrast check)
- [ ] Cards equal height on desktop
- [ ] No emojis anywhere (professional only)
- [ ] Hover states smooth (lift + shadow)

#### 3.2 Testimonials Carousel
- [ ] Extract 6 best Google reviews (full text)
- [ ] Create testimonials.json data file
- [ ] Build carousel HTML structure
- [ ] Add full-width background image (yoga studio)
- [ ] Add 60% dark overlay
- [ ] Implement 1-review-at-a-time display
- [ ] Add auto-rotate (6s interval)
- [ ] Add dot navigation
- [ ] Add left/right arrows
- [ ] Style star ratings (gold)
- [ ] Format reviewer name + location
- [ ] Implement pause on hover

**VISUAL CHECK**:
- [ ] Text readable (white on dark background)
- [ ] Quote text large enough (20-24px)
- [ ] Stars visible and recognizable
- [ ] Smooth transitions between reviews
- [ ] Navigation intuitive

---

### PHASE 4: SCHEDULE & FAQ (3 hours)

#### 4.1 Class Schedule Table
- [ ] Create schedule.json data file
- [ ] Build table layout (Batch × Days)
- [ ] Add purple header row
- [ ] Style filled cells (white) vs empty (light gray)
- [ ] Add purple lotus decorations (corners)
- [ ] Convert to card list on mobile
- [ ] Ensure all times/days accurate from current_schedule.jpeg

**VISUAL CHECK**:
- [ ] Table scannable and clear
- [ ] Header row distinct (purple background)
- [ ] Empty cells visually recede
- [ ] Mobile card list readable
- [ ] No horizontal scroll on mobile

#### 4.2 Kids Yoga & Meditation Cards
- [ ] Create Kids Yoga card (below schedule)
- [ ] Add schedule, price, frequency
- [ ] Style "Enroll Your Child" CTA
- [ ] Create Weekend Meditation card
- [ ] Use weekend_meditation.jpeg as background
- [ ] Add all details (schedule, capacity, eligibility)
- [ ] Format highlights as bullets
- [ ] Style "Reserve Your Spot" CTA (WhatsApp link)
- [ ] Make both cards responsive

**VISUAL CHECK**:
- [ ] Cards visually distinct from schedule table
- [ ] Meditation image background readable with overlay
- [ ] All details visible and scannable
- [ ] CTAs clear and inviting

#### 4.3 FAQ Accordion
- [ ] Create accordion HTML structure (5 questions)
- [ ] Write full answers for all 5 questions
- [ ] Implement click to expand/collapse
- [ ] Add smooth animation (300ms)
- [ ] Style +/− icon indicator
- [ ] Auto-collapse other items (one open at a time)
- [ ] Add subtle hover state on questions
- [ ] Ensure touch-friendly on mobile (44px min height)

**VISUAL CHECK**:
- [ ] Questions clearly clickable
- [ ] Answers formatted with paragraphs/bullets
- [ ] Icon changes smoothly (+ to −)
- [ ] No janky animation
- [ ] Mobile tap targets large enough

---

### PHASE 5: POLISH & MOBILE OPTIMIZATION (4 hours)

#### 5.1 Scroll Animations
- [ ] Add Intersection Observer setup
- [ ] Implement fade-in on scroll for sections
- [ ] Add stagger effect for card grids
- [ ] Keep animations subtle (300-400ms)
- [ ] Add `prefers-reduced-motion` support
- [ ] Test performance (60fps)

#### 5.2 Mobile Responsiveness Audit
- [ ] Test on 320px width (iPhone SE)
- [ ] Test on 375px width (iPhone 12)
- [ ] Test on 768px width (iPad)
- [ ] Check all breakpoint transitions
- [ ] Ensure no horizontal scroll anywhere
- [ ] Test touch targets (all buttons 44px+)
- [ ] Verify text readability (16px min body)
- [ ] Check image scaling (no stretching)
- [ ] Test hamburger menu functionality
- [ ] Verify WhatsApp button thumb-accessible

#### 5.3 Performance Optimization
- [ ] Implement lazy loading for below-fold images
- [ ] Convert images to WebP (JPEG fallback)
- [ ] Minify CSS for production
- [ ] Minify JavaScript
- [ ] Add preload for hero images
- [ ] Test load time (<3s on 3G)
- [ ] Check Lighthouse score (target 90+)

#### 5.4 Accessibility Audit
- [ ] Verify heading hierarchy (h1 > h2 > h3)
- [ ] Add alt text to all images
- [ ] Ensure keyboard navigation works
- [ ] Add visible focus states
- [ ] Check color contrast (WCAG AA minimum)
- [ ] Add ARIA labels to slider/carousel
- [ ] Add ARIA labels to accordion
- [ ] Test screen reader compatibility

#### 5.5 Cross-Browser Testing
- [ ] Test on Chrome (desktop + mobile)
- [ ] Test on Firefox
- [ ] Test on Safari (macOS + iOS)
- [ ] Test on Edge
- [ ] Fix any browser-specific issues

---

## 🔍 VISUAL VERIFICATION CHECKLIST

### Overall Design Quality
- [ ] Looks as professional as PowerFlow reference sites
- [ ] No "AI slop" generic aesthetics
- [ ] Brand colors consistent throughout (purple/pink)
- [ ] Generous whitespace, not cramped
- [ ] Visual hierarchy clear (headings > body > captions)
- [ ] All imagery high quality (no pixelation)

### Typography
- [ ] Headings bold and impactful (700-800 weight)
- [ ] Body text readable (18px desktop, 16px mobile)
- [ ] Line heights comfortable (1.6-1.8 for body)
- [ ] No orphaned headings
- [ ] Consistent font usage (Spectral display, Work Sans body)

### Spacing & Alignment
- [ ] All cards top-aligned (no random staggering)
- [ ] Consistent padding across similar elements
- [ ] Section spacing follows 4px system
- [ ] Grid layouts properly aligned
- [ ] No elements touching viewport edges (padding)

### Colors & Contrast
- [ ] Text readable on all backgrounds
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Dark overlays sufficient on image backgrounds
- [ ] Accent colors used sparingly (CTAs, highlights)
- [ ] No jarring color combinations

### Cards & Components
- [ ] All cards clean white with subtle shadows (no glassmorphism)
- [ ] Therapy cards: Medical images + dark overlay + white text
- [ ] Equal heights in grid layouts
- [ ] Consistent border radius (12-16px)
- [ ] Hover states smooth (lift + shadow increase)

### Buttons & CTAs
- [ ] All CTAs clearly visible
- [ ] Hover states distinct
- [ ] Touch targets 44px minimum (mobile)
- [ ] Consistent button styling
- [ ] WhatsApp button always accessible

### Images
- [ ] All images high resolution (no blur/pixelation)
- [ ] Proper aspect ratios (no stretching)
- [ ] Overlays used where needed for text readability
- [ ] Lazy loading for below-fold images
- [ ] WebP format with fallbacks

### Mobile Experience
- [ ] Hero slider swipeable
- [ ] Hamburger menu functional
- [ ] All text readable (not too small)
- [ ] No horizontal scrolling
- [ ] Touch targets adequate
- [ ] Images scale properly
- [ ] Footer stacks cleanly
- [ ] WhatsApp button positioned for thumb

### Animations & Interactions
- [ ] Smooth, not janky (60fps)
- [ ] Subtle, not distracting
- [ ] Purpose-driven (not gratuitous)
- [ ] Respectful of `prefers-reduced-motion`
- [ ] Hover states on all interactive elements

### Content Quality
- [ ] All copy proofread (no typos)
- [ ] Testimonials authentic and complete
- [ ] FAQ answers comprehensive
- [ ] Schedule data accurate
- [ ] Contact info correct

---

## 🚀 LAUNCH CHECKLIST

### Pre-Launch
- [ ] All sections implemented and styled
- [ ] Mobile responsiveness tested
- [ ] Performance optimized (Lighthouse 90+)
- [ ] Accessibility audit passed
- [ ] Cross-browser tested
- [ ] Content proofread
- [ ] Images optimized

### Deployment
- [ ] Build 11ty site (`npm run build`)
- [ ] Test production build locally
- [ ] Deploy to GitHub Pages
- [ ] Verify live site loads correctly
- [ ] Test all links (internal + WhatsApp)
- [ ] Check mobile on real device

### Post-Launch
- [ ] Monitor Google Analytics (if added)
- [ ] Check Google Search Console
- [ ] Verify WhatsApp links working
- [ ] Collect initial user feedback

---

## 📊 SUCCESS METRICS

**Design Quality**: 9+/10 (PowerFlow level)
**Mobile Score**: Perfect responsiveness 320px-1920px+
**Performance**: Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO)
**Load Time**: < 3 seconds on 3G
**Accessibility**: WCAG AA compliance
**User Feedback**: Professional, trustworthy, easy to navigate

---

## 🎯 DESIGN SKILL INTEGRATION

Throughout implementation, apply these design principles:

1. **Professional Photography Over Illustrations**
   - Real yoga practice images
   - Medical illustrations for therapy cards only
   - High-resolution, professionally composed

2. **Restrained Color Palette**
   - Stick to purple/pink brand colors
   - Use white/gray for neutrals
   - Avoid rainbow chaos

3. **Generous Whitespace**
   - Don't cram content
   - Let sections breathe
   - Strategic use of negative space

4. **Consistent Visual Language**
   - Same shadow levels across cards
   - Same border radius throughout
   - Same button styles everywhere

5. **Hierarchy Through Size & Weight**
   - Headings significantly larger than body
   - Weight contrast (700 vs 400)
   - Visual scanning path clear

6. **Purposeful Animation**
   - Enhance UX, don't distract
   - Smooth transitions only
   - Respect user preferences

7. **Mobile-First Thinking**
   - Design for phone, enhance for desktop
   - Touch-friendly always
   - Performance on slow connections

---

**END OF PLAN**

This document serves as the complete blueprint for Yog Chumbak website V1.0. Follow each section sequentially, checking off tasks as completed. Visual verification checklist ensures PowerFlow-level quality throughout implementation.
