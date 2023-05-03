const usersRouter = require('./users');
const tasksRouter = require('./tasks');
const authRouter = require('./authRouter');
const coursesRouter = require('./courses');
const reviewsRoutes = require('./reviews');
const groupsRouter = require('./groups');
const rolesRouter = require('./rolesRouter');

module.exports = {
  usersRouter,
  tasksRouter,
  authRouter,
  reviewsRoutes,
  coursesRouter,
  groupsRouter,
  rolesRouter
};