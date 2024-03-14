import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc,deleteDoc, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { storage,auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {  createUserWithEmailAndPassword} from 'firebase/auth'
import { deleteUser } from 'firebase/auth';
import { deleteUser as deleteAuthUser } from 'firebase/auth';


const usersRef = collection(db, "users");
const SingUpDoctorsRef  = collection(db, "SingUpDoctors");
const DoctorsRef  = collection(db, "Doctors");
const EmployeesRef  = collection(db, "Employees");
const BlogsRef  = collection(db, "BlogPost");
const AppointmentRef  = collection(db, "Appointments");
const SuccessfulAppointmentsRef  = collection(db, "SuccessfulAppointments");
const UnSuccessfulAppointmentsRef  = collection(db, "UnSuccessfulAppointments");
const failedRequestRef  = collection(db, "request Failed");
const categoriesRef  = collection(db, "categories");

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


export const fetchDoctors = async () => {
  const q = query(DoctorsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

export const fetchEmployees = async () => {
  const q = query(EmployeesRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};


export const fetchBlogs = async () => {
  const q = query(BlogsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};


export const fetchSuccessfulAppointments = async () => {
  const q = query(SuccessfulAppointmentsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return results;
};

export const fetchUnSuccessfulAppointments = async () => {
  const q = query(UnSuccessfulAppointmentsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return results;
};

export const fetchFailedRequest = async () => {
  const q = query(failedRequestRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return results;
};

export const fetchcategories = async () => {
  const q = query(categoriesRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return results;
};


export const fetchAppoinments = async () => {
  const q = query(AppointmentRef);
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


export const fetchEmployeeById = async (id) => {
  const userDocRef = doc(EmployeesRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

export const fetchCategoryById = async (id) => {
  const userDocRef = doc(categoriesRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

export const fetchblogById = async (id) => {
  const userDocRef = doc(BlogsRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

export const fetchAppointmentById = async (id) => {
  const userDocRef = doc(SuccessfulAppointmentsRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

export const fetchUnSuccesfulAppointmentById = async (id) => {
  const userDocRef = doc(UnSuccessfulAppointmentsRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};


export const fetchFailedRequestById = async (id) => {
  const userDocRef = doc(failedRequestRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

export const fetcSignUpUserById = async (id) => {
  const userDocRef = doc(SingUpDoctorsRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

export const fetcDoctorsById = async (id) => {
  const userDocRef = doc(DoctorsRef, id);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    return { ...userDocSnapshot.data(), id: userDocSnapshot.id };
  } else {
    // Handle user not found
    return null;
  }
};

// Function to verify a doctor and move to the "Doctors" collection
export const verifyDoctor = async (id) => {
  const signUpDoctorDocRef = doc(collection(db, 'SingUpDoctors'), id);

  try {
    // Get the data from the "SignUpDoctors" collection
    const signUpDoctorSnapshot = await getDoc(signUpDoctorDocRef);

    if (signUpDoctorSnapshot.exists()) {
      const signUpDoctorData = signUpDoctorSnapshot.data();

      // Add the doctor data to the "Doctors" collection
      const doctorsRef = collection(db, 'Doctors');
      const newDoctorRef = await addDoc(doctorsRef, signUpDoctorData);

      // Delete the document from the "SignUpDoctors" collection
      await deleteDoc(signUpDoctorDocRef);

      console.log(`Doctor verified and moved to Doctors collection. Doctor ID: ${newDoctorRef.id}`);
      return newDoctorRef.id;
    } else {
      console.error('Doctor not found in SignUpDoctors collection');
      throw new Error('Doctor not found in SignUpDoctors collection');
    }
  } catch (error) {
    console.error('Error verifying doctor:', error);
    throw new Error('Error verifying doctor');
  }
};

// Function to verify a doctor and move to the "Doctors" collection
export const declineDoctor = async (id) => {
  const signUpDoctorDocRef = doc(collection(db, 'SingUpDoctors'), id);

  try {
    // Get the data from the "SignUpDoctors" collection
    const signUpDoctorSnapshot = await getDoc(signUpDoctorDocRef);

    if (signUpDoctorSnapshot.exists()) {
      const signUpDoctorData = signUpDoctorSnapshot.data();

      // Add the doctor data to the "Doctors" collection
      const doctorsRef = collection(db, 'declinedDoctorsRequest');
      const newDoctorRef = await addDoc(doctorsRef, signUpDoctorData);

      // Delete the document from the "SignUpDoctors" collection
      await deleteDoc(signUpDoctorDocRef);

      console.log(`Doctor Declined and moved to declinedDoctorsRequest collection. New Doctor ID: ${newDoctorId}`);
      return newDoctorRef.id;
    } else {
      console.error('Doctor not found in SignUpDoctors collection');
      throw new Error('Doctor not found in SignUpDoctors collection');
    }
  } catch (error) {
    console.error('Error Declining doctor:', error);
    throw new Error('Error Declining doctor');
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

export const uploadblogImage = async (file) => {
  const storageRef = ref(storage, `blogimages/${file.name}`);

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

export const uploadCategoryImage = async (file) => {
  const storageRef = ref(storage, `Categoryimages/${file.name}`);

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



export const uploadEmployeeImage = async (file) => {
  const storageRef = ref(storage, ` Employeeimages/${file.name}`);

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

export const updateEmployeeData = async (id, updatedUserData) => {
  const userDocRef = doc(EmployeesRef, id);

  try {
    await updateDoc(userDocRef, updatedUserData);
    console.log(`User data updated successfully for user with ID: ${id}`);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Error updating user data');
  }
};

export const updateblogData = async (id, updateblogData) => {
  const userDocRef = doc(BlogsRef, id);

  try {
    await updateDoc(userDocRef, updateblogData);
    console.log(`blog data updated successfully  ID: ${id}`);
  } catch (error) {
    console.error('Error updating blog data:', error);
    throw new Error('Error updating blog data');
  }
};

export const updateCategoryData = async (id, updateCategoryData) => {
  const categoriesDocRef = doc(categoriesRef, id);

  try {
    await updateDoc(categoriesDocRef, updateCategoryData);
    console.log(`categories data updated successfully  ID: ${id}`);
  } catch (error) {
    console.error('Error updating categories data:', error);
    throw new Error('Error updating categories data');
  }
};


export const updateDoctorData = async (id, updatedUserData) => {
  const userDocRef = doc(DoctorsRef, id);

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

export const deleteCategoryById = async (catId) => {
  const catDocRef = doc(categoriesRef, catId);

  try {
    await deleteDoc(catDocRef);
    console.log(`category with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Error deleting category');
  }
};

export const deleteEmployeeById = async (userId) => {
  const userDocRef = doc(EmployeesRef, userId);

  try {
    await deleteDoc(userDocRef);
    console.log(`User with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};


export const deleteblogById = async (id) => {
  const blogDocRef = doc(BlogsRef, id);

  try {
    await deleteDoc(blogDocRef);
    console.log(`blog with ID ${userId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};

export const deleteDoctorById = async (userId) => {
  const userDocRef = doc(DoctorsRef, userId);

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


//     // Delete user document from Firestore
//     await deleteDoc(userDocRef);
    
//     // Delete user from Firebase Authentication
//     await deleteAuthUser(auth,userData.email);

//     console.log(`User with ID ${userId} deleted successfully`);
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw new Error('Error deleting user');
//   }
// };

// Function to create a new user in Firebase Authentication
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

// Function to add a new user to the database
export const addNewEmployee = async (userData) => {
  try {
    
    // Sign up the user with email and password
    const user = await signUpWithEmailAndPassword(userData.email, userData.Password);
    const EmployeesRef = collection(db, 'Employees');
    const newUserRef = await addDoc(EmployeesRef, {
      ...userData,
      // You can include additional user data if needed
      // For example, you might add the user's UID from Firebase Authentication
      uid: user.uid,
    });

    console.log('New Employee added with ID:', newUserRef.id);
    return newUserRef.id;
    
  } catch (error) {
    console.error('Error adding new user:', error);
    throw new Error('Error adding new user');
  }
};

export const addNewblog = async (Data) => {
  try {
  
    const newUserRef = await addDoc(BlogsRef, {
      ...Data, });
    
  } catch (error) {
    console.error('Error adding new blog:', error);
    throw new Error('Error adding new blog');
  }
};

export const addNewcategory = async (Data) => {
  try {
  
    const newUserRef = await addDoc(categoriesRef, {
      ...Data, });
    
  } catch (error) {
    console.error('Error adding new category:', error);
    throw new Error('Error adding new category');
  }
};
