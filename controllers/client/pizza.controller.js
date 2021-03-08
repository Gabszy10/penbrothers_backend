// db
const db = require("../../models/index");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const Order = db.orders;
const PizzaItem = db.pizza_item;
const Toppings = db.toppings;

module.exports = {
  createOrder: async (req, res) => {
    const { order, pizza } = req.body;
    let count_of_toppings = 0;

    // create new order
    const newOrder = await Order.create({
      order_number: order,
    });

    // create new pizza
    for (let i = 0; i < pizza.length; i++) {
      const item = pizza[i];

      // create new pizza item
      await PizzaItem.create({
        number: item["number"],
        order_id: newOrder.id,
        size: item["elements"]["size"],
        crust: item["elements"]["crust"],
        type: item["elements"]["type"],
      });

      for (let j = 0; j < item["toppings"].length; j++) {
        const topping = item["toppings"][j];

        let topping_type = await db.toppings_type.findOne({
          where: {
            type: topping["type"],
          },
        });

        for (let x = 0; x < topping["toppings_item"].length; x++) {
          const topping_item = topping["toppings_item"][x];

          await Toppings.create({
            toppings_type_id: topping_type.id,
            order_id: newOrder.id,
            title: topping_item,
          });
          count_of_toppings += 1;
        }
      }
    }

    newOrder.count_of_toppings = count_of_toppings;
    newOrder.save();
    res.json({
      msg: "Successfully created order.",
    });
  },

  getOrders: async (req, res) => {
    const { elements, count_of_toppings } = req.body;
    let orders;
    console.log(count_of_toppings);
    if (count_of_toppings) {
      orders = await Order.findAll({
        where: {
          count_of_toppings,
        },
        include: [
          {
            model: db.pizza_item,
          },
          {
            model: db.toppings,
          },
        ],
      });
    } else {
      orders = await Order.findAll({
        include: [
          {
            model: db.pizza_item,

            where: {
              [Op.or]: [
                {
                  crust: { [Op.like]: `%${elements}%` },
                },
                {
                  size: { [Op.like]: `%${elements}%` },
                },
                {
                  type: { [Op.like]: `%${elements}%` },
                },
              ],
            },
          },
          {
            model: db.toppings,
          },
        ],
      });
    }

    res.json({ orders });
  },
};
