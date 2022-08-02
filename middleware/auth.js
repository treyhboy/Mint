// Simple authorization middleware

const jwt = require("jsonwebtoken");
const response = require("../utils-module/response");
const { PRIVATE_KEY } = require("../config/config.js");

module.exports = (req, res, next) => {
    // Obtaining the token from the header

    const token = req.header("Authorization");

    // If token value isn't set then we have to return Unauthorized
    if (!token) {
        return response.responseWriter(res, 400, {
            message: "Invalid value passed for Authorization token"
        });
    }

    try {
        // TODO Setting the request.user value for now additional validation can be performed in the decoded object in future
        req.user = jwt.verify(token, PRIVATE_KEY);
        next();
    } catch (err) {
        // Exception is thrown when verify fails here token is provided but it is seems to be a spoof as verify fails
        return response.responseWriter(res, 401, {
            message: "You are not authorized to perform this operation"
        });
    }
};
