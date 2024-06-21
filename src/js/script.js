"use strict";

const safe = document.querySelector(".safe");
const salam = document.querySelector(".salam");

const formLink1 = document.querySelector(".form-link1");
const formLink2 = document.querySelector(".form-link2");

let toogleInterval = () => {
  setTimeout(() => {
    safe.classList.toggle("hidden");
    salam.classList.toggle("hidden");
  }, 2000);
};

toogleInterval();

setInterval(() => {
  toogleInterval();
}, 4000);

formLink1.addEventListener("click", function () {
  this.classList.add("active-btn");
  formLink2.classList.remove("active-btn");
});
formLink2.addEventListener("click", function () {
  this.classList.add("active-btn");
  formLink1.classList.remove("active-btn");
});

///////////////////////
// Getting data

const propertiesWrapper = document.querySelector(
  ".properties__container-bottom"
);

const baseURL = "http://localhost:8080";

const getDataWithCallBack = async (endPoint, cb) => {
  const response = await fetch(`${baseURL}/${endPoint}`).then((res) =>
    res.json()
  );

  cb(response);
};

getDataWithCallBack("propertiesByCities", (datas) => {
  datas.forEach((data) => {
    console.log(data);

    propertiesWrapper.innerHTML += `
        <div class="properties__container-bottom__item">
        <div>
        <img
        src="../src/img/properties-pics/${data.picName}"
        alt="${data.heading}"
        />
        </div>
        <div>
        <h6>
        <a href="#">${data.heading}</a>
        </h6>
        <p>${data.count} properties</p>
        <div>
        <a class="btn-view" href="#">Explore Now</a>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="size-6"
        >
        <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
        />
        </svg>
        </div>
        </div>
        </div>
        `;
  });
});

const hero = document.querySelector(".hero");
const properties = document.querySelector(".properties");
const featured = document.querySelector(".featured");
const cb = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("inview");
    }
  });
};
const io = new IntersectionObserver(cb);
io.observe(hero);
io.observe(properties);
io.observe(featured);
