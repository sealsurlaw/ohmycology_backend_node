import { Application, Request, Response } from "express"
import unprotectedRouter from "./routes/unprotected_routes"
import userRouter from "./routes/user_routes"
import postRouter from "./routes/post_routes"
import commentRouter from "./routes/comment_routes"
import { jwtMiddleware } from "./middleware/jwt_middle"
require('dotenv').config();

const express = require('express')
const app: Application = express()
const port: number = 8080
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')

app.get('/ping', (req: Request, res: Response) => {
  res.sendStatus(200)
})

// Middleware
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())

// Unprotected Routes
app.use("/", unprotectedRouter)

// Protected Routes
app.use(jwtMiddleware)
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})