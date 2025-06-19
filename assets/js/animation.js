// assets/js/animation.js

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.querySelector('#hypercube');
    if (!canvas || typeof THREE === 'undefined') {
        console.error("Three.js canvas or library not found.");
        return;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create the Sphere Geometry (THE ONLY CHANGE IS HERE)
    // We increase the radius (the first number) to make the sphere itself larger.
    const geometry = new THREE.SphereGeometry(2.2, 32, 16); // Increased radius from 1.5 to 2.2

    // 5. Create the Material
    const material = new THREE.MeshNormalMaterial({
        wireframe: true 
    });
    
    // 6. Create the Mesh (Object)
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 7. Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the sphere on all three axes
        sphere.rotation.x += 0.002;
        sphere.rotation.y += 0.005;
        sphere.rotation.z += 0.003;

        renderer.render(scene, camera);
    };

    // 8. Handle Responsiveness (Unchanged)
    const onResize = () => {
        const parent = canvas.parentElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        
        if (width > 0 && height > 0) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
    };

    window.addEventListener('resize', onResize);
    onResize();
    animate();
});