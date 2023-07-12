const UserService  = require ('../services/user_service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created a new user",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something went wrong",
            success: false,
            err: error
        });    
    }
} 

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully Logged In.",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something went wrong",
            success: false,
            err: error
        });   
    }
} 

const isAuthenticated = async (req , res) => {
    try {
        const token = req.headers['x-access-token'];
        const isVerified = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: isVerified,
            success: true,
            message: 'Successfully Authenticated the User',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something went wrong",
            success: false,
            err: error
        });   
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated
}