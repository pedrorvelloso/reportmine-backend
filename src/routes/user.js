import express from 'express'

import { generateToken } from '../auth'
import { login } from '../api/RedmineAPI'

const router = express.Router()

router.post('/', async (req, res) => {
	const { data, error } = await login(req.body.user, req.body.password)
	if (error) res.sendStatus(error.status)
	else {
		const token = generateToken(data.user.api_key)
		res.send({ token })
	}
})

router.post('/test', (req, res) => {
	if(req.body.user !== 'pedro' || req.body.password !== 'senha') res.sendStatus(401)
	else res.send({ok: true})
})

export default router
