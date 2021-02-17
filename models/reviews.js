module.exports = function(sequelize, DataTypes) {
  const Reviews = sequelize.define("Reviews", {

    ratings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps : false,
  });

  Reviews.associate = function(models) {
    // We're saying that a review should belong to a user
    // A review can't be created without an user due to the foreign key constraint
    Reviews.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reviews;
};