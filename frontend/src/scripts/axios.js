import axios from 'axios'

const backendAxios = axios.create({
	baseURL: 'http://localhost:3001/api/',
	timeout: 2000,
	responseType: 'json',
})

/**
 *
 * @param {string} token
 */
const applyToken = (token) => {
	token = token.replace('Bearer ', '')
	localStorage.setItem('token', token)
	backendAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { backendAxios, applyToken }
