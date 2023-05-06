const bcrypt = require('bcrypt');
const conf = require('../knexfile');
const {roles: {roles: systemRolesEnum}} = require('@local/enums');
const knex = require('knex')(conf.development);
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {getRoleEnumsMap} = require('../core');
const generateTokens = (id, roleid) => {
  payload = {
    id,
    roleid
  };
  tokens = {
    accessToken: null,
    refreshToken: null
  };

  tokens.accessToken = jwt.sign(
    payload, config.accessTokenKey, {expiresIn: config.tokensExpiresTime.access}
  );
  tokens.refreshToken = jwt.sign(
    payload, config.refreshTokenKey, {expiresIn: config.tokensExpiresTime.refresh}
  );

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

      const [{id: userId}] = await knex('users').insert({
        nickname: username,
        password: hashPassword
      })
        .returning('id');

      await knex('users_roles').insert({
        'user_id': Number(userId),
        'role_id': systemRolesEnum.STUDENT
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
      const [roleIdEnumMap, userRolesIds] = await Promise.all([
        getRoleEnumsMap(),
        knex('users_roles').where('user_id', user.id)
          .pluck('role_id')
      ]);

      const mappedRoles = userRolesIds.map((__id) => roleIdEnumMap[__id]);

      const tokens = generateTokens(user, mappedRoles);

      return res.json({tokens, userRolesIds, userId: user.id});
    } catch(exception) {
      res.status(400).json({message: 'Login error'});

      return res;
    }
  }

  async check(req, res) {
    try {
      const {refreshtoken} = req.headers;

      const {id: {id}} = jwt.verify(refreshtoken, config.refreshTokenKey);

      const [roleIdEnumMap, userRolesIds] = await Promise.all([
        getRoleEnumsMap(),
        knex('users_roles').where('user_id', id)
          .pluck('role_id')
      ]);

      const mappedRoles = userRolesIds.map((__id) => roleIdEnumMap[__id]);

      const payload = {
        id,
        userRolesIds: mappedRoles
      };

      payload.token = jwt.sign(
        payload, config.accessTokenKey, {expiresIn: config.tokensExpiresTime.access}
      );

      return res.status(200).json(payload);
    } catch(exception) {
      res.sendStatus(401);
    }
  }
}

module.exports = new AuthController();