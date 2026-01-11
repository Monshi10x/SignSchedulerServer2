const {timeStamp} = require('console');
const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');


const app = express();
app.use(express.static(path.join(__dirname) + "/javascript"));
app.use('/javascript', express.static(__dirname + '/javascript'));//

app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname) + '/views/index.html');
});

function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
}

const TEST_MODE = process.env.PUPPETEER_TEST_MODE === 'true';
const PUPPETEER_LAUNCH_OPTIONS = {
      args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--deterministic-fetch',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials',
      ],
      headless: TEST_MODE,
};

let CB_DesignBoard_Data;
var dataFetchedTimes = [];
var browser = null;
var page = null;
(async () => {
      try {
            console.log("puppeteer browser starting...");
            browser = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
            console.log("puppeteer browser started");
            await delay(1000);
            page = await browser.newPage();
            console.log("puppeteer new page opened");

            await delay(1000);
            await page.goto("https://sar10686.corebridge.net/DesignModule/DesignMainQueue.aspx", {
                  waitUntil: "load",
                  timeout: 60000
            });
            console.log("puppeteer goto page");

            await page.waitForSelector('input[id=txtUsername]');
            await page.type('#txtUsername', 'tristan');
            await page.type('#txtPassword', 'tristan10x');
            await page.click("#btnLogin");
            await page.waitForNavigation();
            console.log("waiting for navigation");

            page.on('response', async response => {
                  const url = response.url();
                  try {
                        const req = response.request();
                        const orig = req.url();

                        if(orig == "https://sar10686.corebridge.net/SalesModule/Orders/OrderProduct.asmx/GetOrderProductQueueEntriesPaged") {
                              let data = await response.json();
                              CB_DesignBoard_Data = data.d.QueueEntries;
                              dataFetchedTimes.push(Date.now());
                              console.log("Data Fetched Times: ", dataFetchedTimes);
                        }
                  } catch(err) {
                        console.error(`Failed getting data from: ${url}`, err);
                  }
            });
      } catch(err) {
            console.error('Failed Puppeteer', err);
      }
})();

app.get("/designBoard", (req, res) => {
      res.sendFile(path.join(__dirname) + '/views/designBoard.html');
});

app.get("/jobBoard", (req, res) => {
      res.sendFile(path.join(__dirname) + '/views/ScheduleBoard.html');
});

app.get('/CB_DesignBoard_Data', (req, resp) => {
      console.log("request to goto /CB_DesignBoard_Data");

      if(page != null) {
            (async () => {
                  await page.evaluate(async () => {
                        const response = await fetch("https://sar10686.corebridge.net/SalesModule/Orders/OrderProduct.asmx/GetOrderProductQueueEntriesPaged", {
                              "headers": {
                                    "accept": "application/json, text/javascript, */*; q=0.01",
                                    "accept-language": "en-GB,en;q=0.9",
                                    "content-type": "application/json; charset=UTF-8",
                                    "priority": "u=1, i",
                                    "sec-ch-ua": "\"Not?A_Brand\";v=\"99\", \"Chromium\";v=\"130\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-ch-ua-platform": "\"Windows\"",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-requested-with": "XMLHttpRequest"
                              },
                              "referrer": "https://sar10686.corebridge.net/DesignModule/DesignMainQueue.aspx",
                              "referrerPolicy": "strict-origin-when-cross-origin",
                              "body": "{\"sEcho\":2,\"iColumns\":21,\"sColumns\":\"\",\"iDisplayStart\":0,\"iDisplayLength\":30,\"iSortCol_0\":6,\"sSortDir_0\":\"asc\",\"viewType\":\"design\",\"queueType\":\"design_wip\",\"txSearch\":\"\",\"pageIndex\":1,\"arrQueueFilters\":[null,\"\",null,\"\",\"\",\"\",null,\"\",null,null,\"\",\"\",null,null]}",
                              "method": "POST",
                              "mode": "cors",
                              "credentials": "include"
                        });
                  });
                  resp.status(200).json(CB_DesignBoard_Data);
            })();
      }
});

app.get('/SpandexBearerToken', async (req, res) => {
      const allowedOrigins = [
            'https://sar10686.corebridge.net',
            'https://shop.spandex.com',
      ];
      const requestOrigin = req.get('origin');
      if(requestOrigin && allowedOrigins.includes(requestOrigin)) {
            res.set('Access-Control-Allow-Origin', requestOrigin);
            res.set('Vary', 'Origin');
      }
      let spandexPage = null;
      try {
            if(!browser) {
                  console.log("puppeteer browser starting for Spandex...");
                  browser = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
                  console.log("puppeteer browser started for Spandex");
            }

            spandexPage = await browser.newPage();
            console.log("Spandex: new page opened");
            let bearerToken = null;

            console.log("Spandex: waiting for bearer token response");
            const tokenPromise = spandexPage.waitForResponse(async response => {
                  try {
                        const contentType = response.headers()['content-type'] || '';
                        if(!contentType.includes('application/json')) {
                              return false;
                        }
                        const data = await response.json();
                        const token = data?.access_token
                              || data?.token
                              || data?.bearer_token
                              || data?.data?.access_token
                              || data?.data?.token;
                        if(token) {
                              bearerToken = token;
                              return true;
                        }
                  } catch(err) {
                        return false;
                  }
                  return false;
            }, { timeout: 60000 });

            console.log("Spandex: navigating to login page");
            await spandexPage.goto('https://shop.spandex.com/en_AU/login', {
                  waitUntil: 'domcontentloaded',
                  timeout: 60000
            });

            console.log("Spandex: handling cookie consent");
            const cookieButton = await spandexPage.waitForSelector(
                  '#CybotCookiebotDialogBodyButtonDecline',
                  { timeout: 60000 }
            );
            await cookieButton.click();

            console.log("Spandex: waiting for login fields");
            await spandexPage.waitForSelector('#loginEmail', { timeout: 60000 });
            console.log("Spandex: entering credentials");
            await spandexPage.type('#loginEmail', 'admin.springwood@signarama.com.au');
            await spandexPage.type('#loginPassword', 'ChewyYoda93');
            console.log("Spandex: submitting login form");
            await delay(500);
            await spandexPage.click('button[type="submit"]');

            console.log("Spandex: waiting for token response to resolve");
            await tokenPromise.catch(() => null);

            if(!bearerToken) {
                  console.log("Spandex: checking localStorage for token");
                  bearerToken = await spandexPage.evaluate(() => {
                        return localStorage.getItem('access_token')
                              || localStorage.getItem('token')
                              || localStorage.getItem('bearer_token');
                  });
            }

            if(!bearerToken) {
                  console.log("Spandex: bearer token not found");
                  res.status(500).json({ error: 'Bearer token not found.' });
                  return;
            }

            console.log("Spandex: bearer token retrieved");
            console.log("Spandex: logging out");
            await spandexPage.evaluate(() => {
                  const logoutLink = document.querySelector('a[href="/en_AU/logout"]');
                  if(logoutLink) {
                        logoutLink.click();
                  }
            });
            res.status(200).json({ bearerToken });
      } catch(err) {
            console.error('Failed to fetch Spandex bearer token', err);
            res.status(500).json({ error: 'Failed to fetch bearer token.' });
      } finally {
            if(spandexPage) {
                  console.log("Spandex: closing page");
                  await spandexPage.close();
            }
      }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
      console.log('listening on port ' + PORT);
});;
