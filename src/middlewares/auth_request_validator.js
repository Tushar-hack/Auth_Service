const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: 'Email or Password is missing'
        });
    }
    next();
}

const validateIsAdminRequest = (req,res,next) =>{
    if(!req.body.id) {
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User Id is not given',
            message: 'Something went wrong'
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}