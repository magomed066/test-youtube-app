import axios from 'axios'

class YoutubeService {
	async search(query) {
		const { data } = await axios.get(
			'https://www.googleapis.com/youtube/v3/search',
			{
				params: {
					part: 'snippet',
					maxResults: 6,
					key: process.env.REACT_APP_YOUTUBE_API_KEY,
					q: query,
				},
			},
		)

		return data
	}
}

// process.env.REACT_APP_YOUTUBE_API_KEY

export default new YoutubeService()
