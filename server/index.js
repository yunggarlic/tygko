const express = require('express');
const app = express();
const morgan = require('morgan');

const puppeteer = require('puppeteer');
const { parse } = require('node-html-parser');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5000;

//Logging Middleware
app.use(morgan('dev'));

//Webscrape Api middleware

app.use('/musicData', require('./api/musicData'));

setInterval(() => {
  bandcampScrape();
}, 6.048e8);

//Static-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

//Sending HTML in all cases
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//Output logs upon start up
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

const bandcampScrape = async () => {
  //creates DOM Object from stringified html
  console.log('hello bandcamp scraping');
  const pageHtml = await getPageHtml('http://tygko.bandcamp.com/music');
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
          .replace('&amp;', '&')
      );
    }
    if (pictures) {
      urlObject.pictures.push(pictures._attrs.href);
    }
  }
  fs.writeFile('data.json', urlObject, (err) => {
    console.error(err);
  });
  return urlObject;
};

const getPageHtml = async (url) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const pageHtml = await page.evaluate(
    'new XMLSerializer().serializeToString(document.doctype) + document.documentElement.outerHTML'
  );
  await browser.close();

  return pageHtml;
};
