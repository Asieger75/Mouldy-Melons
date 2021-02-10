module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with Reviews
    // When an User is deleted, also delete any associated reviews
    User.hasMany(models.Review, {
      onDelete: "cascade"
    });
  };

  return User;
};
