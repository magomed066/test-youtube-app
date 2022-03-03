import {
	doc,
	collection,
	getDocs,
	setDoc,
	db,
	deleteDoc,
	updateDoc,
} from '../../firebase'

const addToFavs = async (item, uid) => {
	try {
		const favQuery = doc(collection(db, `users/${uid}/queries`))

		await setDoc(favQuery, {
			...item,
			id: favQuery.id,
		})
	} catch (error) {
		console.log(error)
	}
}
const updateFav = async (item, uid) => {
	console.log(item)
	try {
		const updated = doc(db, `users/${uid}/queries/${item.id}`)

		await updateDoc(updated, {
			query: item.query,
			maxResults: item.maxResults,
			sort: item.sort,
			name: item.name,
		})
	} catch (error) {
		console.log(error)
	}
}

const favsService = {
	addToFavs,
	updateFav,
}

export default favsService
