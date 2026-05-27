// --------------------
// PHOTO DATA
// --------------------

const photoAlbums = {
  "Подружки": {
    folder: "photos/girlfriends",
    files: ["g1.jpg","g2.jpg","g3.jpg","g4.jpg","g5.jpg"]
  },

  "Мелкая": {
    folder: "photos/kitty",
    files: ["k1.jpg","k2.jpg","k3.jpg","k4.jpg","k5.jpg","k6.jpg","k7.jpg","k8.jpg","k9.jpg","k10.jpg","k11.jpg","k12.jpg"]
  },

  "Сурикат": {
    folder: "photos/meerkat",
    files: ["m1.jpg","m2.jpg","m3.jpg"]
  },

  "Игрушки": {
    folder: "photos/plaything",
    files: ["p1.jpg","p2.jpg","p3.jpg","p4.jpg","p5.jpg","p6.jpg","p7.jpg"]
  },

  "Коридорный террорист": {
    folder: "photos/terrorist",
    files: ["t1.jpg","t2.jpg","t3.jpg","t4.jpg","t5.jpg","t6.jpg","t7.jpg","t8.jpg","t9.jpg","t10.jpg","t11.jpg","t12.jpg","t13.jpg","t14.jpg","t15.jpg","t16.jpg","t17.jpg","t18.jpg","t20.jpg"]
  }
};

// --------------------
// VIDEO DATA
// --------------------

const videoAlbums = {
  "Голодаю я": {
    folder: "videos/hungry",
    files: Array.from({length: 17}, (_,i)=>`h${i+1}.mp4`)
  },

  "Белла Куклачёва": {
    folder: "videos/kuklacheva",
    files: ["k1.mp4","k2.mp4","k3.mp4","k4.mp4"]
  },

  "Валяюсь": {
    folder: "videos/lie",
    files: Array.from({length: 26}, (_,i)=>`l${i+1}.mp4`)
  }
};

// --------------------
// RENDER PHOTOS
// --------------------

const photoRoot = document.getElementById("photoAlbums");
const videoRoot = document.getElementById("videoAlbums");

for (const name in photoAlbums) {
  const album = photoAlbums[name];

  const images = album.files.map(f => `${album.folder}/${f}`);

  const div = document.createElement("div");
  div.className = "album";

  div.innerHTML = `
    <div class="album-title">${name}</div>
    <div class="count">${images.length} фото</div>
    <div class="grid"></div>
  `;

  const grid = div.querySelector(".grid");

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;

    img.onclick = () => openLightbox(images, index);

    grid.appendChild(img);
  });

  photoRoot.appendChild(div);
}

// --------------------
// RENDER VIDEOS (lazy)
// --------------------

for (const name in videoAlbums) {
  const album = videoAlbums[name];

  const div = document.createElement("div");
  div.className = "album";

  div.innerHTML = `
    <div class="album-title">${name}</div>
    <div class="count">${album.files.length} видео</div>
    <div class="grid"></div>
  `;

  const grid = div.querySelector(".grid");

  album.files.forEach(file => {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "none"; // 🔥 важно для скорости
    video.src = `${album.folder}/${file}`;

    grid.appendChild(video);
  });

  videoRoot.appendChild(div);
}

// --------------------
// LIGHTBOX
// --------------------

let current = [];
let index = 0;

function openLightbox(images, i) {
  current = images;
  index = i;
  renderLightbox();
}

function renderLightbox() {
  document.querySelector(".lightbox")?.remove();

  const lb = document.createElement("div");
  lb.className = "lightbox";

  lb.innerHTML = `
    <button class="arrow left">‹</button>
    <img src="${current[index]}"/>
    <button class="arrow right">›</button>
  `;

  lb.onclick = () => lb.remove();

  lb.querySelector(".left").onclick = (e) => {
    e.stopPropagation();
    index = (index - 1 + current.length) % current.length;
    renderLightbox();
  };

  lb.querySelector(".right").onclick = (e) => {
    e.stopPropagation();
    index = (index + 1) % current.length;
    renderLightbox();
  };

  document.body.appendChild(lb);
}

// keyboard navigation
document.addEventListener("keydown", e => {
  if (!document.querySelector(".lightbox")) return;

  if (e.key === "ArrowLeft") {
    index = (index - 1 + current.length) % current.length;
    renderLightbox();
  }

  if (e.key === "ArrowRight") {
    index = (index + 1) % current.length;
    renderLightbox();
  }

  if (e.key === "Escape") {
    document.querySelector(".lightbox")?.remove();
  }
});