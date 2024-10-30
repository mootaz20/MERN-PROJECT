const mongoose = require("mongoose");
const app = require('./app');
require("dotenv").config();
mongoose
.connect(process.env.DATABASE)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(() => {
  console.log("Error connecting to MongoDB");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
