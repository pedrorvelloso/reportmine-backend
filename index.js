require('dotenv').config()
import express from 'express'
import jwt from 'express-jwt'
import http from 'http'
import bodyParser from 'body-parser'
import morgan from 'morgan'
// swagger
import expressSwagger from 'express-swagger-generator'
// routes
import projectRouter from './src/routes/projects'
import userRouter from './src/routes/user'

const app = express()
const swagger = expressSwagger(app)

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
	res.send('Backend do Gerador de Relatório')
})

app.use('/projects', projectRouter)
app.use('/login', userRouter)

const server = http.createServer(app)

const options = {
	swaggerDefinition: {
		info: {
			description: 'This is a sample server',
			title: 'Swagger',
			version: '1.0.0',
		},
		host: 'localhost:3000',
		basePath: '/',
		produces: [
			'application/json',
			'application/xml'
		],
		schemes: ['http'],
		securityDefinitions: {
			JWT: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization',
				description: '',
			}
		}
	},
	basedir: __dirname, //app absolute path
	files: ['./routes/**/*.js'] //Path to the API handle folder
}

const port = process.env.PORT || 4000
swagger(options)
server.listen(port, () => {
	console.log(`• Server started succesfully, running at port ${port} 🚀`)
})