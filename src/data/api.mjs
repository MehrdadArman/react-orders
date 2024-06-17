import jsonServer from "json-server";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

// Get __dirname in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(join(__dirname, "db.json"));
const port = 3000;

server.use(middlewares);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// ** orders endpoints
server.get("/orders", (req, res) => {
  const db = router.db;
  const orders = db.get("orders").value();

  res.jsonp(orders);
});

server.get("/orders/:id", (req, res) => {
  const db = router.db;
  const id = req.params.id;

  const order = db.get("orders").find({ id }).value();
  const customerInfo = db
    .get("customers")
    .find({ id: order.customerId })
    .value();

  const products = order.items.map((item) => {
    const product = db.get("products").find({ id: item.productId }).value();
    const price = parseFloat(product.price);
    const total = parseFloat(item.quantity * price);

    return {
      id: product.id,
      quantity: item.quantity,
      total,
      description: product.description,
      price,
    };
  });

  if (!order) {
    res.status(404).jsonp({ error: "Order not found" });
    return;
  }

  const orderInfo = {
    id: order.id,
    customer: customerInfo,
    items: products,
    total: order.total,
  };

  res.jsonp(orderInfo);
});

server.post("/orders/:id/confirm", (req, res) => {
  const db = router.db;

  // ** params
  const orderId = req.params.id;

  // ** body
  const { items, total } = req.body;

  const orderExists = db.get("orders").find({ id: orderId }).value();
  if (!orderExists) {
    res.status(404).jsonp({ error: "Order not found" });
    return;
  }

  db.get("orders")
    .find({ id: orderId })
    .assign({ items: items, total })
    .write();

  const updatedOrder = db.get("orders").find({ id: orderId }).value();

  res.jsonp(updatedOrder);
});

// ** customers endpoints
server.get("/customers", (req, res) => {
  const db = router.db;
  const customers = db.get("customers").value();

  res.jsonp(customers);
});

// ** products endpoints
server.get("/products", (req, res) => {
  const db = router.db;
  const products = db.get("products").value();

  res.jsonp(products);
});

// Use default router
server.use("/", router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
