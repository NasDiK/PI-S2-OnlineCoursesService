const AuthUser = (body, ext) => {
  body; //использовать при разработке, чтобы линт прошел
  ext;

  return Promise.resolve(true);
};

module.exports = {AuthUser};