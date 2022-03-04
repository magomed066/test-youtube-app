import axios from 'axios'

const search = async (query, maxResults, sort) => {
	const { data } = await axios.get(
		'https://www.googleapis.com/youtube/v3/search',
		{
			params: {
				part: 'snippet',
				maxResults: maxResults,
				key: process.env.REACT_APP_YOUTUBE_API_KEY,
				q: query,
				[sort?.sort]: sort?.value ? new Date(String(sort?.value)) : null,
			},
		},
	)

	return data
}

const videosService = {
	search,
}

export default videosService
