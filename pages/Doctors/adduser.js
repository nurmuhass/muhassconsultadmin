import { useRouter } from 'next/router';
import { useState } from 'react';
import { uploadImage, addNewUser } from '../../lib/fetchData';
import Link from 'next/link';

const AddUser = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    DOB: '',
    Phone: '',
    city: '',
    gender: '',
    image: null, // Change this if you have a default image for new users
    state: '',
    Password:'',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    try {
      setLoading(true);

      let imageUrl = null;

      if (imageFile) {
        // Assuming you have a function to handle image uploads
        imageUrl = await uploadImage(imageFile);
      } else {
        // If no image selected, you may want to set a default image URL here
        imageUrl = userData.image || ''; // Change this if you have a default image for new users
      }

      // Prepare the new user data
      const newUser = {
        ...userData,
        image: imageUrl,
      };

      // Add the new user to the database
      await addNewUser(newUser);

      router.push(`/UsersPage`); // Redirect to the user list page
    } catch (error) {
      console.error('Error adding new user:', error);
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

  

  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mx-auto max-w-270">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-bold text-black dark:text-black">
                Add New User
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                  <Link href={`/UsersPage/`}>
                     
                    </Link>
                  </li>
                  <li className="font-medium text-primary">Add User</li>
                </ol>
              </nav>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-black">
                    Personal Information
                  </h3>
                </div>
                <div className="p-7">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="fullName">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="Full Name"
                          value={userData.fullname}
                          onChange={(event) => handleChange('fullname', event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="email">
    Email
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="Email"
      value={userData.email}
      onChange={(event) => handleChange('email', event.target.value)}
    />
  </div>
</div>
<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="DOB">
    Date of Birth
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="Date of Birth"
      value={userData.DOB}
      onChange={(event) => handleChange('DOB', event.target.value)}
    />
  </div>
</div> 

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="Phone">
    Phone
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="Phone"
      value={userData.Phone}
      onChange={(event) => handleChange('Phone', event.target.value)}
    />
  </div>
</div>

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="City">
    City
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="City"
      value={userData.city}
      onChange={(event) => handleChange('city', event.target.value)}
    />
  </div>
</div>

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="Gender">
    Gender
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="Gender"
      value={userData.gender}
      onChange={(event) => handleChange('gender', event.target.value)}
    />
  </div>
</div>

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="State">
   State
  </label>
  <div className="relative">
    <input
      className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
      placeholder="State"
      value={userData.state}
      onChange={(event) => handleChange('state', event.target.value)}
    />
  </div>
</div>

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="Password">
   Password
  </label>
  <div className="relative">
  <input
  type="password"
  id="password"
  className="w-full rounded border border-stroke bg-gray py-3 pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  placeholder="Password"
  value={userData.Password}
  onChange={(event) => handleChange('Password', event.target.value)}
/>
  </div>
</div>

                  </div>

                  
<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-black">Photo</h3>
    </div>
    <div className="p-7">
  
      <div id="FileUpload" className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          onChange={handleImageChange}
        />
        <div className="flex flex-col items-center justify-center space-y-3">
 
                    
                 
                  { imageFile ? 
   <div class="h-24 w-24 rounded-full">
<img src={ imageFile ?  URL.createObjectURL(imageFile) : null} alt="User"  className='rounded-half'/>
</div>
          : 

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">

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
                  }
          <p className="text-sm font-medium">
            <span className="text-primary">Click to upload</span>
          </p>
          <p className="mt-1.5 text-sm font-medium">SVG, PNG, JPG or GIF</p>
          <p className="text-sm font-medium">(max, 800 X 800px)</p>
        </div>
      </div>
    </div>
  </div>

                  <div className="flex justify-end gap-4.5 mt-5">
                    <Link href="/UsersPage">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                        type="button"
                      >
                        Cancel
                      </button>
                    </Link>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
                      type="button"
                      onClick={loading ? null : handleAddUser}
                    >
                      {loading ? 'Adding...' : 'Add User'}
                    </button>
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

export default AddUser;
