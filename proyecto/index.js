document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('clickable-image').addEventListener('click', function () {
        const image = this;
        const text = document.getElementById('hidden-text');

        
        image.classList.toggle('rotate');

    
        setTimeout(() => {
            text.style.display = text.style.display === 'none' ? 'block' : 'none';
        }, 100); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('clickable-image2').addEventListener('click', function () {
        const image = this;
        const text = document.getElementById('hidden-text2');

        
        image.classList.toggle('rotate2');

        
        setTimeout(() => {
            text.style.display = text.style.display === 'none' ? 'block' : 'none';
        }, 100); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    
    const nov1 = document.getElementById('nov1');
    const nov2 = document.getElementById('nov2');

    let showNov2 = localStorage.getItem('showNov2') === 'true';

    // Alterna la visibilidad
    if (showNov2) {
        nov1.style.display = 'none';
        nov2.style.display = 'flex';
    } else {
        nov1.style.display = 'flex';
        nov2.style.display = 'none';
    }

    
    localStorage.setItem('showNov2', !showNov2);
});

document.getElementById('producto').addEventListener('click', () => {
    window.location.href = 'productos.html';
});

