// Import & Init
const { UniqueConstraintError, ValidationError } = require("sequelize");

// Check validError
exports.checkIsDefaultValidatorErrorMessage = (error) => {
    // If Unique Error OR default error message is Validator Error
    if (error instanceof UniqueConstraintError || error.message === "Validation error"){
        error.message = `${error.message}: ${error.original.sqlMessage}`;
    }
        // Return Error 404
    return error.message;
};