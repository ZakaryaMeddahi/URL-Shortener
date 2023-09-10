
const copies = document.querySelectorAll('.fa-copy');

const copyShortcut = (copy) => {
  copy.onclick = (e) => {
    const card = e.target.parentElement;
    const shortcut = card.querySelector('p').textContent;
    navigator.clipboard.writeText(shortcut);
    e.target.className = 'fa-regular fa-circle-check';
    setTimeout(() => {
      e.target.className = 'fa-regular fa-copy';
    }, 2000);
  }
}

copies.forEach(copy => {
  copyShortcut(copy);
})

export default copyShortcut;