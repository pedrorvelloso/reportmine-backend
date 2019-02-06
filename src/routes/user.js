import express from 'express'
import axios from 'axios'
import btoa from 'btoa'

import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/login', async (req, res) => {
    const { data } = await axios.get(`${process.env.REDMINE_URL}/users/current.json`, {
        headers: {
            'Authorization': 'Basic ' + btoa(req.body.user + ':' + req.body.password)
        }
    })
    const token = jwt.sign({ apiKey: data.user.api_key }, 'ha', { expiresIn: '1d' })
    res.send({ token })
})

export default router