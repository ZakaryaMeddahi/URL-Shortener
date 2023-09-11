import { urlEndpoint, clientUrl } from "../config.js";

const login = document.getElementById('login');

login.onclick = (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(`${urlEndpoint}api/v1/auth/login`, {
    method: 'POST',
    // credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify({ email, password })
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
    // location.href = clientUrl;
    localStorage.setItem('token', data.token);
    console.log(data);
  })
  .catch(err => console.error(err));
}