

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

      return res.status(404).json(businesses);

    }

    return res.json(businesses);

  }

}


export default BusinessController;
