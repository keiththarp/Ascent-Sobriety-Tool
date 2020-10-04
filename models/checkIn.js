module.exports = function (sequelize, DataTypes) {
  const CheckIn = sequelize.define("CheckIn", {
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
    },

    soberTally: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    postDate: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1, 144]
    }
  });

  CheckIn.associate = function (models) {
    CheckIn.belongsTo(models.User, {
      targetKey: "id"
    });
  };

  return CheckIn;
};
