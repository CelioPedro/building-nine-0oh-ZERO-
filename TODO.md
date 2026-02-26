# TODO - Replace AnimatedEye with 3D Spline Element

## Completed Tasks
- [x] Install @splinetool/react-spline library
- [x] Create BrandVisual3D.jsx component
  - [x] Import Spline, useRef, gsap, ScrollTrigger
  - [x] Use Spline with provided scene URL
  - [x] Set container height to 600px, black background, no borders/outlines
  - [x] On onLoad, find 'Group' object and set up ScrollTrigger for Y-axis rotation with scrub: 2
- [x] Update Home.jsx to import and use BrandVisual3D instead of AnimatedEye
- [x] Ensure responsive design and full width in about-banner__visual

## Testing
- [ ] Run dev server and verify 3D element loads in "Sobre a Marca" section
- [ ] Test scroll animation: object should rotate smoothly on Y-axis as user scrolls through the section
- [ ] Check responsiveness: element should be full width on desktop, hidden on mobile
- [ ] Verify aesthetic: floating glass technical artifact with reflections

## Notes
- Spline scene: https://prod.spline.design/EQlin0hVddTVcxG2/scene.splinecode
- Object to animate: 'Group' (Y-axis rotation)
- ScrollTrigger: scrub: 2 for smooth cinematic movement
- If object name is incorrect, check Spline editor for correct name
