// /projects/project4/script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Image Gallery Logic ---
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Get the full-size image URL from the clicked thumbnail
            // This replaces '100x100' with '600x600' from the placeholder URL
            const newSrc = this.src.replace('100x100', '600x600');
            mainImage.src = newSrc;

            // Update the active thumbnail
            document.querySelector('.thumbnail.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    // --- Quantity Selector Logic ---
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity-input');

    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    
    // --- "Add to Cart" Toast Notification Logic ---
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const toast = document.getElementById('toast-notification');
    
    addToCartBtn.addEventListener('click', () => {
        // Show the toast
        toast.classList.add('show');
        
        // Hide the toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    });

});