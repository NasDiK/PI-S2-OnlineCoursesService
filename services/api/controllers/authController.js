const bcrypt = require('bcrypt');
const conf = require('../knexfile');
const knex = require('knex')(conf.development);
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const secret = require('../config');
const cookie = require('cookie');

const generateTokens = (id, roleid) => {
  payload = {
    id,
    roleid
  };
  tokens = {
    accessToken: null,
    refreshToken: null
  };

  tokens.accessToken = jwt.sign(payload, secret.accessTokenKey, {expiresIn: '30d'});
  tokens.refreshToken = jwt.sign(payload, secret.refreshTokenKey, {expiresIn: '30d'});

  return tokens;
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
      res.status(400).json({message: 'Registration error'});
    }
  }

  async login(reg, res) {
    try {
      const {username, password} = reg.body;
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

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 30
        })
      );

      const {accessToken} = tokens;

      return res.json({accessToken, userRolesIds, userId: user.id});
    } catch(exception) {
      res.status(400).json({message: 'Login error'});

      return res;
    }
  }

  logout(reg, res) {
    try {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('refreshToken', '', {
          httpOnly: true,
          maxAge: 0
        })
      );
      res.status(200).json({message: 'Пользователь логаут'});
    } catch(exception) {
      res.status(400).json({message: 'logout error'});
    }
  }

  check(reg, res) {
    try {
      const {token} = reg.body;
      const userData = jwt.verify(token, secret.accessTokenKey);

      return res.status(200).json({userData});
    } catch(exception) {
      res.sendStatus(401);
    }
  }
}

module.exports = new authController();