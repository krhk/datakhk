const DATAKHK_DATASET_URL = 'https://www.datakhk.cz/datasets/{{ID}}/about';
const DATAKHK_FEED_URL = 'https://www.arcgis.com/sharing/rest/content/groups/339c61fa68af42708bc4956ec52c7866?sortField=created&sortOrder=desc&f=json';

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
      }
    });

  news.sort((x, y) => {
    return (x.created < y.created) ? 1 : ((x.created > y.created) ? -1 : 0);
  })

  show(news[0]);
})();

function show(item) {
  const url = DATAKHK_DATASET_URL.replace('{{ID}}', item.id);
  const date = (new Intl.DateTimeFormat('cs-CZ')).format(item.created);

  app.innerHTML = `
    <div><a href="${url}">${date} ${item.text}</a></div>
  `;
}
