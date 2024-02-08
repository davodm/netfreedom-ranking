import { Actor } from "apify";
import { Dataset, PuppeteerCrawler } from "crawlee";

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init().
await Actor.init();

const crawler = new PuppeteerCrawler({
  launchContext: {
    launchOptions: {
      headless: true,
    },
  },
  maxRequestsPerCrawl: 1,

  // This function will be called for each URL to crawl.
  async requestHandler({ request, page, log }) {
    log.info(`Processing ${request.url}...`);
    await page.waitForSelector("table.responsive-enabled");

    const data = await page.$$eval('.country-scores', (rows) => {
      const result = [];
  
      rows.forEach((row) => {
        const country = row.querySelector('td:first-child a').textContent.trim();
        const score = row.querySelector('.score').textContent.trim();
        const status = row.querySelector('.status').textContent.trim();
  
        result.push({ country, score, status });
      });
  
      return result;
    });

    // Store the results to the default dataset.
    await Dataset.pushData(data);
  },
  // This function is called if the page processing failed more than maxRequestRetries+1 times.
  failedRequestHandler({ request, log }) {
    log.error(`Request ${request.url} failed too many times.`);
  },
});
await crawler.addRequests(["https://freedomhouse.org/countries/freedom-net/scores"]);
await crawler.run();

// Gracefully exit the Actor process. It's recommended to quit all Actors with an exit().
await Actor.exit();
