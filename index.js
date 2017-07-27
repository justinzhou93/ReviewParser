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
            document.getElementsByClassName(site.reviewsection).forEach()
        })
        // check if next button works
        .evaluate(() => {
            if (!document.getElementsByClassName(site.next)){
                nextpage = false;
            }
        });
    }
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