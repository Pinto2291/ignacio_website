// /projects/project5/script.js
document.addEventListener('DOMContentLoaded', () => {
    
    const sidebar = document.getElementById('sidebar');
    // Exit if there is no sidebar on the page
    if (!sidebar) return;

    const sidebarTop = sidebar.offsetTop;
    const mainContent = document.querySelector('.main-content');

    window.addEventListener('scroll', () => {
        // Check if we are on a screen wide enough for the sticky effect
        if (window.innerWidth > 992) {
            const scrollTop = window.scrollY;

            // Check if user has scrolled past the sidebar's original top position
            if (scrollTop > sidebarTop - 32) { // 32px or 2rem for a little margin
                
                // Calculate where the main content ends
                const contentBottom = mainContent.offsetTop + mainContent.offsetHeight;
                const sidebarBottom = scrollTop + sidebar.offsetHeight;
                
                // Stop the sidebar from scrolling over the footer
                if(sidebarBottom >= contentBottom) {
                    sidebar.classList.remove('sticky');
                } else {
                    sidebar.classList.add('sticky');
                }

            } else {
                sidebar.classList.remove('sticky');

            }
        } else {
            // Remove sticky class on smaller screens
            sidebar.classList.remove('sticky');
        }
    });

    // We also need to recalculate the sidebar width if the window is resized
    function setSidebarWidth() {
        if (window.innerWidth > 992) {
            const sidebarWidth = sidebar.offsetWidth;
            document.styleSheets[0].addRule('.sidebar.sticky', `width: ${sidebarWidth}px !important;`);
        }
    }

    // Set initial width
    setSidebarWidth();
    // Update width on resize
    window.addEventListener('resize', setSidebarWidth);

});