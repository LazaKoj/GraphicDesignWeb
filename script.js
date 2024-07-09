document.addEventListener('DOMContentLoaded', () => {
    fetch('images.json')
        .then(response => response.json())
        .then(images => {
            const portfolioContainer = document.getElementById('portfolio');

            images.forEach(image => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');

                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.title;
                img.classList.add('clickable');
                img.loading = 'lazy';  // Enable lazy loading

                const title = document.createElement('h3');
                title.textContent = image.title;

                const description = document.createElement('p');
                description.textContent = image.description;

                gridItem.appendChild(img);
                gridItem.appendChild(title);
                gridItem.appendChild(description);
                portfolioContainer.appendChild(gridItem);
            });

            // Initialize the modal functionality after images are added
            initializeModal();
            // Initialize the fade-in effect for images
            initializeFadeInEffect();
        })
        .catch(error => console.error('Error loading images:', error));

    // Initialize the menu functionality
    initializeMenu();
});

function initializeModal() {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeModal = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.clickable').forEach(item => {
        item.addEventListener('click', event => {
            modal.style.display = "block";
            modalImg.src = event.target.src;
            captionText.innerHTML = event.target.alt;

            setTimeout(() => {
                modal.classList.add('show');
                modalImg.classList.add('show');
            }, 10);
        });
    });

    closeModal.onclick = function() {
        modal.classList.remove('show');
        modalImg.classList.remove('show');

        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            modalImg.classList.remove('show');

            setTimeout(() => {
                modal.style.display = "none";
            }, 500);
        }
    }
}

function initializeFadeInEffect() {
    const fadeInElements = document.querySelectorAll('.grid-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

function initializeMenu() {
    const menuToggle = document.querySelector('.menu-button');
    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        const navList = document.querySelector('.nav-right');
        if (!menuOpen) {
            menuToggle.classList.add('open');
            navList.classList.remove('fade-out');
            navList.classList.add('active');
            menuOpen = true;
        } else {
            menuToggle.classList.remove('open');
            navList.classList.remove('active');
            navList.classList.add('fade-out');
            setTimeout(() => {
                navList.classList.remove('fade-out');
            }, 1000); 
            menuOpen = false;
        }
    });
}