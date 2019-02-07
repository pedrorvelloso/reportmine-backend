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

export default router