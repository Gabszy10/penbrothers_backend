module.exports = (sequelize, DataTypes) => {
  const PizzaItem = sequelize.define(
    "pizza_item",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      size: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      crust: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      type: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },

    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "pizza_item",
    }
  );

  return PizzaItem;
};
