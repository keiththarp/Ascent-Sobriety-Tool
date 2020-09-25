module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    authorId: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 144]
    },

    feeling: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    hiccup: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Post;
};
