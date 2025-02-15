import
express
    from "express"
import cors from "cors"

import multer from 'multer'
import cookieParser from "cookie-parser"
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import likeRoutes from './routes/likes.js'
import relationshipRoutes from './routes/relationships.js'
import commentsRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'

const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../appfrontend/public/upload')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/comments", commentsRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/relationships", relationshipRoutes)

app.listen(8800, () => {
    console.log("server on")
})