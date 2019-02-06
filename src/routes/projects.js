import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async (req, res) => {
    if(!req.user || !req.user.apiKey) res.sendStatus(401)

    const { data } = await axios.get(`${process.env.REDMINE_URL}/projects.json?limit=100`, {
        headers: { 'X-Redmine-API-Key': req.user.apiKey }
    })

    const projects = data.projects.map(project => (
        { nome: project.name, identificador: project.identifier }
    ))

    res.status(200).send({ projects })
})

router.get('/:project/issues', async (req, res) => {
    if(!req.user || !req.user.apiKey) res.sendStatus(401)

    const headers = { 'X-Redmine-API-Key': req.user.apiKey }

    const { data } = await axios.get(`${process.env.REDMINE_URL}/projects/${req.params.project}/issues.json`, {
        headers
    })
    const issuesp = data.issues.map(async issue => {
        const { data } = await axios.get(`${process.env.REDMINE_URL}/issues/${issue.id}.json`, {
            headers
        })
        return { issue: data.issue }
    })
    const issues = await Promise.all(issuesp).then(i => i)
    res.send({ issues })
})

export default router