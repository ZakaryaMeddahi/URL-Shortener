import { urlEndpoint } from '../config.js';

const trashes = document.querySelectorAll('.fa-trash');

const deleteShortcut = (trash) => {
  trash.onclick = (e) => {
    e.preventDefault();
    const card = e.target.parentElement;
    const token = localStorage.getItem('token');
  
    fetch(`${urlEndpoint}api/v1/urls/${card.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
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
      card.remove();
      console.log(data);
    })
    .catch(err => console.error(err));
  }
}

trashes.forEach(trash => {
  deleteShortcut(trash);
})

export default deleteShortcut;