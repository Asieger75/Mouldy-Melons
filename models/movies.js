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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  Movies.associate = function(models) {
    // We're saying that a movies entry belongs to a user
    // A moviese entry can't be created without a review due to the foreign key constraint
    Movies.belongsTo(models.Reviews, {
      foreignKey: {
        allowNull: false
      }
    });
  };



  return Movies;
};