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

const propertiesWrapper = document.querySelector(
  ".properties__container-bottom"
);

const featuredWrapper = document.querySelector(
  ".featured__container-bottom__grid"
);

const teamsWrapper = document.querySelector(".teams__container-bottom");

const baseURL = "http://localhost:8080";

////////////////////
// Deleting data
const deleteData = async (endPoint, id) => {
  let response = await fetch(`${baseURL}/${endPoint}/${id}`, {
    method: "DELETE",
  });
  return response;
};

///////////////////////
// Getting data
const getDataWithCallBack = async (endPoint, cb) => {
  const response = await fetch(`${baseURL}/${endPoint}`).then((res) =>
    res.json()
  );

  cb(response);
};

/////////////////
// Posting data
const postData = async (endPoint, data) => {
  let response = await fetch(`${baseURL}/${endPoint}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".add");
const postBTN = document.querySelector(".add-data");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const picName = document.querySelector(".profile__image");
const name = document.querySelector(".name");
const profession = document.querySelector(".profession");
const phone = document.querySelector(".phone");
const email = document.querySelector(".email");
const address = document.querySelector(".address");

postBTN.addEventListener("click", async (e) => {
  e.preventDefault();

  const userObj = {
    id: self.crypto.randomUUID(),
    picName: picName.value
      ? picName.value
      : "https://mighty.tools/mockmind-api/content/human/65.jpg",
    name: name.value,
    prof: profession.value,
    phone: phone.value,
    email: email.value,
    address: address.value,
  };

  await postData("agents", userObj);
});

///////////
getDataWithCallBack("propertiesByCities", (datas) => {
  datas.forEach((data) => {
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

getDataWithCallBack("featured", (datas) => {
  datas.forEach((data) => {
    featuredWrapper.innerHTML += `
  <div class="featured__container-bottom__grid-item">
                <div>
                  <div>
                    <img
                      src="../src/img/featured-pics/${data.picName}"
                      alt="house"
                    />
                    <div>
                      <ul>
                        <li>featured</li>
                        <li>For sale</li>
                      </ul>
                      <ul>
                        <li>
                          <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        </li>
                        <li><i class="fa-regular fa-heart"></i></li>
                        <li><i class="fa-regular fa-eye"></i></li>
                      </ul>
                    </div>
                    <div>
                      <span>${data.design}</span>
                    </div>
                  </div>

                  <div>
                    <div>
                      <a href="#">${data.name}</a>
                    </div>
                    <div>
                      <i class="fa-solid fa-location-dot"></i>
                      <p>${data.address}</p>
                    </div>
                    <ul>
                      <li>
                        <i class="fa-solid fa-bed"></i>
                        <span>${data.bedroom}</span>
                      </li>
                      <li>
                        <i class="fa-solid fa-bath"></i>
                        <span>${data.bathroom}</span>
                      </li>
                      <li>
                        <i class="fa-solid fa-ruler"></i>
                        <span>${data.sqft} SqFT</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <img src="../src/img/featured-pics/${
                        data.agentImg
                      }" alt="" />
                    </div>
                    <p>${data.agent}</p>
                  </div>
                  <div>
                    <p><span>$${data.price}</span>/${
      data.isForSale ? "SqFT" : "month"
    }</p>
                  </div>
                </div>
              </div>
`;
  });
});

const tabs = document.querySelectorAll(".tab");
const allTab = document.querySelector(".all-tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();

    Array.from(tab.parentElement.parentElement.children).forEach((li) => {
      Array.from(li.children).forEach((a) => {
        a.classList.remove("active-tab");
      });
    });
    tab.classList.add("active-tab");
    featuredWrapper.innerHTML = "";
    getDataWithCallBack("featured", (datas) => {
      datas.forEach((data) => {
        if (Object.entries(data)[1][1] === tab.getAttribute("data-set")) {
          featuredWrapper.innerHTML += `
              <div class="featured__container-bottom__grid-item">
                            <div>
                              <div>
                                <img
                                  src="../src/img/featured-pics/${data.picName}"
                                  alt="house"
                                />
                                <div>
                                  <ul>
                                    <li>featured</li>
                                    <li>For sale</li>
                                  </ul>
                                  <ul>
                                    <li>
                                      <i class="fa-solid fa-arrow-right-arrow-left"></i>
                                    </li>
                                    <li><i class="fa-regular fa-heart"></i></li>
                                    <li><i class="fa-regular fa-eye"></i></li>
                                  </ul>
                                </div>
                                <div>
                                  <span>${data.design}</span>
                                </div>
                              </div>
            
                              <div>
                                <div>
                                  <a href="#">${data.name}</a>
                                </div>
                                <div>
                                  <i class="fa-solid fa-location-dot"></i>
                                  <p>${data.address}</p>
                                </div>
                                <ul>
                                  <li>
                                    <i class="fa-solid fa-bed"></i>
                                    <span>${data.bedroom}</span>
                                  </li>
                                  <li>
                                    <i class="fa-solid fa-bath"></i>
                                    <span>${data.bathroom}</span>
                                  </li>
                                  <li>
                                    <i class="fa-solid fa-ruler"></i>
                                    <span>${data.sqft} SqFT</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <div>
                                <div>
                                  <img src="../src/img/featured-pics/${
                                    data.agentImg
                                  }" alt="" />
                                </div>
                                <p>${data.agent}</p>
                              </div>
                              <div>
                                <p><span>$${data.price}</span>/${
            data.isForSale ? "SqFT" : "month"
          }</p>
                              </div>
                            </div>
                          </div>
          `;
        }
      });
    });
  });
});

allTab.addEventListener("click", (e) => {
  e.preventDefault();

  featuredWrapper.innerHTML = "";
  getDataWithCallBack("featured", (datas) => {
    datas.forEach((data) => {
      featuredWrapper.innerHTML += `
            <div class="featured__container-bottom__grid-item">
                          <div>
                            <div>
                              <img
                                src="../src/img/featured-pics/${data.picName}"
                                alt="house"
                              />
                              <div>
                                <ul>
                                  <li>featured</li>
                                  <li>For sale</li>
                                </ul>
                                <ul>
                                  <li>
                                    <i class="fa-solid fa-arrow-right-arrow-left"></i>
                                  </li>
                                  <li><i class="fa-regular fa-heart"></i></li>
                                  <li><i class="fa-regular fa-eye"></i></li>
                                </ul>
                              </div>
                              <div>
                                <span>${data.design}</span>
                              </div>
                            </div>
          
                            <div>
                              <div>
                                <a href="#">${data.name}</a>
                              </div>
                              <div>
                                <i class="fa-solid fa-location-dot"></i>
                                <p>${data.address}</p>
                              </div>
                              <ul>
                                <li>
                                  <i class="fa-solid fa-bed"></i>
                                  <span>${data.bedroom}</span>
                                </li>
                                <li>
                                  <i class="fa-solid fa-bath"></i>
                                  <span>${data.bathroom}</span>
                                </li>
                                <li>
                                  <i class="fa-solid fa-ruler"></i>
                                  <span>${data.sqft} SqFT</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <div>
                              <div>
                                <img src="../src/img/featured-pics/${
                                  data.agentImg
                                }" alt="" />
                              </div>
                              <p>${data.agent}</p>
                            </div>
                            <div>
                              <p><span>$${data.price}</span>/${
        data.isForSale ? "SqFT" : "month"
      }</p>
                            </div>
                          </div>
                        </div>
        `;
    });
  });
});

getDataWithCallBack("agents", (datas) => {
  datas.forEach((data) => {
    teamsWrapper.innerHTML += `
            <div class="teams__container-bottom__item" data-id="${data.id}">
              <div>
                <img src="../src/img/teams/${data.picName}" alt="" />
                <ul>
                  <li>
                    <a href=""><i class="fa-brands fa-facebook-f"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="fa-brands fa-linkedin-in"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="fa-brands fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="fa-brands fa-instagram"></i></a>
                  </li>
                  <li>
                    <button class="btn delete-btn">Delete</button>
                  </li>
                </ul>
              </div>
              <div>
                <h6>${data.name}</h6>
                <p>${data.prof}</p>
                <p><i class="fa-solid fa-phone"></i><span>${data.phone}</span></p>
                <p>
                  <i class="fa-solid fa-envelope"></i>
                  <span>${data.email}</span>
                </p>
                <p>
                  <i class="fa-solid fa-location-dot"></i>
                  <span> ${data.address} </span>
                </p>
                <a href="">Contact Agent</a>
              </div>
            </div>
    `;
  });

  const deleteBtn = document.querySelectorAll(".delete-btn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      let attrId = btn
        .closest(".teams__container-bottom__item")
        .getAttribute("data-id");

      deleteData("agents", attrId);
    });
  });
});

////////////////////
const hero = document.querySelector(".hero");
const properties = document.querySelector(".properties");
const featured = document.querySelector(".featured");
const searching = document.querySelector(".searching");
const services = document.querySelector(".services");
const testimonials = document.querySelector(".testimonials");
const teams = document.querySelector(".teams");
const news = document.querySelector(".news");
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
io.observe(searching);
io.observe(services);
io.observe(testimonials);
io.observe(teams);
io.observe(news);
