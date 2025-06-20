document.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA) {
    // Check the saved theme to set the initial background color
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const initialBgColor = savedTheme === 'light' ? 0xf4f4f4 : 0x1a1a1a;

    // Store the Vanta effect in a global variable so we can control it later
    window.vantaEffect = VANTA.NET({
      el: "#hero",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x007bff,
      backgroundColor: initialBgColor, // Use the theme-aware color
      points: 12.00,
      maxDistance: 25.00,
      spacing: 18.00
    });
  }
});