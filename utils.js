module.exports = {
    typeCheck: function(input, nightmare){
        console.log(`in typecheck, input = ${input}`);
        let DOMlegend = {
            id: '#',
            class: '.',
            className: '.',
            element: ''
        };
        if (typeof input === Object){
            nightmare.click(`${DOMlegend[input.identifier]}${input[input.identifier]}`);
        } else if (typeof input === String){
            nightmare.click(`.${input}`);
        }
    },
    contentTypeCheck: function(review, contentTag){
        console.log(`in contenttypecheck, arguments = ${arguments}`);
        if (typeof input === Object){
            if (contentTag.identifier === 'element'){
                return review.getElementsByTagName(contentTag.element)[0];
            } else if (contentTag.identifier === 'id'){
                return review.getElementById(contentTag.element)[0];
            }
        } else if (typeof input === String){
            return review.getElementsByClassName(contentTag)[0];
        }
    },
    reviewParse: function(review, data, goodbad){
        // add words to data one by one
        console.log(`in reviewParse, arguments = ${arguments}`);
        for (let i = 0; i < review.length; i++){
            // NOTE: remove stopwords later, when you're looking for the top words. should save computation
            if (data.hasOwnProperty(review[i])){
                data[goodbad][review[i]][1]++;
            } else {
                data[goodbad][review[i]] = [review[i], 1];
            }
        }
    },
    // FIXME: need to finish how to check for good or bad review
    starCount: function(rating, startext){
        console.log(`in starCount, arguments = ${arguments}`);
        let parsedRating;
        // test = x || y
        if (startext === 'title'){
            parsedRating = rating.title[0];
        } else if (startext === 'span>innerHTML'){
            parsedRating = rating.children[0].innerHTML;
        }
        if (parsedRating < 3){
            return 'good';
        } else if (parsedRating > 3){
            return 'bad';
        }
    }
}