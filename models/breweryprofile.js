module.exports = function(sequelize, DataTypes) {
  const Brewerybeer = sequelize.define("Brewerybeer", {
    beername: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    beerstyle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    beerabv: {
      type: DataTypes.DECIMAL(10, 1),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    beerhops: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Brewerybeer.associate = function(models) {
    Brewerybeer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Brewerybeer;
};