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
const deleteFav = async (item, uid) => {
	try {
		await deleteDoc(doc(db, `users/${uid}/queries/${item.id}`))
	} catch (error) {
		console.log(error)
	}
}
const updateFav = async (item, uid) => {
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
const getFavs = async (uid) => {
	try {
		const docRef = collection(db, `users/${uid}/queries`)

		const res = await getDocs(docRef)

		let d = []
		res.forEach((doc) => {
			d.push(doc.data())
		})

		return d
	} catch (error) {
		console.log(error)
	}
}

const favsService = {
	addToFavs,
	updateFav,
	getFavs,
	deleteFav,
}

export default favsService
