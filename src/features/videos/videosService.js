import axios from 'axios'

const search = async (query, maxResults) => {
	const { data } = await axios.get(
		'https://www.googleapis.com/youtube/v3/search',
		{
			params: {
				part: 'snippet',
				maxResults: maxResults,
				key: process.env.REACT_APP_YOUTUBE_API_KEY,
				q: query,
			},
		},
	)

	return data
}

const videosService = {
	search,
}

export default videosService
