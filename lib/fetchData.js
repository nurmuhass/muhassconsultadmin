import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc,deleteDoc, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { storage,auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {  createUserWithEmailAndPassword} from 'firebase/auth'
import { deleteUser as deleteAuthUser } from 'firebase/auth';

const usersRef = collection(db, "users");
const SingUpDoctorsRef  = collection(db, "SingUpDoctors");

export const fetchUsers = async () => {
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const fetchSingUpDoctors = async () => {
  const q = query(SingUpDoctorsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};



export const fetchUserById = async (id) => {
  const userDocRef = doc(usersRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};


export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    // Upload image to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the download URL
    const imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Error uploading image');
  }
};



export const updateUserData = async (id, updatedUserData) => {
  const userDocRef = doc(usersRef, id);

  try {
    await updateDoc(userDocRef, updatedUserData);
    console.log(`User data updated successfully for user with ID: ${id}`);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Error updating user data');
  }
};

export const deleteUserById = async (userId) => {
  const userDocRef = doc(usersRef, userId);

  try {
    await deleteDoc(userDocRef);
    console.log(`User with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};
// export const deleteUserById = async (userId) => {
//   const userDocRef = doc(usersRef, userId);

//   try {
    
//     // Get user data from Firestore
//     const userDocSnapshot = await getDoc(userDocRef);
//     const userData = userDocSnapshot.data();

//     // Delete user from Firebase Authentication
//     await deleteAuthUser(auth, userData.email);

//     // Delete user document from Firestore
//     await deleteDoc(userDocRef);

//     console.log(`User with ID ${userId} deleted successfully`);
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw new Error('Error deleting user');
//   }
// };

// Function to create a new user in Firebase Authentication
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User signed up:', user);
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error('Error signing up');
  }
};

// Function to add a new user to the database
export const addNewUser = async (userData) => {
  try {
    console.log('Adding new user to Firestore:', userData);
    // Sign up the user with email and password
    const user = await signUpWithEmailAndPassword(userData.email, userData.Password);


    // Proceed to add the user to the Firestore database
    const usersRef = collection(db, 'users');
    const newUserRef = await addDoc(usersRef, {
      ...userData,
      // You can include additional user data if needed
      // For example, you might add the user's UID from Firebase Authentication
      uid: user.uid,
    });

    console.log('New user added with ID:', newUserRef.id);
    return newUserRef.id;
    
  } catch (error) {
    console.error('Error adding new user:', error);
    throw new Error('Error adding new user');
  }
};
