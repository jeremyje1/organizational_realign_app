# Adding Jeremy Estrella's Professional Photo - Instructions

## Quick Setup (2 minutes)

### Step 1: Save Your Photo
1. Take the professional headshot image you provided
2. Save it as: `jeremy-estrella-founder.jpg`
3. Place it in: `public/images/jeremy-estrella-founder.jpg`

### Step 2: Update the Homepage Code
Once your photo is saved, update the homepage by:

1. Open `app/page.tsx`
2. Find the "Founder Bio Section" (around line 463)
3. Replace the placeholder div with the actual Image component

**Find this code block:**
```tsx
<div className="relative rounded-2xl shadow-xl bg-gradient-to-br from-slate-100 to-slate-200 h-96 w-80 mx-auto flex items-center justify-center">
  {/* Replace this div with your actual Image component once photo is added */}
  <div className="text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mx-auto mb-4 flex items-center justify-center">
      <span className="text-white text-3xl font-bold">JE</span>
    </div>
    <p className="text-slate-600 text-sm">Professional Photo</p>
    <p className="text-slate-500 text-xs">Coming Soon</p>
  </div>
</div>
{/* Uncomment when photo is ready:
<Image
  src="/images/jeremy-estrella-founder.jpg"
  alt="Jeremy Estrella, Founder of NorthPath Strategies"
  width={400}
  height={500}
  className="relative rounded-2xl shadow-xl object-cover"
  priority
/>
*/}
```

**Replace with:**
```tsx
<Image
  src="/images/jeremy-estrella-founder.jpg"
  alt="Jeremy Estrella, Founder of NorthPath Strategies"
  width={400}
  height={500}
  className="relative rounded-2xl shadow-xl object-cover"
  priority
/>
```

### Photo Requirements
- **Format**: JPG, PNG, or WebP
- **Dimensions**: 400x500 pixels (portrait orientation)
- **File size**: Under 500KB for optimal loading
- **Quality**: High-resolution professional headshot

### Alternative: Use Base64 Encoding
If you prefer, you can also convert your image to base64 and embed it directly:
1. Use an online base64 encoder
2. Replace the `src` attribute with: `data:image/jpeg;base64,YOUR_BASE64_STRING`

## What's Already Implemented

✅ **Professional Bio Section Added**
- Compelling personal story and background
- 15+ years of experience highlighted
- Oregon transformation success story included
- Key achievements and vision articulated
- Two call-to-action buttons for engagement

✅ **Design Elements**
- Professional layout with photo placeholder
- Gradient background effects
- Mobile-responsive design
- Strategic placement after testimonials
- Consistent branding with site theme

✅ **Content Strategy**
- Builds trust and credibility
- Highlights real-world impact
- Emphasizes student-centered approach
- Showcases leadership in major reorganization
- Connects personal mission to company vision

The bio section will significantly enhance the homepage credibility and help potential clients connect with your expertise and passion for organizational transformation.
