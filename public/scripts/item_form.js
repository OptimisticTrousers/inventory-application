// Attach the event listener at the start, not inside the function
const itemImgPicker = document.querySelector(".hidden");
itemImgPicker.addEventListener("change", handleImagePicked);

async function handleImagePicked(e) {
  const file = e.target.files[0];

  if (!file) return;
  if (file.size > 10485760) {
    alert("File is too big. Max size is 10MB.");
    return;
  }

  const span = document.querySelector(".detail__instructions");
  span.innerText = "Uploading...";
  const imgElem = document.querySelector(".detail__image");

  // Initialize FileReader
  const reader = new FileReader();

  reader.onload = function (e) {
    imgElem.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

// prevent enter key from submitting form
function checkEnter(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
  }
}

const inputs = document.querySelectorAll(".detail__input");
for (const input of inputs) {
  input.addEventListener("keypress", checkEnter);
}
