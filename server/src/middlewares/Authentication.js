import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
  * @class Authentication
  * @description Verifies json authentication
  */
class Authentication {
/**
  * @description -This method logins users into WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {object} next - The response payload sent back from the controller
  * @returns {object} - status Message and logins user into WEConnect
  * @memberOf Authentication
  * @static
  */
  static secureRoute(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.Authorization;
    if (token) {
      jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: 'You are not allowed to access this route, Failed to authenticate!'
          });
        }
        req.decoded = decoded;
        req.id = req.params.businessId;
        return next();
      });
    }
    if (!token) {
      return res.status(403).send({
        message: 'You are forbidden from accessing this route! No token! You need to sign up!'
      });
    }
  }
}

export default Authentication;
