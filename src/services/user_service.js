const UserRepository = require('../repository/user_repository');


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
    
}

module.exports = UserService;