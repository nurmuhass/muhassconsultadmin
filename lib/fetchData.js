import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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