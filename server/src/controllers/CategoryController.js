import models from '../../models/';

const { category } = models;

/**
  * @class BusinessController
  * @description CRUD operations on Category
  */
class CategoryController {
  /**
       * @static
       * @param {object} req - The request payload sent to the router
       * @param {object} res - The response payload sent back from the controller
       * @returns {object} - status Message and the particular businesses created.
       * @memberOf BusinessController
       */
  static createCategory(req, res) {
    return category.create({
      categoryContent: req.body.categoryContent
    }).then(categoryItem => res.status(201).send(categoryItem))
      .catch(error => res.status(500).send(error));
  }
}

export default CategoryController;
