# Spacing Guidelines & Design System

## Overview

This document outlines the comprehensive spacing system implemented for the Yog Chumbak website, based on a 4px grid system to ensure visual consistency, proper alignment, and optimal user experience across all devices.

## 4px Grid System

All spacing values follow a 4px base grid system to maintain visual rhythm and consistency throughout the design.

### Base Spacing Tokens

| Variable | Value | Usage |
|----------|-------|-------|
| `--space-0` | 0 | No spacing |
| `--space-1` | 0.25rem (4px) | Micro spacing |
| `--space-2` | 0.5rem (8px) | Small gaps |
| `--space-3` | 0.75rem (12px) | Component padding |
| `--space-4` | 1rem (16px) | Standard spacing |
| `--space-5` | 1.25rem (20px) | Medium spacing |
| `--space-6` | 1.5rem (24px) | Large component spacing |
| `--space-8` | 2rem (32px) | Section spacing |
| `--space-10` | 2.5rem (40px) | Large sections |
| `--space-12` | 3rem (48px) | XL sections |
| `--space-16` | 4rem (64px) | XXL sections |
| `--space-20` | 5rem (80px) | Hero sections |
| `--space-24` | 6rem (96px) | Maximum spacing |

### Semantic Spacing Tokens

For better maintainability and clear intent, semantic tokens are used throughout the codebase:

| Variable | Maps To | Usage |
|----------|---------|-------|
| `--space-component-sm` | `--space-3` | Small component padding |
| `--space-component-md` | `--space-4` | Medium component padding |
| `--space-component-lg` | `--space-6` | Large component padding |
| `--space-section-sm` | `--space-8` | Small section spacing |
| `--space-section-md` | `--space-12` | Medium section spacing |
| `--space-section-lg` | `--space-20` | Large section spacing |
| `--space-container-sm` | `--space-4` | Mobile container padding |
| `--space-container-md` | `--space-6` | Tablet container padding |
| `--space-container-lg` | `--space-8` | Desktop container padding |

## Component Spacing Rules

### Buttons
- **Small buttons**: `padding: var(--space-3) var(--space-6)`
- **Large buttons**: `padding: var(--space-4) var(--space-8)`
- **Touch targets**: Minimum 44px height and width
- **Gap between buttons**: `gap: var(--space-2)`

### Cards
- **Card padding**: `padding: var(--space-6)`
- **Gap between cards**: `gap: var(--space-6)`
- **Border radius**: `8px`

### Forms
- **Input padding**: `padding: var(--space-2) var(--space-4)`
- **Input height**: Minimum 44px
- **Form field gap**: `gap: var(--space-4)`

### Navigation
- **Nav items gap**: `gap: var(--space-8)`
- **Header padding**: `padding: var(--space-4) 0`
- **Logo margin**: `margin-bottom: var(--space-1)`

## Responsive Spacing Strategy

### Mobile-First Approach

#### Base (Mobile)
- **Container padding**: `0 var(--space-3)` (12px)
- **Section padding**: `var(--space-section-sm) 0` (32px)
- **Section header margin**: `margin-bottom: var(--space-6)` (24px)

#### Tablet (≥768px)
- **Container padding**: `0 var(--space-4)` (16px)
- **Section padding**: `var(--space-section-md) 0` (48px)
- **Section header margin**: `margin-bottom: var(--space-8)` (32px)

#### Desktop (≥1024px)
- **Container padding**: `0 var(--space-6)` (24px)
- **Section padding**: `var(--space-section-lg) 0` (80px)
- **Enhanced spacing**: Larger gaps for better content separation

## Typography Spacing

### Text Alignment
- **Headings**: Center-aligned for visual hierarchy
- **Body text**: Left-aligned for readability (max-width: 65ch)
- **Captions**: Left-aligned with proper spacing

### Line Spacing
- **Body text**: `line-height: 1.6`
- **Headings**: `line-height: 1.2-1.3`

### Text Margins
- **Paragraph spacing**: `margin-bottom: var(--space-4)` (16px)
- **Heading to content**: `margin-bottom: var(--space-2)` (8px)

## Grid System

### Gallery Grids
- **Desktop gap**: `gap: var(--space-8)` (32px)
- **Tablet gap**: `gap: var(--space-4)` (16px)
- **Mobile gap**: `gap: var(--space-3)` (12px)

### Component Grids
- **Standard gap**: `gap: var(--space-6)` (24px)
- **Compact gap**: `gap: var(--space-4)` (16px)

## Best Practices

### 1. Consistency
- Always use spacing tokens instead of arbitrary values
- Use semantic tokens for better maintainability
- Maintain consistent spacing patterns across similar components

### 2. Accessibility
- Ensure minimum 44px touch targets for all interactive elements
- Maintain adequate spacing between interactive elements
- Use proper contrast ratios with spacing consideration

### 3. Visual Hierarchy
- Use larger spacing for section separation
- Use smaller spacing for component cohesion
- Create clear visual rhythm through consistent spacing

### 4. Responsive Design
- Implement mobile-first spacing strategy
- Scale spacing appropriately across breakpoints
- Consider content density and reading comfort

## Implementation Examples

### Button Component
```css
.btn {
  padding: var(--space-3) var(--space-6);
  min-height: 44px;
  min-width: 44px;
  gap: var(--space-2);
}
```

### Card Component
```css
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-4);
}
```

### Section Component
```css
.section {
  padding: var(--space-section-lg) 0;
}

.section-header {
  margin-bottom: var(--space-12);
}
```

### Container System
```css
.container {
  padding: 0 var(--space-container-sm);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-container-md);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-container-lg);
  }
}
```

## Maintenance Guidelines

### Adding New Spacing
1. Check if existing token fits the need
2. If new spacing is required, add to base 4px grid
3. Consider adding semantic token for common patterns
4. Update documentation

### Review Process
1. Audit spacing consistency regularly
2. Check responsive behavior across breakpoints
3. Validate touch target sizes
4. Ensure visual hierarchy is maintained

## Tools & Validation

### CSS Custom Properties
All spacing is implemented using CSS custom properties for:
- Easy maintenance
- Theme consistency
- Runtime adjustments
- Better developer experience

### Linting Rules
- Enforce use of spacing tokens
- Prevent arbitrary spacing values
- Ensure responsive spacing patterns

## Conclusion

This spacing system ensures visual consistency, proper alignment, and optimal user experience across the Yog Chumbak website. By following these guidelines, we maintain a cohesive design system that scales effectively across all devices and use cases.

For questions or modifications to this spacing system, please refer to the design team or update this documentation accordingly.