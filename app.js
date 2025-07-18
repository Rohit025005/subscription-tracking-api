import express from "express";
import { PORT } from './config/env.js';
import userRouter from "./routes/usersRoutes.js";
import authRouter from "./routes/authRoutes.js"; // ✅ assumed different file
import subRouter from "./routes/subscriptionRoutes.js";
import { connectToDB } from "./database/mongodb.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import workFlowRouter from "./routes/workFlowRoutes.js";
import { limiter } from "./middlewares/ratelimiterMiddleware.js"



const app = express();
//app.set('trust proxy', true); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(limiter);




app.use('/api/v1/auth',limiter, authRouter);  // ✅limiter  ✅ authRouter
app.use('/api/v1/users', limiter,userRouter);//✅limiter  ✅ userRouter
app.use('/api/v1/subscription', subRouter); 
app.use('/api/v1/workflows', workFlowRouter);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log("SERVER_URL:", process.env.SERVER_URL);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err.message);
    
  }
};

startServer();

export default app;
