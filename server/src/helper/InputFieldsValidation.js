/**
 * @class InputFieldsValidaton
 * @description Validates Input fields
 */
class InputFieldsValidation {
/**
  * @description -This method validates input fields in WEConnect forms.
  * @param {string} name - The data sent from the middleware.
  * @returns {object} - returns the validated data to the middleware.
  * @memberOf UserController
  * @static
  */
  static validateName(name) {
    name = name.trim();
    if (name.length === 0) {
      return { message: ' field is Empty' };
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      return { message: 'this field contains Strange Characters!' };
    }
    return name[0].toUpperCase() + name.substr(1);
  }
  /**
    * @description -This method validates user passwords awaiting signUp in WEConnect
    * @param {string} password - The string data sent from the middleware
    * @returns {object} - The validated data sent back to the middleware
    * @memberOf UserController
    * @static
    */
  static validatePassword(password) {
    password = password.trim();
    if (password.length === 0) {
      return { message: 'password fields is empty!' };
    } else if (password.length < 6) {
      return { message: 'password length must be at least 6 characters' };
    } else if (password.includes(' ')) {
      return { message: 'invalid password, it contains space' };
    } else if (!/^(?=.*[0-9-\W]).+$/.test(password)) {
      return { message: 'password must contain at least a number, and any other special character' };
    }
    return password;
  }
  /**
  * @description -This method validates users email awaiting signup in WEConnect
  * @param {string} email - The data sent from the middleware.
  * @returns {object} - The validated data sent back to the router.
  * @memberOf UserController
  * @static
  */
  static validateEmail(email) {
    email = email.trim();
    if (email.length === 0) {
      return { message: 'email field cannot be empty' };
    } else if (email.includes(' ')) {
      return { message: 'invalid email ,contains space ' };
    } else if (!/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(email)) {
      return { message: 'Invalid email, recheck your email' };
    }
    return email;
  }
  /**
  * @description -This method validates phone numbers of users placed into WEConnect
  * @param {string} phone - The request payload sent to the router
  * @returns {object} - status Message and logins user into WEConnect
  * @memberOf UserController
  * @static
  */
  static validatePhoneNumber(phone) {
    phone = phone.trim();
    if (!Number(phone)) {
      return { message: 'Phone number is not valid, must not contain - or _ or space' };
    }
    return phone;
  }
  /**
  * @description -This method validates categories of business in WEConnect
  * @param {string} category - The request payload sent from the middleware
  * @returns {object} - returns valid category to the middleware
  * @memberOf UserController
  * @static
  */
  static validateCategory(category) {
    const categories = ['flight', 'supermarket', 'restaurant', 'recreation', 'hotel'];
    category = category.trim();
    const isValidcategory = categories.find(categoryItem => categoryItem ===
      category.toLowerCase());
    if (!isValidcategory) {
      return { message: 'Invalid category' };
    }
    return category;
  }
  /**
  * @description -This method validates locations of business in WEConnect
  * @param {string} location - The request payload sent from the router
  * @returns {object}  - returns valid location to middleware
  * @memberOf UserController
  * @static
  */
  static validateLocation(location) {
    const locationList = ['nigeria', 'usa', 'netherland', 'paris', 'southafrica', 'austrailia', 'hiroshima'];
    location = location.trim();
    const isValidLocation = locationList.find(locationSite =>
      locationSite === location.toLowerCase());
    if (!isValidLocation) {
      return { message: 'Location is not a valid! or supported' };
    }
    return location;
  }
  /**
  * @description -This method validates businesstextfields of business in WEConnect
  * @param {string} businessTextField - The request payload sent to the router
  * @returns {object} - returns validated business text fields to middleware.
  * @memberOf UserController
  * @static
  */
  static validateBusinessTextFields(businessTextField) {
    businessTextField = businessTextField.trim();
    if (businessTextField.length === 0) {
      return { message: 'Field cant be empty' };
    }
    if (!(businessTextField.length > 3)) {
      return { message: 'Field cant be too short!' };
    }
    return businessTextField;
  }
}

export default InputFieldsValidation;
