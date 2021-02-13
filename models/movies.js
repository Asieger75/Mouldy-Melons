module.exports = function(sequelize, DataTypes) {
  const Movies = sequelize.define("Movies", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ratings:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  Movies.associate = function(models) {
    // We're saying that a review should belong to a movie
    // A review can't be created without a movie due to the foreign key constraint
    Movies.hasMany(models.Reviews, {
      // foreignKey: {
      //   allowNull: false
      // }
    });
  };
  return Movies;
};