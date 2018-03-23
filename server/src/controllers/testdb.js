const businesses = require('../../models/');

const { business } = businesses;
module.exports = {
  create(req, res) {
    return business.create({
      businessName: req.body.businessName,
      businessDescription: req.body.businessDescription,
      businessAddress: req.body.businessAddress,
      locationId: req.body.locationId,
      categoryId: req.body.categoryId
    });
  }
};
