const d = document;

const links = [];

const URLshortener = () => {
  const $form = d.getElementById('form'),
    $errorMessage = d.getElementById('error-message'),
    $template = d.getElementById('template').content,
    $links = d.getElementById('links')

  $form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const url = $form.url.value;
      let response = await axios.get(`https://api.shrtco.de/v2/shorten?url=${url}`),
        results = await response.data.result;

      if (!links.includes(results.full_short_link)) {
        $template.querySelector('.url').textContent = results.original_link;
        $template.querySelector('.shortened-url').textContent = results.full_short_link;
        $template.querySelector('.shortened-url').setAttribute('href', results.full_short_link);
        $template.querySelector('.txt').textContent = results.full_short_link;

        let $clone = d.importNode($template, true);
        $links.appendChild($clone);

        links.push(results.full_short_link);
        return;
      }

      alert('Already shortened');

    } catch (error) {
      /* Handle error */
      $errorMessage.classList.remove('hidden', 'md:opacity-0', 'md:invisible');

      setTimeout(() => {
        $errorMessage.classList.add('hidden', 'md:opacity-0', 'md:invisible');
      }, 2000);
    }
  });

  d.addEventListener('click', e => {

    const $copyToClipboardBtn = d.getElementById('copyToClipboardBtn');
    if (e.target === $copyToClipboardBtn) {
      let copyText = e.target.previousElementSibling;
      console.log(copyText);
      copyText.select();
      document.execCommand('Copy');
    }
  })

};


export default URLshortener;