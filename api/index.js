import express from 'express'
import cors from "cors";
import cookieParser from 'cookie-parser';
import postRouter from './pages/post.page.js'
import testRouter from './pages/test.page.js'
import authRouter from './pages/auth.page.js'
import userRouter from './pages/user.page.js'
import chatRouter from './pages/chat.page.js'
import messageRouter from './pages/message.page.js'
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);   
app.use("/api/test", testRouter);   
app.use("/api/messages", messageRouter);   
app.use("/api/chats", chatRouter);   
app.listen(8800,() => {
    console.log('Server is started')
})