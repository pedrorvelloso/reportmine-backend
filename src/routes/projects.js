import express from 'express'

import { getUserProjects, getIssuesList, getIssueDetail } from '../api/RedmineAPI'

const router = express.Router()

router.get('/', async (req, res) => {
	if (!req.user || !req.user.apiKey) res.sendStatus(401)

	const { data } = await getUserProjects(req.user.apiKey)

	const projects = data.projects.map(project => (
		{ nome: project.name, identificador: project.identifier }
	))

	res.status(200).send({ projects })
})

router.get('/:project/issues', async (req, res) => {
	if (!req.user || !req.user.apiKey) res.sendStatus(401)

	const { data } = await getIssuesList(req.user.apiKey, req.params.project)
	const issuesp = data.issues.map(async issue => {
		const { data } = await getIssueDetail(req.user.apiKey, issue.id)
		return { issue: data.issue }
	})
	const issues = await Promise.all(issuesp).then(i => i)
	res.send({ issues })
})

export default router