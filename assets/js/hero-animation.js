// Wait for the DOM and VANTA to be ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA) {
    VANTA.NET({
      el: "#hero", // Selector for the hero section element
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x007bff, // Your primary blue color
      backgroundColor: 0x1a1a1a, // Your dark background color
      points: 12.00,
      maxDistance: 25.00,
      spacing: 18.00
    });
  }
});