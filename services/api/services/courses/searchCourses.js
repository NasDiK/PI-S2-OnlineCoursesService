const {groupBy} = require('../../utils');

/**
 * @param {import('knex').Knex} knex
 * @param {import('express').Request} req
 * @returns
 */
const searchCourses = async(knex, req) => {
  try {
    const {
      filter: {
        orders = [],
        ids
      } = {},
      fields = ['id'],
      appends = [],
      groupBy: groupByKey //string
    } = req.body;

    const model = knex('courses').select(fields);

    appends.forEach((append) => {
      const {tableName, parentField, joinField} = append;

      model.leftJoin(tableName, `${tableName}.${joinField}`, `${parentField}`);
    });

    ids && model.whereIn('id', ids);

    orders.forEach((order) => {
      model.orderBy(order.field, order.predicate);
    });

    let result = await model;

    if (groupByKey) {
      result = groupBy(result, groupByKey);
    }

    return result;

  } catch(exception) {
    return exception;
  }
};

module.exports = {
  searchCourses
};