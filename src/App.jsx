import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Favorite, Login, Main, Search } from './pages'

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/main" element={<Main />}>
						<Route path="search" element={<Search />} />
						<Route path="favorite" element={<Favorite />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
