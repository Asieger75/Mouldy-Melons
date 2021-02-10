module.exports = function(sequelize, DataTypes) {
  const Reviews = sequelize.define("Reviews", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
      len: [1]
      }
    }
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
//add for movies

Reviews.associate = function(models) {
  // We're saying that a review should belong to a movie
  // A review can't be created without a movie due to the foreign key constraint

  Reviews.belongsTo(models.Movies, {
    foreignKey: {
      allowNull: false
    }
  });
};

  return Reviews;
};