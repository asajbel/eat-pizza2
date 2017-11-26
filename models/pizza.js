module.exports = function(sequelize, DataTypes) {
  var Pizza = sequelize.define("Pizza", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
        	args:	[1],
        	msg: "The name must have at least one character."
        }
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Pizza;
};
