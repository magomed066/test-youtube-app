import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './components'
import { Favorite, Favs, Login, Main, Results, Search } from './pages'

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/main"
						element={
							<ProtectedRoute>
								<Main />
							</ProtectedRoute>
						}
					>
						<Route path="search" element={<Search />} />
						{/* <Route path="search/results" element={<Results />} /> */}
						<Route path="favorite" element={<Favs />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
