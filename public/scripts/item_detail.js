const description = document.querySelector(".detail__description");

const readMoreButton = document.querySelector(".detail__button");

const fader = document.querySelector(".detail__fader");

function truncateDescription() {
  description.style.height = "120px";
  readMoreButton.classList.remove("hidden");
  fader.classList.remove("hidden");
}

function toggleReadMore() {
  if (readMoreButton.innerText === "Read More") {
    description.style.height = "auto";
    readMoreButton.innerText = "Read Less";
    fader.classList.add("hidden");
  } else {
    description.style.height = "120px";
    readMoreButton.innerText = "Read More";
    fader.classList.remove("hidden");
  }
}

if (description.clientHeight > 140) {
  truncateDescription();
}

readMoreButton.addEventListener("click", toggleReadMore);
