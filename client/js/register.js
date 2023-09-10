import { urlEndpoint, clientUrl } from "../config.js";

const register = document.getElementById('register');

register.onclick = (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(`${urlEndpoint}api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({ username, email, password })
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
    location.href = clientUrl;
    localStorage.setItem('token', data.token);
    console.log(data);
  })
  .catch(err => console.error(err));
}