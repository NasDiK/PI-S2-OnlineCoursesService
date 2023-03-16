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
      const errors = validationResult(reg);

      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации'});
      }
      const {username, password} = reg.body;

      const [candidate] = await knex('users').where('nickname', username)
        .select('id', 'password');

      if (candidate) {
        return res.status(400).json({message: 'Такой пользователь существует'});
      }
      const hashPassword = bcrypt.hashSync(password, 7);

      await knex('users').insert({
        nickname: username,
        password: hashPassword
      });

      const userId = await knex('users').where('nickname', username)
        .pluck('id');

      await knex('users_roles').insert({
        // eslint-disable-next-line camelcase
        user_id: Number(userId),
        // eslint-disable-next-line camelcase
        role_id: 3 //enum
      });

      return res.json({message: 'Пользователь зарегестрирован'});
    } catch(exception) {
      // eslint-disable-next-line no-console
      console.log(exception);
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(reg, res) {
    try {
      const {username, password} = reg.body;
      const [user] = await knex('users').where('nickname', username)
        .select('id', 'password');

      if (!user) {
        return res.status(400).json({message: `Пользователь ${username} не найден`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`});
      }
      const userRolesIds = await knex('users_roles').where('user_id', user.id)
        .pluck('id');
      const token = generateAccessToken(user, [userRolesIds]);

      return res.json({token, userRolesIds, userId: user.id});
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