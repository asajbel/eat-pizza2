module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
        	args:	[1],
        	msg: "The name must have at least one character."
        }
      }
    }
  });

  Customer.associate = function(models) {
    Customer.hasMany(models.Pizza, {
      onDelete: "CASCADE",
      as: "Pizza"
    });
  };

  return Customer;
};
