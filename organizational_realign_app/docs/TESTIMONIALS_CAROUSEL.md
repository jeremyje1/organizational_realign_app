# TestimonialsCarousel Component Documentation

## Overview

The `TestimonialsCarousel` component is a modern, interactive carousel that showcases customer testimonials with an auto-scrolling feature and user controls. It provides a professional way to display social proof and customer success stories on the website.

## Features

- **Auto-scrolling**: Automatically advances through testimonials at a 5-second interval
- **User Controls**: 
  - Play/pause button to control auto-scrolling
  - Previous/next navigation buttons
  - Pagination dots for direct slide access
- **Responsive Design**: Adapts beautifully to all screen sizes
- **Smooth Animations**: Subtle fade and slide transitions between testimonials
- **Accessibility**: Includes proper ARIA attributes and screen reader support
- **Smart Behavior**: Automatically pauses when scrolled out of view
- **Visual Appeal**: Professional styling with gradient accents and testimonial information

## Usage

```jsx
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function HomePage() {
  return (
    <div>
      {/* Other components */}
      <TestimonialsCarousel />
      {/* More components */}
    </div>
  );
}
```

## Testimonial Data Structure

The component uses an array of testimonial objects with the following structure:

```typescript
interface Testimonial {
  quote: string;           // The testimonial text
  author: string;          // Name of the person giving the testimonial
  title: string;           // Job title of the person
  company: string;         // Company name
  results: string;         // Results achieved (e.g., "$2.3M Annual Savings")
  timeframe: string;       // Timeframe of results (e.g., "90 Days")
  rating: number;          // Star rating (1-5)
}
```

## Customization Options

To customize the testimonials, modify the `testimonials` array in the component. You can:

1. Add, remove, or modify testimonial entries
2. Adjust the auto-scroll timing (currently set to 5 seconds)
3. Customize the styling using Tailwind CSS classes
4. Modify animations by adjusting the Framer Motion variants

## Animation Details

The component uses Framer Motion for smooth animations:

- **Slide Transitions**: Content slides in and out with direction-aware animations
- **Dot Indicators**: Active dot scales slightly and changes color
- **Entrance Animation**: Section header fades in when scrolled into view

## Accessibility Considerations

The component includes:

- Proper ARIA labels on all interactive elements
- Screen reader announcements for current testimonial
- Keyboard navigation support
- Visible focus states
- Semantic HTML structure

## Demo

A demonstration page is available at `/demos/testimonials-carousel` which showcases the component in isolation and lists all of its features.

## Dependencies

- React
- Framer Motion
- Lucide Icons
- react-intersection-observer
- Tailwind CSS

## Performance Notes

The component is optimized for performance:

- Uses `AnimatePresence` for efficient animation management
- Only animates when in viewport using `useInView`
- Cleans up timers when unmounted to prevent memory leaks
- Conditionally renders minimal content
