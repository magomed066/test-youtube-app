import axios from 'axios'

class YoutubeService {
	async search(query) {
		const { data } = await axios.get(
			'https://www.googleapis.com/youtube/v3/search',
			{
				params: {
					part: 'snippet',
					maxResults: 12,
					key: process.env.REACT_APP_YOUTUBE_API_KEY,
					q: query,
				},
			},
		)

		return data
	}
}

export default new YoutubeService()
