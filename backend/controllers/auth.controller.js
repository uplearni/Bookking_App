const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8)
    });
    await user.setRoles([1]); // Assign user role
    res.status(200).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password' });
    }
    const roles = await user.getRoles();
    const token = jwt.sign({ id: user.id, role: roles[0].name }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      role: roles[0].name,
      accessToken: token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};