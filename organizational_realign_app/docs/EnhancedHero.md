# EnhancedHero Component Documentation

## Overview

The `EnhancedHero` component is a modern, visually appealing hero section designed for the NorthPath Strategies website. It features a clean layout with animated elements, clear call-to-action buttons, and a responsive design that works well on both desktop and mobile devices.

## Features

- **Animated Content**: Using Framer Motion for smooth, staggered animations
- **Responsive Layout**: Adapts seamlessly from mobile to desktop
- **Visual Elements**:
  - Gradient background with subtle grid pattern
  - Floating decorative elements
  - Dashboard visualization
  - Trust indicators (ratings and number of clients)
- **Call-to-Action Buttons**: Primary and secondary buttons with hover effects
- **Modern Typography**: Clean, readable text hierarchy

## Usage

```jsx
import EnhancedHero from '@/components/EnhancedHero';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <EnhancedHero />
      {/* Rest of the page content */}
    </>
  );
}
```

## Requirements

- Next.js 13+ with App Router
- Tailwind CSS
- Framer Motion
- Lucide React (for icons)

## CSS Dependencies

The component relies on a grid pattern background defined in `globals-hero.css`:

```css
.bg-grid-pattern {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
}
```

## Assets

The component uses the following assets:

- `/public/images/organizational-dashboard.png` - Dashboard visualization image

## Customization

### Changing the Headline and Subheadline

Modify the text content within the `<motion.h1>` and `<motion.p>` elements:

```jsx
<motion.h1 
  variants={itemVariants}
  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
>
  Your New Headline Here
</motion.h1>

<motion.p 
  variants={itemVariants}
  className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
>
  Your new subheadline text here
</motion.p>
```

### Changing Button Text and Links

Update the Link components and button text:

```jsx
<Link href="/your-new-link">
  <motion.button
    variants={buttonVariants}
    whileHover="hover"
    whileTap="tap"
    className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
  >
    New Button Text
    <ArrowRight className="h-5 w-5" />
  </motion.button>
</Link>
```

### Changing Colors

The component uses Tailwind CSS classes for styling. To change the color scheme, update the color classes:

- Primary color: Replace `blue-600`, `blue-50`, etc. with your preferred color
- Secondary color: Replace `indigo-50`, `indigo-200`, etc.

## Accessibility

The component includes:

- Semantic HTML structure
- Proper heading hierarchy
- Accessible button and link elements
- Sufficient color contrast
- Keyboard navigation support

## Browser Compatibility

Tested and working in:
- Chrome
- Firefox
- Safari
- Edge
