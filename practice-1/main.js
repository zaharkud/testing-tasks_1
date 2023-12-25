const defaultPreviewImageSrc = "./img/logo-example-img.png";

function updateImagePreview(event) {
  const prewiew = document.querySelector(".logo-uploader__preview");
  const addFileBtn = document.querySelector(".logo-uploader__add-file-btn");

  prewiew.src = URL.createObjectURL(event.target.files[0]);
  prewiew.onload = function () {
    URL.revokeObjectURL(prewiew.src)
  }
  addFileBtn.style.display = "none";
  prewiew.style.opacity = "1";
};

function deleteImagePreview(event) {
  const prewiew = document.querySelector(".logo-uploader__preview");
  const addFileBtn = document.querySelector(".logo-uploader__add-file-btn");

  prewiew.src = "./img/logo-example-img.png";
  prewiew.style.opacity = "0.5";
  addFileBtn.style.display = "flex";
}
