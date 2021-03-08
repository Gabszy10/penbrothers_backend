module.exports = (sequelize, DataTypes) => {
  const Toppings = sequelize.define(
    "toppings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      toppings_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },

    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "toppings",
    }
  );

  return Toppings;
};
