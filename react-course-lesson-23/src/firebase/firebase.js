
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBVRZ2hdcYmUMi0NCcqixyYLPpww4p-Zz0",
  authDomain: "crownshop-c70e5.firebaseapp.com",
  projectId: "crownshop-c70e5",
  storageBucket: "crownshop-c70e5.appspot.com",
  messagingSenderId: "874732610958",
  appId: "1:874732610958:web:48633a363ac2bc2d55b0df",
  measurementId: "G-T8G2WQ1JXN",
  // databaseURL:"https://crownstore.firebaseio.com"
};

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return
   const userRef = firestore.doc(`users/${userAuth.uid}`)
   const snapShot = await userRef.get()

   if(!snapShot.exists){
     const {displayName,email} = userAuth
     const createdAt = new Date()

     try {
       await userRef.set({
         displayName,
         email,
         createdAt,
         ...additionalData
       })
     } catch (error) {
       console.log('There was an error in creating user',error.message)
     }
   }

   return userRef

}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections =>{
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data()
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  }
  )
  return transformedCollection.reduce((accumulator, collection)=>{
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt:'select_account'})

export const signInWithGoogle = ()=> auth.signInWithPopup(provider)


export default firebase 