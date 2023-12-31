const UserRepository = require('../repository/user_repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
            if(error.name == 'SequelizeValidationError') {
                throw error;
            }
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
            console.log("Something Went wrong on Service Layer");
            throw error;
        }
    }

    verifyToken (token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something Went wrong on Service Layer");
            throw error;
        }   
    }
    
    checkPassword (userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something Went wrong on Service Layer");
            throw error;
        }
    }

    async signIn (email, plainPassword) {
        try {
            //step 1 - Fetch the user using the email
            const user = await this.UserRepository.getByEmail(email);
            //step 2 - compare incoming password with stored encrypted password
            const matchResult = this.checkPassword(plainPassword, user.password);
            if(!matchResult) {
                console.log("Password doesn't match.");
                throw {
                    error: 'Incorrect Password'
                }
            } 
            //step 3 - If password match then create a token and send it to user
            const newJWT = this.createToken({
                email: user.email,
                id: user.id
            });
            return newJWT;
        } catch (error) {
            if(error.name == 'AttributeNotFound') {
                throw error;
            }
            console.log("Something Went wrong on Service Layer");
            throw error;
        }
    }

    async isAuthenticated (token) {
        try {
            const isTokenVerified = this.verifyToken(token); // {email: '', id: 3, iat: ;}
            if(!isTokenVerified) {
                throw {error: 'Invalid Token'};
            }
            const user = await this.UserRepository.getById(isTokenVerified.id);
            if(!user) {
                throw {
                    error: 'No user exist with corresponding Token'
                }
            }
            return user.id;
        } catch (error) {
            console.log("Something Went wrong on Service Layer");
            throw error;
        }
    }

    isAdmin (userId) {
        try {
            return this.UserRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something Went wrong on Service Layer");
            throw error;
        }
    }
}

module.exports = UserService;