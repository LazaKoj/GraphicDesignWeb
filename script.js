document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landingPage');
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
        landingPage.classList.remove('hidden');
        setTimeout(() => {
            landingPage.classList.add('hidden');
            setTimeout(() => {
                landingPage.style.display = 'none';
            }, 1000);
        }, 4000);
        sessionStorage.setItem('hasVisited', 'true');
    } else {
        landingPage.style.display = 'none';
    }

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
                img.loading = 'lazy';

                const title = document.createElement('h3');
                title.textContent = image.title;

                const description = document.createElement('p');
                description.textContent = image.description;

                gridItem.appendChild(img);
                gridItem.appendChild(title);
                gridItem.appendChild(description);
                portfolioContainer.appendChild(gridItem);
            });

            initializeModal(images);
            initializeFadeInEffect();
        })
        .catch(error => console.error('Error loading images:', error));

    let mybutton = document.getElementById("backToTopBtn");

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    mybutton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function initializeModal(images) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeModal = document.getElementsByClassName("close")[0];
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    document.querySelectorAll('.clickable').forEach((item, index) => {
        item.addEventListener('click', event => {
            modal.style.display = "block";
            currentIndex = index;
            showImage();
        });
    });

    closeModal.onclick = function() {
        modal.classList.remove('show');
        modalImg.classList.remove('show');

        setTimeout(() => {
            modal.style.display = "none";
        }, 500);
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        showImage();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage();
    });

    function showImage() {
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].title;

        setTimeout(() => {
            modal.classList.add('show');
            modalImg.classList.add('show');
        }, 10);
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
