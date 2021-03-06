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
    if (name === undefined) {
      return { message: 'Name field is missing!' };
    }
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
    * @memberOf InputFieldsValidation
    * @static
    */
  static validatePassword(password) {
    if (password === undefined) {
      return { message: 'password is needed!' };
    }
    if (Array.isArray(password)) {
      return { message: 'password cant be an array!' };
    }
    password = password.trim();
    if (password.length === 0) {
      return { message: 'password is empty!' };
    }
    if (password.length < 6) {
      return { message: 'password length must be at least 6 characters' };
    }
    if (password.includes(' ')) {
      return { message: 'invalid password, it contains space' };
    }
    if (!/^(?=.*[0-9-\W]).+$/.test(password)) {
      return { message: 'password must contain at least a number, and any other special character' };
    }
    return `${password}`;
  }
  /**
  * @description -This method validates users email awaiting signup in WEConnect
  * @param {string} email - The data sent from the middleware.
  * @returns {object} - The validated data sent back to the router.
  * @memberOf InputFieldsValidation
  * @static
  */
  static validateEmail(email) {
    if (email === undefined) {
      return { message: 'email field is missing!' };
    }
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
  * @memberOf InputFieldsValidation
  * @static
  */
  static validatePhoneNumber(phone) {
    if (phone === undefined) {
      return { message: 'phoneNumber field cant be empty!' };
    }
    phone = phone.trim();
    if (!Number(phone)) {
      return { message: 'Phone number is not valid, must not contain - or _ or space' };
    }
    if (phone.length > 15) {
      return { message: 'Phone Number is too long.' };
    }
    return phone;
  }
  /**
  * @description -This method validates categories of business in WEConnect
  * @param {string} category - The request payload sent from the middleware
  * @returns {object} - returns valid category to the middleware
  * @memberOf InputFieldsValidation
  * @static
  */
  static validateCategory(category) {
    if (category === undefined) {
      return undefined;
    }
    const categories = ['flight', 'supermarket', 'restaurant', 'recreation', 'hotel', 'technology', 'education'];
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
  * @memberOf InputFieldsValidation class
  * @static
  */
  static validateLocation(location) {
    if (location === undefined) {
      return undefined;
    }
    const locationList = ['nigeria', 'usa', 'netherland', 'paris', 'southafrica', 'austrailia', 'hiroshima', 'united kingdom'];
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
  * @memberOf InputFieldsValidation
  * @static
  */
  static validateBusinessTextFields(businessTextField) {
    if (businessTextField === undefined) {
      return undefined;
    }
    businessTextField = businessTextField.trim();
    if (businessTextField.length === 0) {
      return { message: 'Field cant be empty' };
    }
    if (!(businessTextField.length > 2)) {
      return { message: 'Field cant be too short!' };
    }
    if (businessTextField.length > 150) {
      return { message: 'Field is too long' };
    }
    if (/^[0-9]+$/.test(businessTextField)) {
      return { message: 'Field cant contain just numbers' };
    }
    return businessTextField;
  }
}

export default InputFieldsValidation;
