import {  useRouter } from 'next/router';
import { useState } from 'react';
import { uploadEmployeeImage, addNewEmployee } from '../../lib/fetchData';
import Link from 'next/link';

const AddEmployee = () => {
  const router = useRouter();
  const [EmployeeData, setEmployeeData] = useState({
    fullname: '',
    email: '',
    DOB: '',
    Phone: '',
    city: '',
    gender: '',
    image: null, // Change this if you have a default image for new Employees
    state: '',
    Password:'',
    Role:'',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddEmployee = async () => {
    try {
      setLoading(true);

      let imageUrl = null;

      if (imageFile) {
        // Assuming you have a function to handle image uploads
        imageUrl = await uploadEmployeeImage(imageFile);
      } else {
        // If no image selected, you may want to set a default image URL here
        imageUrl = EmployeeData.image || ''; // Change this if you have a default image for new Employees
      }

      // Prepare the new Employee data
      const newEmployee = {
        ...EmployeeData,
        image: imageUrl,
      };

      // Add the new Employee to the database
      await addNewEmployee(newEmployee);

      router.push(`/Employees`); // Redirect to the Employee list page
    } catch (error) {
      console.error('Error adding new Employee:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setEmployeeData((prevData) => ({
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
                Add New Employee
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                  <Link href={`/EmployeesPage/`}>
                     
                    </Link>
                  </li>
                  <li className="font-medium text-primary">Add Employee</li>
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
                          value={EmployeeData.fullname}
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
      value={EmployeeData.email}
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
      value={EmployeeData.DOB}
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
      value={EmployeeData.Phone}
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
      value={EmployeeData.city}
      onChange={(event) => handleChange('city', event.target.value)}
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
      value={EmployeeData.state}
      onChange={(event) => handleChange('state', event.target.value)}
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
      value={EmployeeData.gender}
      onChange={(event) => handleChange('gender', event.target.value)}
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
  value={EmployeeData.Password}
  onChange={(event) => handleChange('Password', event.target.value)}
/>
  </div>
</div>

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
Role
  </label>
  <div className="relative">
  <input
  type="text"
  id="text"
  className="w-full rounded border border-stroke bg-gray py-3 pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  placeholder="Employee Role"
  value={EmployeeData.Role}
  onChange={(event) => handleChange('Role', event.target.value)}
/>
  </div>
</div>

<div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="Image">
  Image
  </label>
  <div className="relative">
  <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
           id="formFile"
           onChange={handleImageChange}
          />
  </div>
  <img src={ imageFile ?  URL.createObjectURL(imageFile) : null} alt="User"  className='rounded-half'/>
</div>

                  </div>

                  <div className="flex justify-end gap-4.5 mt-5">
                    <Link href="/Employees">
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
                      onClick={loading ? null : handleAddEmployee}
                    >
                      {loading ? 'Adding...' : 'Add Employee'}
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

export default AddEmployee;
