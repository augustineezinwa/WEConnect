import models from '../../models/';

const { business } = models;
/**
  * @class BusinessController
  * @description CRUD operations on Business
  */
class BusinessController {
/**
  * @static
  * @param {object} req - The request payload recieved from the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and list of all businesses
  * @description This method gets all business in WEConnect
  * @memberOf BusinessController
  */
  static getAllBusinesses(req, res) {
    business.findAll().then((businessList) => {
      if (businessList.length < 1) {
        return res.status(404).json({
          message: 'No business available at this time', businessList
        });
      }
      return res.status(200).json({
        message: 'business list loaded successfully', businessList
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
    * @description This method gets a business by id in WEConnect
    * @memberOf BusinessController
    */
  static getBusinessById(req, res) {
    business.find({
      where: {
        id: req.params.businessId
      }
    }).then((businessObject) => {
      if (!businessObject) {
        return res.status(404).json({ message: `Business with businessId ${req.params.businessId} does not exist` });
      }
      const businessList = {
        businessName: businessObject.businessName,
        businessAddress: businessObject.businessAddress,
        businessDescription: businessObject.businessDescription,
        businessImage: businessObject.businessImage,
        location: businessObject.location,
        category: businessObject.category,
        userId: businessObject.userId
      };
      return res.status(200).json({
        message: 'business search was successful', businessList
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
    }).then((businessObject) => {
      const createdBusinessObject = {
        businessName: businessObject.businessName,
        businessAddress: businessObject.businessAddress,
        businessDescription: businessObject.businessDescription,
        businessImage: businessObject.businessImage,
        location: businessObject.location,
        category: businessObject.category,
        userId: req.body.userId
      };
      res.status(201).json({ message: 'business registration was successful', createdBusinessObject });
    }).catch(error => res.status(500).send(error));
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and the particular updated businesses created.
  * @description This method updates a particular business in WEConnect.
  * @memberOf BusinessController
  */
  static updateBusiness(req, res) {
    business.find({
      where: {
        id: req.params.businessId
      }
    }).then((businessObject) => {
      if (!businessObject) {
        return res.status(404).json({
          message: `business with businessId ${req.params.businessId} does not exist`
        });
      }
      return businessObject.update({
        businessName: req.body.businessName || businessObject.businessName,
        businessAddress: req.body.businessAddress || businessObject.businessAddress,
        businessDescription: req.body.businessDescription || businessObject.businessDescription,
        location: req.body.location || businessObject.location,
        category: req.body.category || businessObject.category,
        userId: businessObject.userId
      }).then(updatedBusinessObject => res.status(200).json({
        message: 'business updated successfully', updatedBusinessObject
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
  * @description This method deletes a business from WEConnect
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
        .then(() => res.status(200).json({
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
