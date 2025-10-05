import express from "express";
import path from 'path'
import { NODE_ENV, PORT } from "./configs/env.config.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();
const __dirname = path.resolve();


//routers
app.use('/api/auth' , authRouter);
app.use('/api/message' , messageRouter);


//make ready for deployment
if(NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname , "../frontend/dist")));
    app.get("*" , (req , res) => {
        res.sendFile(path.join(__dirname , "../frontend/dist/index.html"));
    })
}
app.listen(PORT || 3000 , () => console.log(`Server is live: http://localhost:${PORT || 3000}`));