# Image Overlay System Documentation

## Overview

The NorthPath Strategies website now features an enhanced image overlay system that allows for better text readability when text appears over images. This system has been implemented across the site to ensure consistent presentation and optimal contrast.

## Implementation Details

### Components Modified

1. **ResponsiveImage Component**
   - Added overlay support with multiple overlay types
   - Support for opacity control
   - Custom gradient overlay options

2. **OptimizedBackground Component**
   - Enhanced overlay support
   - WebP format detection and optimization

3. **EnhancedHero Component**
   - Updated to use the diagonal overlay for better text contrast
   - Removed separate overlay div (now handled by ResponsiveImage)

4. **PageHero Component**
   - Converted to use ResponsiveImage with overlay
   - Improved readability for page headers

5. **PagesBackground Components**
   - Updated with ResponsiveImage overlay system
   - Better white overlay for content backgrounds

### Available Overlay Types

The `ResponsiveImage` component now supports the following overlay types:

1. **Solid**: A simple solid color overlay with adjustable opacity
   ```jsx
   overlay={true}
   overlayType="solid"
   overlayColor="#000000"  // Can be any color
   overlayOpacity={0.5}    // 0.0 to 1.0
   ```

2. **Gradient**: A customizable gradient overlay
   ```jsx
   overlay={true}
   overlayType="gradient"
   overlayGradient="from-black/60 via-black/50 to-black/70"  // Tailwind classes
   ```

3. **Vignette**: A radial gradient that darkens the edges
   ```jsx
   overlay={true}
   overlayType="vignette"
   overlayOpacity={0.7}  // Adjust overall intensity
   ```

4. **Diagonal**: A diagonal gradient overlay (top-left to bottom-right)
   ```jsx
   overlay={true}
   overlayType="diagonal"
   overlayOpacity={0.6}
   ```

5. **Vertical**: A vertical gradient overlay
   ```jsx
   overlay={true}
   overlayType="vertical"
   overlayOpacity={0.6}
   ```

### CSS Classes Added

New CSS classes have been added to `globals.css`:

- `.bg-vignette`: Radial gradient for edge darkening effect
- `.bg-gradient-overlay`: Vertical gradient overlay
- `.bg-diagonal-overlay`: Diagonal gradient overlay
- Dark mode support for all overlay types

## Usage Guidelines

### Best Practices

1. **Choosing Overlay Type**
   - **Solid**: Best for simple overlay needs
   - **Gradient**: Best for hero sections and dramatic effects
   - **Vignette**: Best for portraits and focused content
   - **Diagonal**: Best for hero sections with text on left side
   - **Vertical**: Best for tall sections with varied content

2. **Contrast Considerations**
   - Use higher opacity (0.6-0.8) for light text on light images
   - Use lower opacity (0.3-0.5) for light text on dark images
   - Test text readability at different screen sizes

3. **Performance**
   - All overlays are implemented with CSS only (no extra images)
   - Minimal impact on page performance

### Example Implementation

```jsx
<ResponsiveImage
  src="/images/hero-image.jpg"
  alt="Hero section background"
  fill
  className="object-cover"
  overlay={true}
  overlayType="diagonal"
  overlayOpacity={0.6}
/>
```

## Accessibility Improvements

The new overlay system ensures:

1. **Text Contrast**: Meeting WCAG AA standards for text contrast
2. **Readability**: Improved legibility of text over images
3. **Dark Mode**: Enhanced overlays for dark mode users
4. **Focus Visibility**: Better visibility for focused interactive elements

## Future Improvements

Future enhancement opportunities:

1. Add multi-layer overlay support
2. Create preset overlay styles for different content types
3. Implement automatic contrast adjustment based on image brightness
4. Add more complex gradient patterns for specialized use cases
