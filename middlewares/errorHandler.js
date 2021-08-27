function errorHandler(err, req, res, next) {
    if(err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError" ) {
        const errors = err.errors.map(el => ({
            message: el.message
        }))
        return res.status(400).json({
            type: "Bad Request",
            errors
        })
    }
    else if(err.name == "Bad Request"){
        return res.status(400).json({
            type: "Bad Request",
            errors: err.errors
        })
    }
    else {
        return res.status(500).json({
            errors: [{message: err}]
        })
    }
}

module.exports = errorHandler