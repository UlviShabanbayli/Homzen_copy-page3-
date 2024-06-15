"use strict";

const safe = document.querySelector(".safe");
const salam = document.querySelector(".salam");

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
