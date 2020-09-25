module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
        
      },

      author_id: {

        type: DataTypes.TEXT,
        allowNull: false,
      },
      
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },

      feeling: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      hiccup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    });


    return Post;
  };