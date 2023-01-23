var DataTypes = require("sequelize").DataTypes;
var _migrations = require("./migrations");
var _order_products = require("./order_products");
var _orders = require("./orders");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var migrations = _migrations(sequelize, DataTypes);
  var order_products = _order_products(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  order_products.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_products, { as: "order_products", foreignKey: "order_id"});
  order_products.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_products, { as: "order_products", foreignKey: "product_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    migrations,
    order_products,
    orders,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
