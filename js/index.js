document.addEventListener("DOMContentLoaded", function () {
    // Selectează toate imaginile din secțiunile "Colectii de Produse" și "Produse Noi"
    const images = document.querySelectorAll(".category img, .new-product img");
    
    images.forEach(image => {
        image.addEventListener("click", function () {
            window.location.href = "produse.html";
        });
    });
});
