const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const studentSearch = document.querySelector(".student-search");
const search = document.querySelector(".search-users");
const button = document.querySelector(".button");
const btnEdit = document.querySelector(".btn-edit");
const btnCancel = document.querySelector(".btn-cancel");

function createCard(user) {
  const li = document.createElement("li");
  li.classList.add("student-item");
  li.classList.add("cf");
  li.innerHTML = `
  <div class="student-details">
    <img class="avatar" src="${user.picture.thumbnail}" alt="Profile Picture">
    <h3 class="name">${user.name.first}</h3>
    <span class="email">${user.email}</span>
  </div>
  <div class="joined-details">
    <span class="date">Joined ${user.registered}</span>
  </div>
   <div class="button-edit">
          <button class="btn-edit">Edit</button>
        </div>
  <div class="button-cancel">
          <button class="btn-cancel">Cancel</button>
        </div>
        
         `;

  return li;

  ////////////
}

// btnEdit.addEventListener("click", () => {
//   const nameSt = li.querySelector("h3");
//   const nameInput = document.createElement("input");
//   nameInput.type = "text";
//   nameInput.value = nameSt.innerText;
//   nameSt.replaceWith(nameInput);
//   nameSt.addEventListener("blur", () => {
//     nameSt.innerText = nameInput.value;
//     nameInput.replaceWith(nameSt);
//   });
// });
//function create button

function createBtn(nr) {
  let li = document.createElement("li");

  li.innerHTML = `
               <button type="button" class="btn">${nr}</button>
   `;

  return li;
}

// function loadUsers(users) {
//   studentList.innerHTML = "";
//   users.forEach((item) => {
//     studentList.appendChild(createCard(item));
//   });
// }

function loadUsers(users, page = 1) {
  studentList.innerHTML = "";
  const startIndex = (page - 1) * 5;
  const endIndex = startIndex + 5;
  const paginatedUsers = users.slice(startIndex, endIndex);
  paginatedUsers.forEach((item) => studentList.appendChild(createCard(item)));
}

function searchUsers(users, txt) {
  return users.filter((user) => {
    let c1 = user.name.first.toLowerCase().includes(txt.toLowerCase());
    let c2 = user.name.last.toLowerCase().includes(txt.toLowerCase());
    return c1 || c2;
  });
}

function generateButtons(number) {
  let num = parseInt(number);
  const container = document.querySelector(".link-list");
  for (let i = 1; i <= num; i++) {
    container.appendChild(createBtn(i));
  }
}

//function ce primeste ca parmetru un card si i-l face editabil

function changeCardToEdit(card) {
  console.log(card.children[0]);
  let name = card.querySelector(".name");

  let parent = card.querySelector(".student-details");

  let email = card.querySelector(".email");
  //todo:
  const nameInput = document.createElement("input");

  nameInput.classList.add("name-inpt");
  const emailInput = document.createElement("input");

  emailInput.classList.add("email-inpt");

  const btnEdit = card.querySelector(".btn-edit");

  btnEdit.classList.remove("btn-edit");
  btnEdit.classList.add("btn-save");
  btnEdit.textContent = "Save";

  nameInput.type = "text";
  nameInput.value = name.textContent;
  emailInput.type = "email";
  emailInput.value = email.textContent;
  console.log(name);
  parent.insertBefore(nameInput, name);
  parent.insertBefore(emailInput, email);
  name.innerHTML = "";
  email.innerHTML = "";
}

function saveCard(card, indexUser) {
  let name = card.querySelector(".name");
  let nameInpt = card.querySelector(".name-inpt");

  let parent = card.querySelector(".student-details");

  let email = card.querySelector(".email");

  let emailInpt = card.querySelector(".email-inpt");

  name.textContent = nameInpt.value;
  email.textContent = emailInpt.value;

  data[indexUser].name.first = nameInpt.value;
  data[indexUser].email = emailInpt.value;

  console.log(data[indexUser].name.first);
  console.log(data[indexUser].email);
  parent.insertBefore(nameInpt, name);
  parent.insertBefore(emailInpt, email);

  parent.removeChild(nameInpt);
  parent.removeChild(emailInpt);

  // Refacem butonul în "Edit"
  const btnSave = card.querySelector(".btn-save");
  btnSave.classList.remove("btn-save");
  btnSave.classList.add("btn-edit");
  btnSave.textContent = "Edit";
}

//todo:functie ce primeste ca paramteru  fname lname al unui user si returneaza indexul userului

function getUserPositionByEmail(em) {
  for (let i = 0; i < data.length; i++) {
    if (String(em).toLowerCase() === String(data[i].email).toLowerCase())
      return i;
  }
  return -1;
}

// Show modal
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const modalName = document.querySelector(".modal-name");
const modalEmail = document.querySelector(".modal-email");
const modalAvatar = document.querySelector(".modal-avatar");
function showModal(user) {
  modalAvatar.src = user.picture.large;
  modalAvatar.classList.add("avatar");
  modalName.textContent = `${user.name.first} ${user.name.last}`;
  modalEmail.textContent = `${user.email}`;
  modal.style.display = "block";
}

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
arrowRight.addEventListener("click", (e) => {
  let email =
    arrowRight.parentNode.parentNode.querySelector(".modal-email").textContent;

  let position = getUserPositionByEmail(email);

  showModal(data[position + 1]);
  if (position === 0) {
    return;
  }
});

arrowLeft.addEventListener("click", (e) => {
  let email =
    arrowRight.parentNode.parentNode.querySelector(".modal-email").textContent;

  let position = getUserPositionByEmail(email);

  showModal(data[position - 1]);
});

// nameInput.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     const newH3 = document.createElement("h3");
//     newH3.textContent = nameInput.value;
//     parent.insertBefore(newH3, name);
//     console.log(newH3);
//     nameInput.style.display = "none";
//   }
// });

// emailInput.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     const newEmail = document.createElement("span");
//     newEmail.textContent = emailInput.value;
//     parent.insertBefore(newEmail, email);
//     console.log(newEmail);
//     newEmail.style.display = "none";
//   }
// });

//app
loadUsers(data);
generateButtons(data.length / 5);

button.addEventListener("click", (e) => {
  console.log("aici");
  e.preventDefault();
  const user = search.value;

  let users = searchUsers(data, user);

  loadUsers(users);
});

linkList.addEventListener("click", (e) => {
  let btn = e.target;
  if (btn.tagName == "BUTTON") {
    const pageNumber = parseInt(btn.textContent);
    console.log(btn.textContent);
    loadUsers(data, pageNumber);
    document.querySelectorAll(".link-list button").forEach((button) => {
      button.classList.remove("active");
    });
    btn.classList.add("active");
  }
});

console.log("test");
let indexUser = -1;

studentList.addEventListener("click", (e) => {
  let obj = e.target;
  if (obj.classList.contains("btn-edit")) {
    let card = obj.parentNode.parentNode;
    let email = card.querySelector(".email");
    indexUser = getUserPositionByEmail(email.textContent);
    console.log(indexUser);
    changeCardToEdit(card);
    ///logica de edit
  } else if (obj.classList.contains("btn-save")) {
    //logica de save
    let card = obj.parentNode.parentNode;
    saveCard(card, indexUser);

    console.log(indexUser);
    indexUser = -1;
  } else if (obj.classList.contains("email")) {
    let emailUser = obj.textContent;
    let pozitie = getUserPositionByEmail(emailUser);
    showModal(data[pozitie]);
  } else if (obj.classList.contains("arrow-right")) {
    console.log("test");
    // let emailUser = obj.textContent;
    // let current = getUserPositionByEmail(emailUser);
    // showModal(data[current + 1]);
  } else if (obj.classList.contains("btn-edit")) {
    //cancel btn

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", function () {
      let emailUser = obj.textContent;
      let current = getUserPositionByEmail(emailUser);
    });
  }
});
alert("test");
