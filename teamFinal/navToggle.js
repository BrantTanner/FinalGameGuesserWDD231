/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
window.myFunction = function () {
  const x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};