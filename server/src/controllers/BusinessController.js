import models from '../../models/';

const { business, review } = models;
/**
  * @class BusinessController
  * @description CRUD operations on Business
  */
class BusinessController {
/**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and list of all businesses*
  * @memberOf BusinessController
  */
  static getAllBusinesses(req, res) {
    business.findAll({
      include: [{
        model: review,
        as: 'reviews'
      }]
    }).then((businessItems) => {
      if (businessItems.length < 1) {
        return res.status(404).json({
          message: 'No business available at this time', businessItems
        });
      }
      return res.status(200).json({
        message: 'business list loaded successfully', businessItems
      });
    }).catch(err => res.status(500).json({
      message: 'Internal server error', err
    }));
  }
  /**
    * @static
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status Message and the particular businesses by id.
    * @memberOf BusinessController
    */
  static getBusinessById(req, res) {
    business.find({
      where: {
        id: req.params.businessId
      },
      include: [{
        model: review,
        as: 'reviews'
      }]
    }).then((businessItem) => {
      if (!businessItem) {
        return res.status(404).json({ message: `Business with businessId ${req.params.businessId} does not exist` });
      }
      return res.status(200).json({
        message: 'business search was successful', businessItem
      });
    }).catch(err => res.status(500).json({
      message: 'A severe error just occured -Internal server error', err
    }));
  }
  /**
   * @static
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status Message and the particular businesses created.
   * @memberOf BusinessController
   */
  static createBusiness(req, res) {
    return business.create({
      businessName: req.body.businessName,
      businessAddress: req.body.businessAddress,
      businessDescription: req.body.businessDescription,
      businessImage: req.body.businessImage || 'Not available yet',
      userId: req.body.userId,
      location: req.body.location,
      category: req.body.category
    }).then(businessItem => res.status(201).json({ message: 'business registration was successful', businessItem }))
      .catch(error => res.status(500).send(error));
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and the particular updated businesses created.
  * @memberOf BusinessController
  */
  static updateBusiness(req, res) {
    business.find({
      where: {
        id: req.params.businessId
      }
    }).then((businessItem) => {
      if (!businessItem) {
        return res.status(404).json({
          message: `business with businessId ${req.params.businessId} does not exist`
        });
      }
      return businessItem.update({
        businessName: req.body.businessName || businessItem.businessName,
        businessAddress: req.body.businessAddress || businessItem.businessAddress,
        businessDescription: req.body.businessDescription || businessItem.businessDescription,
        location: req.body.location || businessItem.location,
        category: req.body.category || businessItem.category,
        userId: req.body.userId || businessItem.userId
      }).then(updatedBusinessItem => res.status(200).json({
        message: 'business update successfully', updatedBusinessItem
      })).catch(err => res.status(500).json({
        message: 'Internal server error!', err
      }));
    }).catch(err => res.status(500).json({ message: 'Internal server error!', err }));
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message showing that business has been deleted.
  * @memberOf BusinessController
  */
  static removeBusiness(req, res) {
    business.find({
      where: {
        id: req.params.businessId
      }
    }).then((businessItem) => {
      if (!businessItem) {
        return res.status(404).json({
          message: `business with business ${req.params.businessId} does not exist`
        });
      }
      return businessItem.destroy()
        .then(() => res.status(206).json({
          message: `business with businessId ${req.params.businessId} was deleted successfully`
        })).catch(err => res.status(500).json({
          message: 'Internal server error!', err
        }));
    }).catch(err => res.status(500).json({
      message: 'Internal server error!', err
    }));
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {fucntion} next - This forwards request to the next controller in the stack
  * @returns {object} - status Message showing that business has been deleted.
  * @memberOf BusinessController
  */
  static filterSearchByLocation(req, res, next) {
    const { location } = req.query;
    if (!location) { return next(); }
    business.findAll({
      where: {
        location
      },
      include: [{
        model: review,
        as: 'reviews'
      }]
    }).then((businessItems) => {
      if (businessItems.length < 1) {
        return res.status(404).json({
          message: `No business was found in this location -${location}`
        });
      }
      return res.status(200).json({
        message: 'Search was successful', businessItems
      });
    }).catch(err => res.status(500).json({
      message: 'Internal server error', err
    }));
  }
  /**
  * @static
  * @description - This method filters search results by category.
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {function} next - This function forwards request to the next controller in the stack
  * @returns {object} - status Message showing that business has been deleted.
  * @memberOf BusinessController
  */
  static filterSearchByCategory(req, res, next) {
    const { category } = req.query;
    if (!category) { return next(); }
    business.findAll({
      where: {
        category
      },
      include: [{
        model: review,
        as: 'reviews'
      }]
    }).then((businessItems) => {
      if (businessItems.length < 1) {
        return res.status(404).json({
          message: `Business under category ${category} not found!`
        });
      }
      return res.status(200).json({
        message: 'Search was successful', businessItems
      });
    }).catch(err => res.status(500).json({ message: 'Internal server error', err }));
  }
}

export default BusinessController;
