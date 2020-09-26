module.exports = function(sequelize, DataTypes) {
  const checkIn = sequelize.define("checkIn", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    authorId: {
      type: DataTypes.INTEGER,
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

  return checkIn;
};
