const createError = require('http-errors');
const encrypt = require('../lib/encrypt');
const Users = require('../models/users.model');

async function create(userData) {
    const emailFound = await Users.findOne({ email: userData.email });
    if (emailFound){
        throw createError(409, "Email already in use");    
    }
    userData.password = await encrypt.encrypt(userData.password);

    const newUser = await Users.create(userData);
    return newUser;
};

async function getById(id) {
    const user = await Users.findById(id);
    return user;
}

async function getAll() {
    const allUsers = await Users.find()
    return allUsers
}

module.exports = {
    create,
    getById,
    getAll,
}
