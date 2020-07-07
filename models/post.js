module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  return Post;
};
