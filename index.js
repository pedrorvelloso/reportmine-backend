require('dotenv').config()
import express from 'express'
import jwt from 'express-jwt'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

// routes
import projectRouter from './src/routes/projects'
import userRouter from './src/routes/user'

const app = express()
app.use(cors())

// loger
app.use(morgan('dev'))
// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// auth middleware
const auth = jwt({
	secret: process.env.JWT_SECRET,
	credentialsRequired: false
})
app.use(auth)

app.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).send('Invalid Token')
	}
	next()
})

app.get('/', (req, res) => {
	res.send('Reportmine Backend')
})

app.use('/projects', projectRouter)
app.use('/login', userRouter)

const server = http.createServer(app)

const port = process.env.PORT || 4000
server.listen(port, () => {
	console.log(`• Server started succesfully, running at port ${port} 🚀`)
})