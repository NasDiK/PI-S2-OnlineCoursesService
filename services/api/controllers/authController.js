const bcrypt = require('bcrypt');
const conf = require('../knexfile');
const knex = require('knex')(conf.development);
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (id, roleid) => {
  payload = {
    id,
    roleid
  };

  return jwt.sign(payload, secret);
};

class authController {
  async registration(reg, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации'});
      }
      const {username, password} = reg.body;
      const [candidate] = await knex('users').where('nickname', username);

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь существует'});
      }
      const hashPassword = bcrypt.hashSync(password, 7);

      await knex('users').insert(
        {nickname: username},
        {password: hashPassword},
        ['id']
      );

      const userId = await knex('users').where('nickname', username).id;

      await knex('users_roles').insert(
        // eslint-disable-next-line camelcase
        {user_id: userId},
        // eslint-disable-next-line camelcase
        {role_id: 3},
        ['id']
      );

      return res.json({message: 'Пользователь зарегестрирован'});
    } catch(exception) {
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(reg, res) {
    try {
      const {username, password} = reg.body;
      const [user] = await knex('users').where('nickname', username);

      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`});
      }
      const [userRole] = await knex('users_roles').where('user_id', user.id);
      const token = generateAccessToken(user.id, userRole.role_id);

      return res.json({token});
    } catch(exception) {
      res.status(400).json({message: 'Login error'});

      return res;
    }
  }

  async getUsers(reg, res) {
    try {
      const users = await knex('users').where('id');

      res.json(users);
    } catch(exception) {

      res.status(400).json({message: 'getUsers error'});
    }
  }
}

module.exports = new authController();