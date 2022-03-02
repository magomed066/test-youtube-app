import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ to = '/', children }) => {
	const { user } = useSelector((state) => state.auth)

	return user ? children : <Navigate to={to} />
}

export default ProtectedRoute
