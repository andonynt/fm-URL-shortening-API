const d = document;

const links = JSON.parse(localStorage.getItem('links')) || [];

function render() {
  const $template = d.getElementById('template').content,
    $links = d.getElementById('links');

  $links.innerHTML = '';

  links.forEach(link => {
    $template.querySelector('.url').textContent = link.original_link;
    $template.querySelector('.shortened-url').textContent = link.full_short_link;
    $template.querySelector('.shortened-url').setAttribute('href', link.full_short_link);
    $template.querySelector('#deleteLink').setAttribute('data-short', link.full_short_link)

    let $clone = d.importNode($template, true);
    $links.appendChild($clone);
  })

}

function saveLocalStorage() {
  window.localStorage.setItem('links', JSON.stringify(links));
}

if (links.length) {
  render();
}

const URLshortener = () => {
  const $form = d.getElementById('form'),
    $errorMessage = d.getElementById('error-message');

  $form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const url = $form.url.value;
      let response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`),
        results = await response.data.result;

      const exists = links.find(link => link.original_link === url);

      if (exists) {
        alert('Link already shortened');
        return;
      }

      const link = {
        original_link: results.original_link,
        full_short_link: results.full_short_link
      }
      links.push(link);
      $form.url.value = '';

      saveLocalStorage();
      render();

    } catch (error) {
      /* Handle error */
      $errorMessage.classList.remove('hidden', 'md:opacity-0', 'md:invisible');
      setTimeout(() => {
        $errorMessage.classList.add('hidden', 'md:opacity-0', 'md:invisible');
      }, 2000);
    }
  });

  d.addEventListener('click', e => {

    const $delete = d.getElementById('deleteLink');

    if (e.target.matches('#deleteLink')) {
      const url = e.target.getAttribute('data-short');
      const itemIndex = links.findIndex(link => link.full_short_link === url);
      links.splice(itemIndex, 1);
      saveLocalStorage();
      render();
    }

  })

};


export default URLshortener;