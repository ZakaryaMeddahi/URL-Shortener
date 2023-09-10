
const logout = document.querySelector('.logout');

logout.onclick = () => {
  localStorage.removeItem('token');
}