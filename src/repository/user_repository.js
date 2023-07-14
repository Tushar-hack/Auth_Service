const  ValidationError  = require('../utils/validation-error');
const { User, Role } = require('../models/index');

class UserRepository {

    async create (data) {
        try {
            const newUser = await User.create(data);
            return newUser;
        } catch (error) {
            if(error.name  = 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log("Something Went wrong on repository Layer");
            throw error;
        }
    }

    async destroy (userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something Went wrong on repository Layer");
            throw error;
        }
    }

    async getByEmail (userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something Went wrong on repository Layer");
            throw error;
        }
    }
    async getById (userId) {
        try {
            const user = await User.findOne({
                where: {
                    id: userId
                }
            });
            return user;
        } catch (error) {
            console.log("Something Went wrong on repository Layer");
            throw error;
        }
    }

    async isAdmin (userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something Went wrong on repository Layer");
            throw error;
        }
    }
}

module.exports = UserRepository;