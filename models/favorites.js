module.exports = function(sequelize, DataTypes) {
  const Fave = sequelize.define("Fave", {
    brewer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    brewery_type: {
      type: DataTypes.TEXT
    },
    street: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.TEXT
    },
    postal_code: {
      type: DataTypes.TEXT
    },
    country: {
      type: DataTypes.TEXT
    },
    phone: {
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
