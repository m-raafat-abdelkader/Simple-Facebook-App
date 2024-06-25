import express from "express"; 
import userRouter from "./src/Modules/Users/user.routes.js";
import postRouter from "./src/Modules/Posts/post.routes.js";
import commentRouter from "./src/Modules/Comments/comment.routes.js";
import { db_sync } from "./DB/connection.js";


const app = express();

const port = process.env.PORT || 3000;


app.use(express.json());


// Root route
app.get('/', (req, res) => {
    res.json('Welcome to my app!');
});



app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

  
db_sync()