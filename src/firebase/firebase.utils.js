import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBKO_RwI3UJYKjcn7gh6C0_2eKvJzE_OUc',
  authDomain: 'crwn-db-fbd3e.firebaseapp.com',
  databaseURL: 'https://crwn-db-fbd3e.firebaseio.com',
  projectId: 'crwn-db-fbd3e',
  storageBucket: 'crwn-db-fbd3e.appspot.com',
  messagingSenderId: '1056864993748',
  appId: '1:1056864993748:web:1142a4b291bb7466b4d641',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
