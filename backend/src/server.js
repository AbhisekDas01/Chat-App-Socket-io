import express from "express"
import { PORT } from "./configs/env.config.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();

//routers
app.use('/api/auth' , authRouter);
app.use('/api/message' , messageRouter);

app.listen(PORT || 3000 , () => console.log(`Server is live: http://localhost:${PORT || 3000}`));