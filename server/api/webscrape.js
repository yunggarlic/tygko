const router = require('express').Router();
const puppeteer = require('puppeteer');
const { parse } = require('node-html-parser');
const redis = require('redis');
const redisPort = process.env.REDIS_URL || 6379;
const client = redis.createClient(redisPort);

router.get('/', async (req, res) => {
  try {
    //redis db stores strings for 4 hours to reduce webscraping api calls
    client.get('all', async (err, scrapedData) => {
      if (err) throw err;

      if (scrapedData) {
        res.status(200).send(scrapedData);
      } else {
        //if the redis does not have anything already saved to it, run long webscrape
        const data = await bandcampScrape();
        let idx = 0;
        for (let key in data) {
          //setex(pire) = 4 hours before deletion
          client.setex(idx, 14400, JSON.stringify(key));
          idx++;
        }
        client.setex('all', 14400, JSON.stringify(data));
        await res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

const bandcampScrape = async () => {
  //creates DOM Object from stringified html
  const pageHtml = await getPageHtml('http://tygko.bandcamp.com');
  const domObject = parse(pageHtml);

  //grabs the artist homepage release grid and filters each li element into array
  const liArray = domObject
    .querySelector('#music-grid')
    .childNodes.filter((node) => {
      return node.rawTagName === 'li';
    });

  const musicUrls = [];
  //scrapes each track url and stuffs into array for later use
  liArray.forEach((htmlElement) => {
    htmlElement.childNodes.forEach((node) => {
      if (node.rawTagName === 'a') {
        //shaves off "href= text and outer quotation and pushes url
        musicUrls.push('/' + node.rawAttrs.slice(7, node.rawAttrs.length - 1));
      }
    });
  });

  const urlObject = { musicUrls, titles: [], pictures: [] };
  //Takes each url from music grid and does the same as above
  for (const url of musicUrls) {
    const pageHtml = await getPageHtml(`http://tygko.bandcamp.com/${url}`);
    const domObject = parse(pageHtml);
    const title = domObject.querySelector('.trackTitle');
    const pictures = domObject.querySelector('.popupImage');
    if (title) {
      urlObject.titles.push(
        title.innerHTML
          .replace(/^\s+|\s+$|\s+(?=\s)/g, '')
          .replace(/\b&amp;\b/, '&')
      );
    }
    if (pictures) {
      urlObject.pictures.push(pictures._attrs.href);
    }
  }
  return urlObject;
};

const getPageHtml = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const pageHtml = await page.evaluate(
    'new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML'
  );
  await browser.close();

  return pageHtml;
};

module.exports = router;
