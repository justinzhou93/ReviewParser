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
    reviewParse: function(review, data, goodbad){
        // add words to data one by one
        for (let i = 0; i < review.length; i++){
            // NOTE: remove stopwords later, when you're looking for the top words. should save computation
            if (data.hasOwnProperty(review[i])){
                data[goodbad][review[i]][1]++;
            } else {
                data[goodbad][review[i]] = [review[i], 1];
            }
        }
    },
    starCount: function(rating){
        if (){
            return 'good';
        } else if (){
            return 'bad';
        }
    }
}