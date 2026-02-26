import { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandVisual3D = () => {
  const splineRef = useRef(null);

  const onLoad = (splineApp) => {
    // Store the Spline app instance
    splineRef.current = splineApp;

    // Find the 'Group' object (or the main object in the scene)
    const groupObject = splineApp.findObjectByName('Group');

    if (groupObject) {
      // Set up ScrollTrigger for smooth Y-axis rotation
      ScrollTrigger.create({
        trigger: '.about-banner', // The section containing the visual
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2, // Smooth scrubbing
        onUpdate: (self) => {
          // Rotate the object based on scroll progress
          const rotationY = self.progress * Math.PI * 2; // Full rotation over the section
          groupObject.rotation.y = rotationY;
        },
      });
    } else {
      console.warn('Object "Group" not found in Spline scene. Check the object name in Spline editor.');
    }
  };

  return (
    <div
      style={{
        height: '600px',
        backgroundColor: 'black',
        border: 'none',
        outline: 'none',
        width: '100%',
      }}
    >
      <Spline
        scene="https://prod.spline.design/EQlin0hVddTVcxG2/scene.splinecode"
        onLoad={onLoad}
        style={{
          height: '100%',
          width: '100%',
          border: 'none',
          outline: 'none',
        }}
      />
    </div>
  );
};

export default BrandVisual3D;
