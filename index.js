let Nightmare = require('nightmare');
let nightmare = Nightmare({ show: true });
let sites = require('./sites.js');
let utils = require('./utils.js');

let scraper = function(link){
    let linkend = 0;
    let i = 0;
    while (i < link.length){
        if (link[i] === '.' && link.substring(i, i + 4) === '.com'){
            linkend = i + 4;
        }
        i++;
    }
    let site = sites[link.substring(0, linkend)];
    // go to link
    nightmare.goto(link).wait(500)
    // if not yet on reviews page, go to reviews page. else, just proceed to reviews
    if (site.reviewlink){
        // click reviewlink
        utils.typeCheck(site.reviewlink, nightmare);
    }
    // parse through all objects and loop through next pages
    let nextpage = true;
    let data = {good: {}, bad: {}};
    while (nextpage){
        // check all reviews on the page
        nightmare
        .evaluate(() => {
            //TODO: crux of algorithm. need to finish it.
            document.getElementsByClassName(site.reviewsection).forEach(review => {
                // FIXME: need to parse these elements to work properly
                let rating = review.children;
                let content = review.children;
                let contentFiltered = content;
                let goodbad = utils.starCount(rating);
                utils.reviewParse(contentFiltered, data, goodbad);
            })
            // check if next button works
            if (!document.getElementsByClassName(site.next)){
                nextpage = false;
            }
        })
        // // check if next button works. EDIT: moved inside of first .evaluate cause it doesn't matter
        // .evaluate(() => {
        //     if (!document.getElementsByClassName(site.next)){
        //         nextpage = false;
        //     }
        // });
    }
    // go through 'data' hashmap to find the top words that aren't stopwords that can be returned
    let goodArray = [];
    let badArray = [];
    // FIXME: make this code dry. too repetitive right now. 
    Object.values(data.good).forEach(word => {
        if (goodArray.length === 0){
            goodArray.push(word);
        } else if (goodArray.length < 20){
            let i = 0;
            while (goodArray[i][1] < word[1] && i < goodArray.length){
                i++;
            }
            goodArray.splice(i, 0, word);
        } else {
            let j = 0;
            while (goodArray[i][1] < word[1] && j < goodArray.length){
                j++;
            }
            goodArray.splice(j, 1, word);
        }
    });
    Object.values(data.bad).forEach(word => {
        if (badArray.length === 0){
            badArray.push(word);
        } else if (badArray.length < 20){
            let i = 0;
            while (badArray[i][1] < word[1] && i < badArray.length){
                i++;
            }
            badArray.splice(i, 0, word);
        } else {
            let j = 0;
            while (badArray[i][1] < word[1] && j < badArray.length){
                j++;
            }
            badArray.splice(j, 1, word);
        }
    });
};

// nightmare
// .goto('https://duckduckgo.com')
// .type('#search_form_input_homepage', 'github nightmare')
// .click('#search_button_homepage')
// .wait('#zero_click_wrapper .c-info__title a')
// .evaluate(function () {
// return document.querySelector('#zero_click_wrapper .c-info__title a').href;
// })
// .end()
// .then(function (result) {
// console.log(result);
// })
// .catch(function (error) {
// console.error('Search failed:', error);
// });