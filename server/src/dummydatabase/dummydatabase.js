const users = [{
  userId: 1,
  firstName: 'augustine',
  lastName: 'ezinwa',
  email: 'augustineezinwa@gmail.com',
  password: '34343434',
  address: 'no 5 babaewe off agopalace way okota',
  phoneNumber: '07034629228'
}];
const reviews = [{
  reviewId: 1,
  reviewContent: 'I love this place, its awesome',
  userId: 1,
  businessId: 3,
}];
const businesses = [{
  businessId: 3,
  businessName: 'Shoprite',
  businessAddress: 'no 5 washington road',
  businessDescription: 'this business is amazing',
  location: 'USA',
  category: 'supermarket',
  userId: 1,
  reviews: []
}];

export { businesses, reviews, users };

