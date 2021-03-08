module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "orders",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      order_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      count_of_toppings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },

    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "orders",
    }
  );

  Orders.associate = (model) => {
    Orders.hasMany(model.pizza_item, {
      foreignKey: "order_id",
    });

    Orders.hasMany(model.toppings, {
      foreignKey: "order_id",
    });
  };

  return Orders;
};
