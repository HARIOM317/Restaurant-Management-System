import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { connectDB } from "./config/db.js";

//import routes
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import reservationRouter from "./routes/reservationRoute.js";
import tableRouter from "./routes/tableRoute.js";
import hutRouter from "./routes/hutRouter.js";
import eventRouter from "./routes/eventRoute.js";
import promoRouter from "./routes/promoRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import offlineOrderRouter from "./routes/offlineOrderRoute.js";
import carouselRouter from "./routes/carouselRoute.js";
import popupRouter from "./routes/popupRoute.js";
import contactRouter from "./routes/contactRoute.js";
import pointsRouter from "./routes/pointsRouter.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

// app config
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// API endpoint
app.use("/images", express.static("uploads"));
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/table", tableRouter);
app.use("/api/hut", hutRouter);
app.use("/api/event", eventRouter);
app.use("/api/promo", promoRouter);
app.use("/api/review", reviewRouter);
app.use("/api/offlineOrder", offlineOrderRouter);
app.use("/api/carousel", carouselRouter);
app.use("/api/popup", popupRouter);
app.use("/api/contact", contactRouter);
app.use("/api/points", pointsRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.send("API mst chl rha h :)");
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`The server is running at Port: ${port}`);
});

export { io }; // Export io for use in other files
