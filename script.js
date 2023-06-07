const MenuBtn = document.getElementById("menubtn");
const MenuContainer = document.getElementById("menucontainer");
const closepopup = document.getElementById("closepopup");
const overlay = document.getElementById("overlay");
const OfferContainer = document.querySelector(".popup");
let MenuIsOpen = false;
MenuBtn.addEventListener("click", () => {
  if (!MenuIsOpen) {
    MenuIsOpen = true;
    MenuBtn.classList.add("open");
    MenuContainer.classList.add("open");
  } else {
    MenuIsOpen = false;
    MenuBtn.classList.remove("open");
    MenuContainer.classList.remove("open");
  }
});
const ContainersToShowContent = document.querySelectorAll(
  "[data-show-on-screen]"
);
const appearoptions = {
  rootMargin: "0px 0px -300px 0px",
};
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      for (var i = 0; i < entry.target.children.length; i++) {
        entry.target.children[i].classList.add("show-on-screen");
      }
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearoptions);
ContainersToShowContent.forEach((container) => {
  appearOnScroll.observe(container);
});
document.addEventListener("click", (e) => {
  const IsDropDownButton = e.target.matches("[data-dropdown-button]");
  if (!IsDropDownButton && e.target.closest("[data-dropdown]") != null) return;
  let currentDropDown;
  if (IsDropDownButton) {
    currentDropDown = e.target.closest("[data-dropdown]");
    currentDropDown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
    if (dropdown === currentDropDown) return;
    dropdown.classList.remove("active");
  });
});
if (closepopup !== null) {
  closepopup.addEventListener("click", () => {
    CloseOffer();
  });
}
function PopUpOffer() {
  if (OfferContainer == null) return;
  OfferContainer.classList.add("active");
  overlay.classList.add("active");
}
function CloseOffer() {
  OfferContainer.classList.remove("active");
  overlay.classList.remove("active");
}
setTimeout(PopUpOffer, 3000);
