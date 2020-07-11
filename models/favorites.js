module.exports = function(sequelize, DataTypes) {
  const Fave = sequelize.define("favorite_breweries", {
    name: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.TEXT
    },
    website: {
      type: DataTypes.TEXT
    }
  });

  Fave.associate = function(models) {
    Fave.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Fave;
};
