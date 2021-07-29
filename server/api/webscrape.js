const router = require('express').Router();
const puppeteer = require('puppeteer');
const { parse } = require('node-html-parser');

router.get('/', async (req, res) => {
  try {
    //creates DOM Object from stringified html
    const pageHtml = await getPageHtml('http://tygko.bandcamp.com');
    const domObject = parse(pageHtml);

    //grabs the music grid and filters li elements into array
    const liArray = domObject
      .querySelector('#music-grid')
      .childNodes.filter((node) => {
        return node.rawTagName === 'li';
      });

    const musicUrls = [];
    const pictureUrls = [];
    const releaseTitles = [];
    liArray.forEach((htmlElement) => {
      htmlElement.childNodes.forEach((node) => {
        if (node.rawTagName === 'a') {
          //shaves off "href= text and outer quotation and pushes url
          musicUrls.push(
            '/' + node.rawAttrs.slice(7, node.rawAttrs.length - 1)
          );
          node.childNodes
            .filter((childNode) => {
              return childNode.rawTagName;
            })
            .forEach((childNode) => {
              childNode.childNodes.forEach((childNode) => {
                if (childNode.rawTagName === 'p') {
                  console.log(childNode);
                }
                if (childNode.rawTagName === 'img') {
                  const regex = /\bsrc\S+jpg\b/;
                  const result = childNode.rawAttrs.match(regex);
                  pictureUrls.push(result[0].slice(5));
                }
              });
            });
        }
      });
    });
    const urlObject = { musicUrls, pictureUrls };
    res.send(urlObject);
  } catch (err) {
    console.error(err);
  }
});

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
