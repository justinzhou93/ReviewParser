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
    console.log(site);
    nightmare.goto(link).wait(500);
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
        console.log(`nextpage: ${nextpage}`);
        console.log(data);
        nightmare
        .evaluate(() => {
            // traverse all of the reviews, splitting into ratings and content
            document.getElementsByClassName(site.reviewsection).forEach(review => {
                let rating = review.getElementsByClassName(site.stars)[0];
                let content = utils.contentTypeCheck(review, site.reviewtext);
                let contentFiltered = content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/);
                let goodbad = utils.starCount(rating, site.startext);
                utils.reviewParse(contentFiltered, data, goodbad);
            });
            // check if next button works
            console.log('helloworld');
            console.log(document.getElementsByClassName(site.next));
            if (!document.getElementsByClassName(site.next).length){
                nextpage = false;
            }
        });
        nextpage = false;
        // // check if next button works. EDIT: moved inside of first .evaluate cause it doesn't matter
        // .evaluate(() => {
        //     if (!document.getElementsByClassName(site.next)){
        //         nextpage = false;
        //     }
        // });
    }
    // go through 'data' hashmap to find the top words that aren't stopwords that can be returned
    let arraysObj = {
        good: [],
        bad: []
    };
    let stopwords = ["a","a's","able","about","above","according","accordingly","across","actually","after","afterwards","again","against","ain't","all","allow","allows","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","aside","ask","asking","associated","at","available","away","awfully","b","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","c'mon","c's","came","can","can't","cannot","cant","cause","causes","certain","certainly","changes","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","currently","d","definitely","described","despite","did","didn't","different","do","does","doesn't","doing","don't","done","down","downwards","during","e","each","edu","eg","eight","either","else","elsewhere","enough","entirely","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","far","few","fifth","first","five","followed","following","follows","for","former","formerly","forth","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","happens","hardly","has","hasn't","have","haven't","having","he","he's","hello","help","hence","her","here","here's","hereafter","hereby","herein","hereupon","hers","herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i","i'd","i'll","i'm","i've","ie","if","ignored","immediate","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","into","inward","is","isn't","it","it'd","it'll","it's","its","itself","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","little","look","looking","looks","ltd","m","mainly","many","may","maybe","me","mean","meanwhile","merely","might","more","moreover","most","mostly","much","must","my","myself","n","name","namely","nd","near","nearly","necessary","need","needs","neither","never","nevertheless","new","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","per","perhaps","placed","please","plus","possible","presumably","probably","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","shouldn't","since","six","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","t's","take","taken","tell","tends","th","than","thank","thanks","thanx","that","that's","thats","the","their","theirs","them","themselves","then","thence","there","there's","thereafter","thereby","therefore","therein","theres","thereupon","these","they","they'd","they'll","they're","they've","think","third","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","to","together","too","took","toward","towards","tried","tries","truly","try","trying","twice","two","u","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","uucp","v","value","various","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","we'll","we're","we've","welcome","well","went","were","weren't","what","what's","whatever","when","whence","whenever","where","where's","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","who's","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","won't","wonder","would","wouldn't","x","y","yes","yet","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","z","zero"]
;
    Object.keys(data).forEach(goodbad => {
        console.log(`goodbad: ${goodbad}`)
        Object.values(data[goodbad]).forEach(word => {
            // stopwords
            console.log(word);
            let k = 0;
            let isStopword = false;
            while (k < stopwords.length && stopwords[k] < word[0]){
                console.log(`checking stopwords: ${stopwords[k]}`)
                if (stopwords[k] === word[0]){
                    isStopword = true;
                }
                k++;
            }
            console.log(isStopword)
            if (!isStopword){
                if (arraysObj[goodbad].length === 0){
                    arraysObj[goodbad].push(word);
                } else {
                    let j = 0;
                    while (arraysObj[goodbad][i][1] < word[1] && j < arraysObj[goodbad].length){
                        j++;
                    }
                    arraysObj[goodbad].splice(j, 0, word);
                }
                if (arraysObj[goodbad].length > 20){
                    arraysObj[goodbad].splice(arraysObj[goodbad].length - 1, 1);
                }
            }
        });
    });
    // Object.values(data.good).forEach(word => {
    //     if (goodArray.length === 0){
    //         goodArray.push(word);
    //     } else if (goodArray.length < 20){
    //         let i = 0;
    //         while (goodArray[i][1] < word[1] && i < goodArray.length){
    //             i++;
    //         }
    //         goodArray.splice(i, 0, word);
    //     } else {
    //         let j = 0;
    //         while (goodArray[i][1] < word[1] && j < goodArray.length){
    //             j++;
    //         }
    //         goodArray.splice(j, 1, word);
    //     }
    // });
    // Object.values(data.bad).forEach(word => {
    //     if (badArray.length === 0){
    //         badArray.push(word);
    //     } else if (badArray.length < 20){
    //         let i = 0;
    //         while (badArray[i][1] < word[1] && i < badArray.length){
    //             i++;
    //         }
    //         badArray.splice(i, 0, word);
    //     } else {
    //         let j = 0;
    //         while (badArray[i][1] < word[1] && j < badArray.length){
    //             j++;
    //         }
    //         badArray.splice(j, 1, word);
    //     }
    // });
    console.log('Good: ', arraysObj.good);
    console.log('Bad: ', arraysObj.bad);
};

scraper('https://www.yelp.com/biz/rosalias-pizzeria-forest-hills');