import * as firebase from 'firebase/app'
import 'firebase/functions'

export default (context, inject) => {
  const config = {
    apiKey: context.env.firebaseApiKey,
    authDomain: context.env.firebaseAuthDomain,
    databaseURL: context.env.firebaseDatabaseURL,
    projectId: context.env.firebaseProjectId,
    storageBucket: context.env.firebaseStorageBucket,
    messageingSenderId: context.env.firebaseMessageingSenderId
  }
  if (firebase.apps.length == 0) firebase.initializeApp(config)
  const functions = firebase.functions()
  inject('firebaseFunctions', functions)
}