module.exports = {
    'https://www.amazon.com': {
        name: 'amazon',
        reviewlink: {identifier: 'id', id: 'dp-summary-see-all-reviews'},
        next: 'a-last',
        reviewsection: 'review',
        stars: 'review-rating',
        reviewtext: 'review-text'
    },
    'https://www.yelp.com': {
        name: 'yelp',
        reviewlink: null,
        next: 'next',
        reviewsection: 'review-content',
        stars: 'i-stars',
        reviewtext: {identifier: 'element', element: 'p'}
    }
}