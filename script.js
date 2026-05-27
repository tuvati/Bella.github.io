const photoAlbums = {

  "Подружки": {
    id: "album-girlfriends",
    folder: "photos/girlfriends",
    files: [
      "g1.jpg","g2.jpg","g3.jpg","g4.jpg","g5.jpg"
    ]
  },

  "Мелкая": {
    id: "album-kitty",
    folder: "photos/kitty",
    files: [
      "k1.jpg","k2.jpg","k3.jpg","k4.jpg",
      "k5.jpg","k6.jpg","k7.jpg","k8.jpg",
      "k9.jpg","k10.jpg","k11.jpg","k12.jpg"
    ]
  },

  "Сурикат": {
    id: "album-meerkat",
    folder: "photos/meerkat",
    files: [
      "m1.jpg","m2.jpg","m3.jpg"
    ]
  },

  "Игрушки": {
    id: "album-plaything",
    folder: "photos/plaything",
    files: [
      "p1.jpg","p2.jpg","p3.jpg","p4.jpg",
      "p5.jpg","p6.jpg","p7.jpg"
    ]
  },

  "Террористка": {
    id: "album-terrorist",
    folder: "photos/terrorist",
    files: [
      "t1.jpg","t2.jpg","t3.jpg","t4.jpg",
      "t5.jpg","t6.jpg","t7.jpg","t8.jpg",
      "t9.jpg","t10.jpg","t11.jpg","t12.jpg",
      "t13.jpg","t14.jpg","t15.jpg","t16.jpg",
      "t17.jpg","t18.jpg","t20.jpg"
    ]
  }
};

const videoAlbums = {

  "Голодаю я": {
    id: "album-hungry",
    folder: "videos/hungry",
    files: [
      "h1.mp4","h2.mp4","h3.mp4","h4.mp4",
      "h5.mp4","h6.mp4","h7.mp4","h8.mp4",
      "h9.mp4","h10.mp4","h11.mp4","h12.mp4",
      "h13.mp4","h14.mp4","h15.mp4","h16.mp4",
      "h17.mp4"
    ]
  },

  "Белла Куклачёва": {
    id: "album-kuklacheva",
    folder: "videos/kuklacheva",
    files: [
      "k1.mp4","k2.mp4","k3.mp4","k4.mp4"
    ]
  },

  "Валяемся": {
    id: "album-lie",
    folder: "videos/lie",
    files: [
      "l1.mp4","l2.mp4","l3.mp4","l4.mp4",
      "l5.mp4","l6.mp4","l7.mp4","l8.mp4",
      "l9.mp4","l10.mp4","l11.mp4","l12.mp4",
      "l13.mp4","l14.mp4","l15.mp4","l16.mp4",
      "l17.mp4","l18.mp4","l19.mp4","l20.mp4",
      "l21.mp4","l22.mp4","l23.mp4","l24.mp4",
      "l25.mp4","l26.mp4"
    ]
  }
};

const photosContainer = document.getElementById("photos");
const videosContainer = document.getElementById("videos");

for (const albumName in photoAlbums) {

  const album = photoAlbums[albumName];

  const imageList = album.files.map(
    file => `${album.folder}/${file}`
  );

  const section = document.createElement("div");

  section.className = "album";

  section.id = album.id;

  section.innerHTML = `
    <h3>${albumName}</h3>
    <div class="gallery"></div>
  `;

  const gallery = section.querySelector(".gallery");

  imageList.forEach((src, index) => {

    const img = document.createElement("img");

    img.src = src;

    img.loading = "lazy";

    img.addEventListener("click", () => {
      openLightbox(imageList, index);
    });

    gallery.appendChild(img);
  });

  photosContainer.appendChild(section);
}

for (const albumName in videoAlbums) {

  const album = videoAlbums[albumName];

  const section = document.createElement("div");

  section.className = "album";

  section.id = album.id;

  section.innerHTML = `
    <h3>${albumName}</h3>
    <div class="video-grid"></div>
  `;

  const grid = section.querySelector(".video-grid");

  album.files.forEach(file => {

    const video = document.createElement("video");

    video.controls = true;

    video.preload = "metadata";

    video.src = `${album.folder}/${file}`;

    grid.appendChild(video);
  });

  videosContainer.appendChild(section);
}

let currentImages = [];

let currentIndex = 0;

function openLightbox(images, index) {

  currentImages = images;

  currentIndex = index;

  renderLightbox();
}

function renderLightbox() {

  const old = document.querySelector(".lightbox");

  if (old) old.remove();

  const lightbox = document.createElement("div");

  lightbox.className = "lightbox";

  lightbox.innerHTML = `
    <button class="nav prev">←</button>

    <img src="${currentImages[currentIndex]}">

    <button class="nav next">→</button>
  `;

  document.body.appendChild(lightbox);

  lightbox
    .querySelector(".prev")
    .addEventListener("click", (e) => {

      e.stopPropagation();

      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
      }

      renderLightbox();
    });

  lightbox
    .querySelector(".next")
    .addEventListener("click", (e) => {

      e.stopPropagation();

      currentIndex++;

      if (currentIndex >= currentImages.length) {
        currentIndex = 0;
      }

      renderLightbox();
    });

  lightbox.addEventListener("click", () => {
    lightbox.remove();
  });
}

document.addEventListener("keydown", (e) => {

  if (!document.querySelector(".lightbox")) return;

  if (e.key === "ArrowRight") {

    currentIndex++;

    if (currentIndex >= currentImages.length) {
      currentIndex = 0;
    }

    renderLightbox();
  }

  if (e.key === "ArrowLeft") {

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = currentImages.length - 1;
    }

    renderLightbox();
  }

  if (e.key === "Escape") {

    document
      .querySelector(".lightbox")
      ?.remove();
  }
});