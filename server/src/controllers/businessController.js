

import { businesses } from '../dummydb/db';

/**
 * @class BusinessController
 *
 * @description CRUD operations on Business
 *
 */
class BusinessController {

  /**
     * @static
     *
     *
     * @param {object} req - The request payload sent to the router
     * @param {object} res - The response payload sent back from the controller
     *
     * @returns {object} - status Message and list of all businesses
     *
     * @memberOf BusinessController
     */
  static getAllBusinesses(req, res) {

    if (businesses.length === 0) {

      return res.status(404).json({ message: 'No business available at this time', businesses });

    }

    return res.json({ message: 'business list loaded successfully', businesses });

  }

  /**
     * @static
     *
     *
     * @param {object} req - The request payload sent to the router
     * @param {object} res - The response payload sent back from the controller
     *
     * @returns {object} - status Message and the particul businesses by id.
     *
     * @memberOf BusinessController
     */
  static getBusinessById(req, res) {

    const id = req.params.businessId;

    const business = businesses.find(businessItem => +businessItem.businessId === +id);

    if (!business) {

      res.status(404).json({ message: `Business with businessId ${id} does not exist` });

    } else {

      res.json({ message: 'business search was successful', businesses });

    }

  }


  /**
     * @static
     *
     *
     * @param {object} req - The request payload sent to the router
     * @param {object} res - The response payload sent back from the controller
     *
     * @returns {object} - status Message and the particul businesses by id.
     *
     * @memberOf BusinessController
     */
  static createBusiness(req, res) {

    const businessId = businesses.length === 0 ? 1 :

      businesses[businesses.length - 1].businessId + 1;

    const {

      businessName,

      businessAddress,

      location,

      category,

      userId

    } = req.body;

    const newBusiness = {

      businessId,

      businessName,

      businessAddress,

      location,

      category,

      userId,

      reviews: []

    };
  }
}


export default BusinessController;
