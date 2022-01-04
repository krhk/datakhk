const DATAKHK_DATASET_URL = 'https://www.datakhk.cz/datasets/{{ID}}/about';
const DATAKHK_FEED_URL = 'https://www.arcgis.com/sharing/rest/content/groups/339c61fa68af42708bc4956ec52c7866?sortField=created&sortOrder=desc&f=json';
const DATAKHK_PREFIX = 'Nové nebo aktualizované datové sady:';

const EFFECT_SPEED = 5000;

const url = new URL(window.location.href);
const app = document.getElementById('app');

(async function () {
  // Fetch news
  const res = await fetch(DATAKHK_FEED_URL, { method: 'GET' });
  const content = await res.json();

  // Prepare news
  const news = Array.from(content.items || [])
    .map(item => {
      return {
        id: item.id,
        text: item.title,
        created: item.created,
        prefix: url.searchParams.get('prefix') || DATAKHK_PREFIX
      }
    });

  news.sort((x, y) => {
    return (x.created < y.created) ? 1 : ((x.created > y.created) ? -1 : 0);
  })

  effect(news);
})();

function effect(items) {
  let index = -1;

  const handler = () => {
    index = Math.min(index + 1, items.length - 1);
    update(items[index]);
  };

  handler();
  setInterval(handler, EFFECT_SPEED);
}

function update(item) {
  const url = DATAKHK_DATASET_URL.replace('{{ID}}', item.id);
  const date = (new Intl.DateTimeFormat('cs-CZ')).format(item.created);

  fadeIn(app);

  app.innerHTML = `
    <div><a target="_parent" href="${url}">${item.prefix} <strong>${date} ${item.text}</strong></a></div>
  `;
}

function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .01) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};
