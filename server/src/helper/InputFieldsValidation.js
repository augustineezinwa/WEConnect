/**
 * @class InputFieldsValidaton
 *
 * @description Validation operations on Input fields
 *
 */
class InputFieldsValidation {

  /**
 * @static
   *
   *@description -This method validates input fields in WEConnect forms.
    *
    * @param {object} name - The request payload sent to the router
    *
    *
    * @returns {object} - status Message and logins user into WEConnect
    *
    * @memberOf UserController
    *
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
         * @static
         *
         *@description -This method logins users into WEConnect
         *
         * @param {object} password - The request payload sent to the router
         * @param {object}  - The response payload sent back from the controller
         *
         * @returns {object} - status Message and logins user into WEConnect
         *
         * @memberOf UserController
         *
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
         * @static
         *
         *@description -This method logins users into WEConnect
         *
         * @param {object} email - The request payload sent to the router
         * @param {object} - The response payload sent back from the controller
         *
         * @returns {object} - status Message and logins user into WEConnect
         *
         * @memberOf UserController
         *
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
         * @static
         *
         *@description -This method logins users into WEConnect
         *
         * @param {object} phone - The request payload sent to the router
         * @param {object} - The response payload sent back from the controller
         *
         * @returns {object} - status Message and logins user into WEConnect
         *
         * @memberOf UserController
         *
         */
  static validatePhoneNumber(phone) {

    phone = phone.trim();

    if (!Number(phone)) {

      return { message: 'Phone number is not valid, must not contain - or _ or space' };

    }

    return phone;


  }

  /**
         * @static
         *
         *@description -This method validates categories of business in WEConnect
         *
         * @param {object} category - The request payload sent to the router
         * @param {object} - The response payload sent back from the controller
         *
         * @returns {object} - status Message and logins user into WEConnect
         *
         * @memberOf UserController
         *
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


}


export default InputFieldsValidation;
