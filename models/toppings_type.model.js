module.exports = (sequelize, DataTypes) => {
  const ToppingsType = sequelize.define(
    "toppings_type",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tableName: "toppings_type",
    }
  );

  return ToppingsType;
};
