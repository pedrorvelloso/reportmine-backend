require('dotenv').config()
import axios from 'axios'
import btoa from 'btoa'

const instance = axios.create({
	baseURL: process.env.REDMINE_URL
})

const login = (user, password) => {
	return instance.get('/users/current.json', {
		headers: {
			'Authorization': 'Basic ' + btoa(user + ':' + password)
		}
	})
		.then(response => ({ data: response.data }))
		.catch(e => (
			{ error: { status: e.response.status, message: e.massage } }
		))
}

const getUserProjects = apiKey => {
	return instance.get('projects.json?limit=100', {
		headers: { 'X-Redmine-API-Key': apiKey }
	})
		.then(response => ({ data: response.data }))
		.catch(e => (
			{ error: { status: e.response.status, message: e.massage } }
		))
}

const getIssuesList = (apiKey, project) => {
	return instance.get(`projects/${project}/issues.json`, {
		headers: { 'X-Redmine-API-Key': apiKey }
	})
		.then(response => ({ data: response.data }))
		.catch(e => (
			{ error: { status: e.response.status, message: e.massage } }
		))
}

const getIssueDetail = (apiKey, issueId) => {
	return instance.get(`${process.env.REDMINE_URL}/issues/${issueId}.json`, {
		headers: { 'X-Redmine-API-Key': apiKey }
	})
		.then(response => ({ data: response.data }))
		.catch(e => (
			{ error: { status: e.response.status, message: e.massage } }
		))
}

export {
	login,
	getUserProjects,
	getIssuesList,
	getIssueDetail
}
