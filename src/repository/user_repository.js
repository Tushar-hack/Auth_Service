const { User } = require('../models/index');
const { response } = require('express');

class UserRepository {

    async create (data) {
        try {
            const newUser = await User.create(data);
            return newUser;
        } catch (error) {
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
}

module.exports = UserRepository;