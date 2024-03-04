// pages/users/[id]/edit.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchUserById, updateUserData,uploadImage } from '../../../lib/fetchData';
import Link from 'next/link';


const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUserById(id);
        setUserData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let imageUrl = null;

      if (imageFile) {
        // Assuming you have a function to handle image uploads
        imageUrl = await uploadImage(imageFile);
      } else {
        // No new image file selected, keep the existing image URL
        imageUrl = userData.image;
      }

      // Update the user data with the new image URL
      const updatedUserData = {
        ...userData,
        image: imageUrl,
      };

      // Update the user data in the database
      await updateUserData(id, updatedUserData);
      router.push(`/users/${id}/view`);
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const TextInput = ({ label, value, onChange }) => (
    <div>
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type="text"
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  
  return (
    <div className="min-h-screen">
    <main>
      <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div class="mx-auto max-w-270">
          <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-title-md2 font-bold text-black dark:text-black">
              Edit User Page - {id}
            </h2>
            <nav>
              <ol class="flex items-center gap-2">
                <li>
                  <a class="font-medium" href="">Dashboard /</a>
                </li>
                <li class="font-medium text-primary">Settings</li>
              </ol>
            </nav>
          </div>
  
          <div class="grid grid-cols-2 gap-8">
          <div class="col-span-2 sm:col-span-1">
  <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
      <h3 class="font-medium text-black dark:text-black">
        Personal Information
      </h3>
    </div>
    <div class="p-7">
      <div class="grid grid-cols-2 gap-8">
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="fullName">Full Name</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Full Name"
              value={userData.fullname}
              onChange={(event) => handleChange('fullname', event.target.value)}
            />
          </div>
        </div>
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="email">Email</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Email"
              value={userData.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </div>
        </div>
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="DOB">Date of Birth</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Date of Birth"
              value={userData.DOB}
              onChange={(event) => handleChange('DOB', event.target.value)}
            />
          </div>
        </div>
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="phone">Phone Number</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray pl-3 py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Phone Number"
              value={userData.Phone}
              onChange={(event) => handleChange('Phone', event.target.value)}
            />
          </div>
        </div>
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="state">State</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="State"
              value={userData.state}
              onChange={(event) => handleChange('state', event.target.value)}
            />
          </div>
        </div>
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="city">City</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="City"
              value={userData.city}
              onChange={(event) => handleChange('city', event.target.value)}
            />
          </div>
        </div>
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="gender">Gender</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke pl-3 bg-gray py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Gender"
              value={userData.gender}
              onChange={(event) => handleChange('gender', event.target.value)}
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4.5">
      <Link href={`/UsersPage/`}>
        <button
          class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
          type="button"
          
        >
       
          Cancel
        </button>
        </Link>
        <button
          class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
          type="button"
          onClick={loading ? null : handleUpdate}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  </div>
</div>

            <div class="col-span-2 sm:col-span-1">
              {/* Add your image upload section here */}
              {/* Example: */}
              <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 class="font-medium text-black dark:text-black">
                    Photo
                  </h3>
                </div>
                <div class="p-7">
                  {/* Your image upload UI here */}
                  {/* Example: */}
                  <div class="mb-4 flex items-center gap-3">
                    <div class="h-14 w-14 rounded-full">
                    <img src={imageFile ? URL.createObjectURL(imageFile) : userData.image} alt="User" />
                    </div>
                    <div>
                      <span class="mb-1.5 font-medium text-black dark:text-black">
                        Edit photo
                      </span>
                    </div>
                  </div>
  
                  {/* Your file upload input */}
                  {/* Example: */}
                  <div id="FileUpload" class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
                    <input
                      type="file"
                      accept="image/*"
                      class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={handleImageChange}
                    />
                    {/* Your file upload UI */}
                    {/* Example: */}
                    <div class="flex flex-col items-center justify-center space-y-3">
                      <span class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        {/* Your file upload icon */}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Your SVG path */}
                        </svg>
                      </span>
                      <p class="text-sm font-medium">
                        <span class="text-primary">Click to upload</span>
                      </p>
                      <p class="mt-1.5 text-sm font-medium">
                        SVG, PNG, JPG or GIF
                      </p>
                      <p class="text-sm font-medium">
                        (max, 800 X 800px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  );
};

export default EditUser;
