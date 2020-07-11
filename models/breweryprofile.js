module.exports = function (sequelize, DataTypes) {
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
      type: DataTypes.INTEGER,
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
  return Brewerybeer;
};

// module.exports = function(sequelize, DataTypes) {
//   const Breweryinfo = sequelize.define("Breweryinfo", {
//     breweryname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     },
//     phonenumber: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     },
//     dogs: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     }
//   });
//   return Brewerybeer;
// };
