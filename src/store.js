import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
// Reducers
import settingsReducer from './reducers/settingsReducer'


const firebaseConfig = {
    apiKey: "AIzaSyAgfQEcqeg5cDKekAith659oOIZMy66nA4",
    authDomain: "mancity-f0f01.firebaseapp.com",
    databaseURL: "https://mancity-f0f01.firebaseio.com",
    projectId: "mancity-f0f01",
    storageBucket: "mancity-f0f01.appspot.com",
    messagingSenderId: "356236913419"
}
// init firebase instance
firebase.initializeApp(firebaseConfig)

// init firestore
const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // <- needed if using firestore
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  settings: settingsReducer
})

if (localStorage.getItem('settings') === null) {
  const defaultsettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }
  localStorage.setItem('settings', JSON.stringify(defaultsettings))
}

// create initial state
const initialState = { settings: JSON.parse(localStorage.getItem('settings')) }

// create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store
