import axios from 'axios'

class YoutubeService {
	async search(query) {
		const { data } = await axios.get(
			'https://www.googleapis.com/youtube/v3/search',
			{
				params: {
					part: 'snippet',
					maxResults: 6,
					key: 'AIzaSyAHRdZZCvdBQx54nwmj61uF9qZ5a_fcCTY',
					q: query,
				},
			},
		)

		return data
	}
}

// process.env.REACT_APP_YOUTUBE_API_KEY

export default new YoutubeService()
