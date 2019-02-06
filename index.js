require('dotenv').config();
import express from 'express'
import jwt from 'express-jwt'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'

// routes
import projectRouter from './src/routes/projects'
import userRouter from './src/routes/user'

const app = express()

// loger
app.use(morgan('dev'))
// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// auth middleware
const auth = jwt({
    secret: `ha`,
    credentialsRequired: false
});
app.use(auth);

app.get('/', (req, res) => {
    res.send('Backend do Gerador de Relatório')
})

app.use('/projects', projectRouter)
app.use('/user', userRouter)

const server = http.createServer(app)

const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`• Server started succesfully, running at port ${port} 🚀`)
})