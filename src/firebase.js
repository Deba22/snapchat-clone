import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCr5tVZszrY3s4oyYCh-RhntgAbifKvuss",
    authDomain: "snapchat-clone-ccadd.firebaseapp.com",
    projectId: "snapchat-clone-ccadd",
    storageBucket: "snapchat-clone-ccadd.appspot.com",
    messagingSenderId: "60828596533",
    appId: "1:60828596533:web:e406c54ff9625a6d02747c"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {db,auth,storage,provider};