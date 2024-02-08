# NetFreedom Index Crawler

This is an Apify script that scrapes the Net Freedom Index list from the Freedom House website. It extracts the country name, score, and freedom status for each country and saves the data as an array of objects.

## Usage

To run this script locally, you'll need to have Apify CLI installed on your machine.
```bash
npm -g install apify-cli
```

Once installed, you can run the script with the following command:

```bash
apify run
```

Or you can create a new actor on your console and run the script from there.

## Output

The script will output an array of objects, each representing a country's data from the Net Freedom Index. Each object will have the following structure:

```javascript
{
  name: 'Country Name',
  score: 'Score out of 100',
  status: 'Freedom status (Free, Partly Free, or Not Free)'
}
```

## Configuration

The script doesn't require any configuration. It's designed to scrape the latest Net Freedom Index data from the Freedom House website.

## Dependencies

This script relies on the following Apify libraries:

- `crawlee`: For crawling and scraping the web pages.
- `puppeteer`: For parsing HTML and extracting relevant data.

## Contributing

If you'd like to contribute to this project, please open a pull request with your proposed changes. Make sure to include a detailed description of your changes and any relevant tests.

## License

This project is licensed under the [MIT License](LICENSE).