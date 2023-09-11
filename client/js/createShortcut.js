import { urlEndpoint } from '../config.js';
import updatedShortcut from "./updateShortcut.js";
import deleteShortcut from "./deleteShortcut.js";
import copyShortcut from "./copyShortcut.js";

const submit = document.getElementById('submit');

const shortcutCard = ({ _id: id, url, pathname }) => {
  const card = document.createElement('div');
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

submit.onclick = (e) => {
  e.preventDefault();
  const url = document.getElementById('url').value;
  const pathname = document.getElementById('pathname').value;
  const token = localStorage.getItem('token');

  fetch(`${urlEndpoint}api/v1/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body : JSON.stringify({ url, pathname })
  })
  .then(async response => {
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
    const shortcutsContainer = document.querySelector('.shortcuts-container');
    shortcutsContainer.prepend(shortcutCard(data.shortcut));
    pathname = '';
    url = '';
  })
  .catch(err => console.error(err));
}