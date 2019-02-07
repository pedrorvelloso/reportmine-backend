import jwt from 'jsonwebtoken'

const generateToken = (apiKey) => {
	const token = jwt.sign({ apiKey }, process.env.JWT_SECRET, { expiresIn: '1y' })
	return token
}

export {
	generateToken
}