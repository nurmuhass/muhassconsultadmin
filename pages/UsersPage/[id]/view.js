import React from 'react'
// pages/users/[id]/edit.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchUserById, updateUserData,uploadImage } from '../../../lib/fetchData';
import Link from 'next/link';


export default function view() {

    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState(null);
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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

        </div>
      </div>
    </main>
  </div>
  )
}
