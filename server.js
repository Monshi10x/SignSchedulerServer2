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

const TEST_MODE = process.env.PUPPETEER_TEST_MODE = true;
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
      headless: !TEST_MODE,
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
            await Promise.all([
                  page.waitForNavigation({waitUntil: 'networkidle2', timeout: 60000}),
                  page.click("#btnLogin")
            ]);
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

function setCorsHeaders(req, res) {
      const requestOrigin = req.get('origin');
      if(requestOrigin) {
            res.set('Access-Control-Allow-Origin', requestOrigin);
            res.set('Vary', 'Origin');
      } else {
            res.set('Access-Control-Allow-Origin', '*');
      }
      res.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
}

async function runInCorebridgeSession(script, args) {
      if(!page) {
            throw new Error('Corebridge proxy is not ready. Puppeteer page is not initialized.');
      }
      return await page.evaluate(script, args || {});
}

app.options('/CB_DesignBoard_Data', (req, res) => {
      setCorsHeaders(req, res);
      res.status(204).end();
});
app.get('/CB_DesignBoard_Data', async (req, resp) => {
      console.log("request to goto /CB_DesignBoard_Data");
      setCorsHeaders(req, resp);

      if(page != null) {
            try {
                  const result = await runInCorebridgeSession(async () => {
                        const response = await fetch("https://sar10686.corebridge.net/SalesModule/Orders/OrderProduct.asmx/GetOrderProductQueueEntriesPaged", {
                              headers: {
                                    accept: "application/json, text/javascript, */*; q=0.01",
                                    "accept-language": "en-GB,en;q=0.9",
                                    "content-type": "application/json; charset=UTF-8",
                                    priority: "u=1, i",
                                    "sec-ch-ua": "\"Not?A_Brand\";v=\"99\", \"Chromium\";v=\"130\"",
                                    "sec-ch-ua-mobile": "?0",
                                    "sec-ch-ua-platform": "\"Windows\"",
                                    "sec-fetch-dest": "empty",
                                    "sec-fetch-mode": "cors",
                                    "sec-fetch-site": "same-origin",
                                    "x-requested-with": "XMLHttpRequest"
                              },
                              referrer: "https://sar10686.corebridge.net/DesignModule/DesignMainQueue.aspx",
                              referrerPolicy: "strict-origin-when-cross-origin",
                              body: "{\"sEcho\":2,\"iColumns\":21,\"sColumns\":\"\",\"iDisplayStart\":0,\"iDisplayLength\":30,\"iSortCol_0\":6,\"sSortDir_0\":\"asc\",\"viewType\":\"design\",\"queueType\":\"design_wip\",\"txSearch\":\"\",\"pageIndex\":1,\"arrQueueFilters\":[null,\"\",null,\"\",\"\",\"\",null,\"\",null,null,\"\",\"\",null,null]}",
                              method: "POST",
                              mode: "cors",
                              credentials: "include"
                        });

                        const text = await response.text();
                        let data = null;
                        try {data = JSON.parse(text);} catch(_eParse) {data = text;}
                        return {
                              ok: response.ok,
                              status: response.status,
                              statusText: response.statusText,
                              data: data
                        };
                  });

                  if(!result.ok) {
                        resp.status(result.status || 502).json({
                              error: "Corebridge design board request failed.",
                              status: result.status,
                              statusText: result.statusText,
                              data: result.data
                        });
                        return;
                  }

                  CB_DesignBoard_Data = result && result.data && result.data.d ? result.data.d.QueueEntries : result.data;
                  dataFetchedTimes.push(Date.now());
                  resp.status(200).json(CB_DesignBoard_Data);
            } catch(err) {
                  resp.status(500).json({error: "Design board proxy failed.", detail: String(err && err.message ? err.message : err)});
            }
            return;
      }
      resp.status(503).json({error: 'Corebridge proxy is not ready.'});
});

app.options('/CB_OrderData_QuoteLevel', (req, res) => {
      setCorsHeaders(req, res);
      res.status(204).end();
});
app.get('/CB_OrderData_QuoteLevel', async (req, res) => {
      setCorsHeaders(req, res);
      console.log("Starting CB_OrderData_QuoteLevel fetch ");
      const orderId = String(req.query.orderId || '').trim();
      const accountId = String(req.query.accountId || '').trim();
      const accountName = String(req.query.accountName || '').trim();
      if(!orderId || !accountId || !accountName) {
            res.status(400).json({error: 'Missing required query params: orderId, accountId, accountName.'});
            return;
      }

      try {
            const result = await runInCorebridgeSession(async ({orderId, accountId, accountName}) => {
                  const accN1 = String(accountName).split(' ').join('+');
                  const accN2 = String(accountName).split(' ').join('%20');
                  const url =
                        'https://sar10686.corebridge.net/Api/OrderEntryCustomer/GetInitialOneTimeFormFields' +
                        '?OrderType=Order&IsEditMode=true&UseTheLatestProductSetupfee=true&MeasurementUnit=2' +
                        '&OrderIdentifier=00000000-0000-0000-0000-000000000000&OrderMode=OrderEdit&PdpIds=&Convert=' +
                        '&OrderId=' + encodeURIComponent(orderId) +
                        '&Acctid=' + encodeURIComponent(accountId) +
                        '&Acctname=' + accN1 +
                        '&PartId=&TxtPricingTierValue=&UseLite=false&LoadAll=false&LatestProdSetupFee=false';

                  const response = await fetch(url, {
                        headers: {
                              accept: '*/*',
                              'content-type': 'application/json; charset=utf-8',
                              'x-requested-with': 'XMLHttpRequest'
                        },
                        referrer:
                              'https://sar10686.corebridge.net/SalesModule/Orders/EditOrder.aspx?Edit=1&OrderId=' +
                              orderId +
                              '&acctid=' +
                              accountId +
                              '&acctname=' +
                              accN2,
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include'
                  });
                  const text = await response.text();
                  let data = null;
                  try {data = JSON.parse(text);} catch(_eParse) {data = text;}
                  return {
                        ok: response.ok,
                        status: response.status,
                        statusText: response.statusText,
                        url: url,
                        data: data
                  };
            }, {orderId, accountId, accountName});

            if(!result.ok) {
                  res.status(result.status || 502).json({
                        error: 'Corebridge quote-level request failed.',
                        status: result.status,
                        statusText: result.statusText,
                        url: result.url,
                        data: result.data
                  });
                  return;
            }
            res.status(200).json(result.data);
      } catch(err) {
            res.status(500).json({error: 'Quote-level proxy failed.', detail: String(err && err.message ? err.message : err)});
      }
});

app.options('/CB_OrderEntryProducts_PartSearchEntries', (req, res) => {
      setCorsHeaders(req, res);
      res.status(204).end();
});
app.get('/CB_OrderEntryProducts_PartSearchEntries', async (req, res) => {
      setCorsHeaders(req, res);
      console.log('CB_OrderEntryProducts_PartSearchEntries: request received', req.query);

      try {
            console.log('CB_OrderEntryProducts_PartSearchEntries: preparing Corebridge session request');
            const result = await runInCorebridgeSession(async ({queryParams}) => {
                  const params = new URLSearchParams(queryParams || {});
                  const ignoredQueryParamKeys = ['_ts', 'ts', 't', '_t', 'timestamp', '_timestamp'];
                  ignoredQueryParamKeys.forEach((key) => {
                        if(params.has(key)) {
                              console.log('CB_OrderEntryProducts_PartSearchEntries(browser): removing timestamp-like query param', key, params.get(key));
                              params.delete(key);
                        }
                  });
                  const baseUrl = 'https://sar10686.corebridge.net/Api/OrderEntryProducts/GetPartSearchEntries';
                  const sanitizedQueryParams = Object.fromEntries(params.entries());
                  const requestPayload = {
                        partGroupId: Number(sanitizedQueryParams.partGroupId || 0),
                        partCategoryId: Number(sanitizedQueryParams.partCategoryId || 0),
                        txSearch: String(sanitizedQueryParams.txSearch || ''),
                        pageIndex: Number(sanitizedQueryParams.pageIndex || 1),
                        useGetAllParts: String(sanitizedQueryParams.useGetAllParts || 'false').toLowerCase() === 'true'
                  };
                  const requestBody = JSON.stringify(requestPayload);
                  const commonOptions = {
                        headers: {
                              accept: 'application/json, text/javascript, */*; q=0.01',
                              'accept-language': 'en-US,en;q=0.9',
                              'content-type': 'application/json; charset=UTF-8',
                              'sec-fetch-dest': 'empty',
                              'sec-fetch-mode': 'cors',
                              'sec-fetch-site': 'same-origin',
                              'x-requested-with': 'XMLHttpRequest'
                        },
                        referrer: 'https://sar10686.corebridge.net/SalesModule/Estimates/QuickPrice.aspx',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        mode: 'cors',
                        credentials: 'include'
                  };

                  function getDataDebugInfo(data) {
                        if(Array.isArray(data)) {
                              return {type: 'array', rowCount: data.length};
                        }
                        if(data && typeof data === 'object') {
                              const keys = Object.keys(data);
                              const listLikeKey = keys.find((key) => Array.isArray(data[key]));
                              return {
                                    type: 'object',
                                    keys: keys,
                                    rowCount: listLikeKey ? data[listLikeKey].length : undefined,
                                    rowSource: listLikeKey || undefined
                              };
                        }
                        return {type: typeof data, rowCount: undefined};
                  }

                  async function parseResponse(response, url, methodUsed) {
                        const text = await response.text();
                        let data = null;
                        let parseMode = 'json';
                        try {data = JSON.parse(text);} catch(_eParse3) {data = text; parseMode = 'text';}
                        const debugInfo = getDataDebugInfo(data);
                        console.log(
                              'CB_OrderEntryProducts_PartSearchEntries(browser): fetch complete',
                              methodUsed,
                              response.status,
                              response.statusText,
                              'parseMode=',
                              parseMode,
                              'debugInfo=',
                              debugInfo
                        );
                        if(response.ok) {
                              console.log('CB_OrderEntryProducts_PartSearchEntries(browser): json fetched result', data);
                        } else {
                              console.log('CB_OrderEntryProducts_PartSearchEntries(browser): non-ok response body', data);
                        }
                        return {
                              ok: response.ok,
                              status: response.status,
                              statusText: response.statusText,
                              url: url,
                              methodUsed: methodUsed,
                              parseMode: parseMode,
                              debugInfo: debugInfo,
                              data: data
                        };
                  }

                  console.log('CB_OrderEntryProducts_PartSearchEntries(browser): fetching POST', baseUrl, requestPayload);
                  const postResponse = await fetch(baseUrl, {
                        ...commonOptions,
                        method: 'POST',
                        body: requestBody
                  });
                  let parsedResponse = await parseResponse(postResponse, baseUrl, 'POST');

                  if(parsedResponse.ok && parsedResponse.data && parsedResponse.data.IsSuccess === false) {
                        console.log('CB_OrderEntryProducts_PartSearchEntries(browser): upstream returned IsSuccess=false', parsedResponse.data);
                        parsedResponse.ok = false;
                        parsedResponse.status = 502;
                        parsedResponse.statusText = parsedResponse.data.Status || 'Upstream business error';
                  }

                  return parsedResponse;
            }, {queryParams: req.query});

            console.log('CB_OrderEntryProducts_PartSearchEntries: Corebridge response received', {
                  ok: result.ok,
                  status: result.status,
                  statusText: result.statusText,
                  url: result.url,
                  methodUsed: result.methodUsed,
                  parseMode: result.parseMode,
                  debugInfo: result.debugInfo
            });

            if(!result.ok) {
                  console.log('CB_OrderEntryProducts_PartSearchEntries: returning upstream error payload');
                  res.status(result.status || 502).json({
                        error: 'Corebridge part search request failed.',
                        status: result.status,
                        statusText: result.statusText,
                        url: result.url,
                        methodUsed: result.methodUsed,
                        parseMode: result.parseMode,
                        debugInfo: result.debugInfo,
                        data: result.data
                  });
                  return;
            }

            console.log('CB_OrderEntryProducts_PartSearchEntries: json fetched result', result.data);
            console.log('CB_OrderEntryProducts_PartSearchEntries: success response returned');
            res.status(200).json(result.data);
      } catch(err) {
            console.error('CB_OrderEntryProducts_PartSearchEntries: proxy error', err);
            res.status(500).json({
                  error: 'Part search proxy failed.',
                  detail: String(err && err.message ? err.message : err)
            });
      }
});

app.options('/CB_ProductNotesAll', (req, res) => {
      setCorsHeaders(req, res);
      res.status(204).end();
});
app.get('/CB_ProductNotesAll', async (req, res) => {
      setCorsHeaders(req, res);
      const orderProductId = String(req.query.orderProductId || '').trim();
      if(!orderProductId) {
            res.status(400).json({error: 'Missing required query param: orderProductId.'});
            return;
      }

      try {
            const result = await runInCorebridgeSession(async ({orderProductId}) => {
                  const notesByType = [];
                  for(let i = 1; i <= 5; i++) {
                        const url =
                              'https://sar10686.corebridge.net/Api/OrderProduct/GetProductNotesView' +
                              '?orderProductId=' +
                              encodeURIComponent(orderProductId) +
                              '&noteTypeId=' +
                              i +
                              '&isPdpEdit=false';
                        const response = await fetch(url, {
                              headers: {
                                    accept: '*/*',
                                    'content-type': 'application/json; charset=utf-8',
                                    'x-requested-with': 'XMLHttpRequest'
                              },
                              referrer: 'https://sar10686.corebridge.net/DesignModule/DesignMainQueue.aspx',
                              referrerPolicy: 'strict-origin-when-cross-origin',
                              method: 'GET',
                              mode: 'cors',
                              credentials: 'include'
                        });
                        const text = await response.text();
                        let data = null;
                        try {data = JSON.parse(text);} catch(_eParse2) {data = text;}
                        notesByType.push({
                              noteTypeId: i,
                              ok: response.ok,
                              status: response.status,
                              statusText: response.statusText,
                              data: data
                        });
                  }
                  return notesByType;
            }, {orderProductId});

            const failed = result.find((row) => !row.ok);
            if(failed) {
                  res.status(failed.status || 502).json({
                        error: 'Corebridge product notes proxy failed for one or more note types.',
                        orderProductId: orderProductId,
                        notesByType: result
                  });
                  return;
            }

            res.status(200).json(result);
      } catch(err) {
            res.status(500).json({error: 'Product notes proxy failed.', detail: String(err && err.message ? err.message : err)});
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
      let tokenPromise = null;
      try {
            if(!browser) {
                  console.log("puppeteer browser starting for Spandex...");
                  browser = await puppeteer.launch(PUPPETEER_LAUNCH_OPTIONS);
                  console.log("puppeteer browser started for Spandex");
            }

            spandexPage = await browser.newPage();
            console.log("Spandex: new page opened");
            let bearerToken = null;



            console.log("Spandex: navigating to login page");
            await spandexPage.goto('https://shop.spandex.com/en_AU/login', {
                  waitUntil: 'domcontentloaded',
                  timeout: 60000
            });

            console.log("Spandex: checking localStorage for existing token");
            let storedAuthToken = await spandexPage.evaluate(() => {
                  const authValue = localStorage.getItem('spartacus⚿AU_Site⚿auth');
                  if(!authValue) {
                        return null;
                  }
                  try {
                        const parsed = JSON.parse(authValue);
                        return parsed?.token?.access_token || null;
                  } catch(err) {
                        return null;
                  }
            });

            if(storedAuthToken) {
                  console.log("Spandex: existing bearer token found: " + storedAuthToken);
                  res.status(200).json({bearerToken: storedAuthToken});
                  return;
            }

            console.log("Spandex: waiting for login fields");
            await spandexPage.waitForSelector('#loginEmail', {timeout: 60000});

            console.log("Spandex: Closing cookie consent");
            await spandexPage.evaluate(() => {
                  const cookieDialog = document.querySelector('#CybotCookiebotDialog');
                  if(cookieDialog) {
                        cookieDialog.remove();
                  }
            });

            console.log("Spandex: entering credentials");
            await spandexPage.type('#loginEmail', 'admin.springwood@signarama.com.au');
            await spandexPage.type('#loginPassword', 'ChewyYoda93');
            console.log("Spandex: submitting login form");
            await delay(10);
            await spandexPage.click('button[type="submit"]');
            await spandexPage.click('button[type="submit"]');

            console.log("Spandex: waiting for bearer token response");
            tokenPromise = spandexPage.waitForResponse(async response => {
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
            }, {timeout: 60000}).catch(() => null);

            console.log("Spandex: waiting for token response to resolve");
            await tokenPromise;

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
                  res.status(500).json({error: 'Bearer token not found.'});
                  return;
            }

            console.log("Spandex: bearer token retrieved: " + bearerToken);
            res.status(200).json({bearerToken});
      } catch(err) {
            console.error('Failed to fetch Spandex bearer token', err);
            res.status(500).json({error: 'Failed to fetch bearer token.'});
      } finally {
            if(spandexPage) {
                  console.log("Spandex: closing page");
                  if(tokenPromise) {
                        await tokenPromise;
                  }
                  await spandexPage.close();
            }
      }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res) => {
      console.log('listening on port ' + PORT);
});;
