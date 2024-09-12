var slideIndex = 1; // This starts the slideshow at the first slide

// Ensure DOM is loaded before running the slideshow
window.onload = function() {
  showSlides(slideIndex); // Show the first slide when the page loads
}

// This function increments/decrements the slide index when arrows are clicked
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// This function shows the slide based on the current slideIndex
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");

  // Reset slideIndex if it's out of bounds
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Show the current slide
  slides[slideIndex - 1].style.display = "block";  
}
