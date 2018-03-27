import { businesses } from '../dummydatabase/dummydatabase';
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
  * @returns {object} - status Message and list of all businesses*
  * @memberOf BusinessController
  */
  static getAllBusinesses(req, res) {
    try {
      if (businesses.length === 0) {
        return res.status(404).json({ message: 'No business available at this time', businesses });
      }
      return res.json({ message: 'business list loaded successfully', businesses });
    } catch (err) {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
  /**
    * @static
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @returns {object} - status Message and the particular businesses by id.
    * @memberOf BusinessController
    */
  static getBusinessById(req, res) {
    // try {
    //   const id = req.params.businessId;
    //   // const business = businesses.find(businessItem => +businessItem.businessId === +id);
    //   if (!business) {
    //     return res.status(404).json({ message: `Business with businessId ${id} does not exist` });
    //   }
    //   return res.json({ message: 'business search was successful', business });
    // } catch (err) {
    //   res.status(500).json({ message: 'Internal server error' });
    // }
  }
  /**
   * @static
   * @param {object} req - The request payload sent to the router
   * @param {object} res - The response payload sent back from the controller
   * @returns {object} - status Message and the particular businesses created.
   * @memberOf BusinessController
   */
  static createBusiness(req, res) {
    console.log(req.body);
    return business.create({
      businessName: req.body.businessName,
      businessAddress: req.body.businessAddress,
      businessDescription: req.body.businessDescription,
      businessImage: req.body.businessImage || 'Not available yet',
      userId: req.body.userId,
    }).then(businessItem => res.status(201).send(businessItem))
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
    try {
      const id = req.params.businessId;
      const business = businesses.find(businessItem => +businessItem.businessId === +id);
      Object.assign(business, req.body);
      return res.json({ message: 'business updated successfully', business });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message showing that business has been deleted.
  * @memberOf BusinessController
  */
  static removeBusiness(req, res) {
    try {
      const id = req.params.businessId;
      const business = businesses.find(businessItem => +businessItem.businessId === +id);
      if (!business) {
        return res.status(404).json({ message: `business with businessId ${id} does not exist` });
      }
      businesses.splice(businesses.indexOf(business), 1);
      return res.status(204).json({ message: `business with businessId ${id} was deleted successfully` });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
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
    try {
      const { location } = req.query;
      if (!location) { return next(); }
      const searchBusinessResults = businesses.filter(businessItem =>
        businessItem.location === location);
      if (searchBusinessResults.length === 0) {
        return res.status(404).json({ message: `Business under location ${location} not found` });
      }
      return res.status(200).json({ message: 'Search was successful', searchBusinessResults });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
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
    try {
      const { category } = req.query;
      if (!category) { return next(); }
      const searchBusinessResults = businesses.filter(businessItem =>
        businessItem.category === category);
      if (searchBusinessResults.length === 0) {
        return res.status(404).json({ message: `Business under category ${category} not found!` });
      }
      return res.status(200).json({ message: 'Search was successful', searchBusinessResults });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default BusinessController;
