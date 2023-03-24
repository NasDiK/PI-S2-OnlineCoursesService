const bcrypt = require('bcrypt');
const conf = require('../knexfile');
const knex = require('knex')(conf.development);
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../config');
const generateTokens = (id, roleid) => {
  payload = {
    id,
    roleid
  };
  tokens = {
    accessToken: null,
    refreshToken: null
  };

  tokens.accessToken = jwt.sign(payload, secret.accessTokenKey, {expiresIn: 10 * 60});
  tokens.refreshToken = jwt.sign(payload, secret.refreshTokenKey, {expiresIn: '30d'});

  return tokens;
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Ошибка при регистрации'});
      }
      const {username, password} = req.body;

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
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const [user] = await knex('users').where('nickname', username)
        .select('id', 'password');

      if (!user) {
        return res.status(404).json({message: `Пользователь ${username} не найден`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({message: `Введен неверный пароль`});
      }
      const userRolesIds = await knex('users_roles').where('user_id', user.id)
        .pluck('role_id');
      const tokens = generateTokens(user, [userRolesIds]);

      const {accessToken} = tokens;

      return res.json({accessToken, userRolesIds, userId: user.id});
    } catch(exception) {
      res.status(400).json({message: 'Login error'});

      return res;
    }
  }

  logout(req, res) {
    try {
      res.status(200).json({message: 'Пользователь логаут'});
    } catch(exception) {
      res.status(400).json({message: 'logout error'});
    }
  }

  check(req, res) {
    try {
      const {token} = req.body;
      const userData = jwt.verify(token, secret.accessTokenKey);

      return res.status(200).json({userData});
    } catch(exception) {
      res.sendStatus(401);
    }
  }
}

module.exports = new AuthController();