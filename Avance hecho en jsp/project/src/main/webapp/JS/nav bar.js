const toggleMenuElement = document.getElementById("toggle-menu");
const mainMenuElement = document.getElementById("main-menu");

toggleMenuElement.addEventListener("click", () => {
  mainMenuElement.classList.toggle("main-menu--show");
});

window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("bg-white",window.scrollY>0);
})
window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("bg-white",window.scrollY>0);
})