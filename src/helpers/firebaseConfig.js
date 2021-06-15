import Firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCGwnA9Y-kJ3kgGpG_MN1EZcr3QvRgdjzg",
  authDomain: "chat-app-62267.firebaseapp.com",
  projectId: "chat-app-62267",
  storageBucket: "chat-app-62267.appspot.com",
  messagingSenderId: "695709863666",
  appId: "1:695709863666:web:7e145653b5afab6c6aca6b",
  measurementId: "G-6YHQ4SHJ7F",
};

try {
  Firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log({ e });
}

const firebase = Firebase;
export default firebase;
