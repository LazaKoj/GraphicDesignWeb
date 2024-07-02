/*script.js*/
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeModal = document.getElementsByClassName("close")[0];

  document.querySelectorAll('.clickable').forEach(item => {
      item.addEventListener('click', event => {
          modal.style.display = "block";
          modalImg.src = event.target.src;
          captionText.innerHTML = event.target.alt;

          // Adding a slight delay to allow the modal to display before applying the show class
          setTimeout(() => {
              modal.classList.add('show');
              modalImg.classList.add('show');
          }, 10);
      });
  });

  closeModal.onclick = function() {
      modal.classList.remove('show');
      modalImg.classList.remove('show');

      // Delay the hiding of the modal to allow the transition to complete
      setTimeout(() => {
          modal.style.display = "none";
      }, 500);
  }

  modal.onclick = function(event) {
      if (event.target === modal) {
          modal.classList.remove('show');
          modalImg.classList.remove('show');

          // Delay the hiding of the modal to allow the transition to complete
          setTimeout(() => {
              modal.style.display = "none";
          }, 500);
      }
  }
});
