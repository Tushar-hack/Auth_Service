const UserRepository = require('../repository/user_repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig'); 


class UserService {
    constructor () {
        this.UserRepository = new UserRepository();
    }

    async create (data) {
        try {
            const newUser = await this.UserRepository.create(data);
            return newUser;
        } catch (error) {
            console.log("Something went wrong at Service layer");
            throw error;
        }
    }

    createToken (user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {
                expiresIn: '1d'
            });
            return result;
        } catch (error) {
            console.log("Something Went wrong on repository Layer");
            throw error;
        }
    }

    verifyToken (token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something Went wrong on repository Layer");
            throw error;
        }   
    }
    
}

module.exports = UserService;