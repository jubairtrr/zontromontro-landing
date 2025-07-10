document.addEventListener('DOMContentLoaded', function() {
  // Set the launch date (July 1, 2025)
  const launchDate = new Date("2025-07-01T00:00:00").getTime();

  // Update the countdown every second
  const timer = setInterval(() => {
    // Get current date and time
    const now = new Date().getTime();
    
    // Calculate the time remaining
    const distance = launchDate - now;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the corresponding elements
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // If the countdown is over, display a message
    if (distance < 0) {
      clearInterval(timer);
      document.querySelector(".countdown").innerHTML = '<div class="launch-message">We are live!</div>';
    }
  }, 1000);

  // Form submission animation
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      // We don't prevent default since we want the form to actually submit
      const button = this.querySelector('button');
      const originalText = button.innerText;
      
      // Change button text and disable it
      button.innerText = 'Thanks!';
      button.disabled = true;
      
      // After 3 seconds, reset the button
      setTimeout(() => {
        button.innerText = originalText;
        button.disabled = false;
      }, 3000);
    });
  }
});
