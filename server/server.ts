import express from "express";
import UsersRouter from "./routes/users";
import RestaurantsRoute from "./routes/restaurants";
import cors from "cors";
const app = express();

const port = 5020;

app.use(express.json());
app.use(cors());
app.use('/users', UsersRouter)
app.use('/restaurants', RestaurantsRoute)
app.get("/", async (req, res) => {
  res.send("Server Is Online").status(200);
});

app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
