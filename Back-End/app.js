const express = require('express');
const cors = require("cors");
const registerRoutes = require('./Routes/register.routes');
const loginRoutes = require('./Routes/login.routes');
const postRoutes = require('./Routes/post.routes');
const categoryRoutes = require('./Routes/category.routes');
const commentRoutes = require('./Routes/comment.routes');
const uploadRoutes = require('./Routes/upload.routes');
const path = require('path');
const userRoutes = require('./Routes/user.routes');
const logoutRoutes = require('./Routes/logout.routes');
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "dist")));
app.use("/public/", express.static("public"));


app.use(express.json());

app.use('/register',registerRoutes);
app.use('/login',loginRoutes);
app.use('/post',postRoutes);
app.use('/category',categoryRoutes);
app.use('/comment',commentRoutes);
app.use('/upload-image',uploadRoutes);
app.use('/user',userRoutes);
app.use('/logout',logoutRoutes);



module.exports = app;

