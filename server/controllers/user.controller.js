const user = require('../models/user.model');
const jwt = require ('jsonwebtoken');
const bcrypt = require("bcrypt");
const createUser = async (req, res) => { 
    const {username, password} = req.body;

    const newUser = new user({
        username,
        password: bcrypt.hashSync(password, 8)
    });
    await newUser.save();
    res.status(201).json({message: 'User created successfully', token});
}

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    const privateKey = process.env.PRIVATEKEY;
    const existingUser = await user.find({username});
    if(existingUser.length === 0){
        return res.status(404).json({message: 'User not found'});
    }
    const passwordIsValid = bcrypt.compareSync(
                password,
                existingUser[0].password
            );
    if (!passwordIsValid) {
                return res.status(401)
                    .send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
            }
       const token = jwt.sign({
                id: user.id
            }, process.env.PRIVATEKEY, {
                expiresIn: 60*60*24
            });
   
    res.status(200).json({message: 'Login successful', token});
}

exports = { createUser, loginUser };

