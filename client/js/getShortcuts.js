import { urlEndpoint, clientUrl } from "../config.js";
import updatedShortcut from "./updateShortcut.js";
import deleteShortcut from "./deleteShortcut.js";
import copyShortcut from "./copyShortcut.js";

const token = localStorage.getItem('token');

const shortcutCard = ({ _id: id, url, pathname }) => {
  const card = document.createElement('div');
  console.log(pathname);
  card.classList.add("shortcut");
  card.id = id;
  card.dataset.url = url;
  card.dataset.pathname = pathname;
  card.innerHTML = `
    <p>${urlEndpoint}${pathname}</p>
    <i class="fa-regular fa-copy"></i>
    <!-- <i class="fa-regular fa-circle-check"></i> -->
    <i class="fa-regular fa-pen-to-square"></i>
    <i class="fa-solid fa-trash"></i>`;
  const copy = card.querySelector('.fa-copy');
  const update = card.querySelector('.fa-pen-to-square');
  const trash = card.querySelector('.fa-trash');
  copyShortcut(copy);
  updatedShortcut(update);
  deleteShortcut(trash);
  return card;
}

fetch(`${urlEndpoint}api/v1/urls`, {
  method:"GET",
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(async response => {
  if(response.status === 401) {
    window.location = `${clientUrl}/login`;
  }
  if(!response.ok) {
    const err = await response.json();
    const errorCard = document.querySelector('.error');
    errorCard.textContent = err.message;
    errorCard.style.visibility = 'visible';
    return;
  }
  return response.json();
})
.then(data => {
  console.log(data);
  const shortcutsContainer = document.querySelector('.shortcuts-container');
  data.shortcuts.forEach(shortcut => {
    shortcutsContainer.prepend(shortcutCard(shortcut));
  });
})
.catch(err => console.error(err));