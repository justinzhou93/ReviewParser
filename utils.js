module.exports = {
    typeCheck: function(input, nightmare){
        let DOMlegend = {
            id: '#',
            class: '.',
            className: '.',
            element: ''
        }
        if (typeof input === Object){
            nightmare.click(`${DOMlegend[input.identifier]}${input[input.identifier]}`);
        } else if (typeof input === String){
            nightmare.click(`.${input}`);
        }
    },
    // FIXME: make sure data object is dictionary object that is pass-by-reference from index.js file, review should be array
    reviewParse: function(review, data, goodbad){
        // add words to data one by one
        for (let i = 0; i < review.length; i++){
            // TODO: remove stopwords
            let stopwords = [];
            if (/*!stopword*/){
                if (data.hasOwnProperty(review[i])){
                    data[goodbad][review[i]]++;
                } else {
                    data[goodbad][review[i]] = 1;
                }
            }
        }
    },
    starCount: function(){
        if (){
            return 'good';
        } else if (){
            return 'bad';
        }
    }
}