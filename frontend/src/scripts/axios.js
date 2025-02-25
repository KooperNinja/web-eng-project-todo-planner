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

backendAxios.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

const getBackendAxios = () => backendAxios

export { getBackendAxios, applyToken, backendAxios }
