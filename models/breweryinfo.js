
module.exports = function(sequelize, DataTypes) {
  const Breweryinfo = sequelize.define("Breweryinfo", {
    breweryname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    dogs: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Breweryinfo.associate = function(models) {
    Breweryinfo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Breweryinfo;
};
