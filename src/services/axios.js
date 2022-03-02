import axios from 'axios'

export default axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
	params: {
		part: 'snippet',
		maxResults: 5,
		key: 'AIzaSyAHRdZZCvdBQx54nwmj61uF9qZ5a_fcCTY',
	},
	// headers: {
	// 	// 'Access-Control-Allow-Origin': 'http://localhost:3000',
	// 	'Content-Type': 'application/x-www-form-urlencoded',
	// 	'Access-Control-Allow-Origin': '*', // * или ваш домен
	// 	'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
	// 	'Access-Control-Allow-Headers':
	// 		'Origin, X-Requested-With, Content-Type, Accept',
	// },
})
