# Review Parser (Working Title)

Web scraping Node.js app for finding word associations to reviews given a product, by parsing reviews and finding most frequent words that occur in good and bad reviews, thereby highlighting the most praiseworthy and criticized aspects of the product in question.

Currently still a work in progress. It's just a minimal viable product, with much yet to be done.

## Getting Started

Clone the repository. You're all set :)

### Installing

1) install all the packages

```
Terminal: npm install
```

2) go to index.js file and pass a website link into the scraper function (only from yelp and amazon right now)

```
scraper('https://www.yelp.com/biz/tobys-public-house-brooklyn-4');
```

3) in terminal, navigate to the folder and then run index.js on node

```
Terminal: node index.js
```


Result:

The results are still very raw, but should come out in the terminal as follows:

```
Good:  [
    [ 'bathroom', 5 ],
    [ 'spot', 6 ],
    [ 'food', 7 ],
    [ 'beers', 7 ],
    [ 'back', 7 ],
    [ 'Toby\'s', 8 ],
    [ 'great', 9 ],
    [ 'neighborhood', 11 ],
    [ 'place', 15 ],
    [ 'pizza', 15 ]
]
Bad:  [
    [ 'Disaster', 1 ],
    [ '"calzone"', 1 ],
    [ '39', 1 ],
    [ 'soggy', 2 ],
    [ 'pizza', 2 ],
    [ 'inch', 2 ],
    [ 'calzone', 2 ],
    [ 'Toby\'s', 2 ],
    [ '16', 2 ],
    [ '12', 2 ]
]

```

## Running the tests

Yet to come...

## Built With

* [Nightmare.js](https://github.com/segmentio/nightmare#usage) - Electron-based browser automation library

## Improvements yet to come

* style - need to clean up code from this current MVP
* tests
* better standarization of site input, so users can add their own sites beyond just yelp and amazon right now
* pagination - right now can only scrape first page. need to rewrite parts to make it be able to turn pages on its own
* results - create results inside of a separate popup window rather than just printed in console...
* create into a google chrome app so can can current page in question

