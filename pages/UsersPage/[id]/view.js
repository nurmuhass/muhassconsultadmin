import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchUserById } from '../../../lib/fetchData';
import Link from 'next/link';

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);

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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mx-auto max-w-270">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-bold text-black dark:text-black">
                View User Page - {id}
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                    <a className="font-medium" href="">
                      Dashboard /
                    </a>
                  </li>
                  <li className="font-medium text-primary">View User</li>
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
                          value={userData.fullname || ''}
                          disabled
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
                          value={userData.email || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="DOB">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="Date of Birth"
                          value={userData.DOB || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="phone">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="Phone Number"
                          value={userData.Phone || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="state">
                        State
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="State"
                          value={userData.state || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="city">
                        City
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="City"
                          value={userData.city || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="gender">
                        Gender
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke pl-3 bg-gray py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="Gender"
                          value={userData.gender || ''}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <Link href={`/UsersPage/`}>
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                        type="button"
                      >
                        Cancel
                      </button>
                    </Link>
                    <Link href={`/UsersPage/${id}/edit`}>
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
                        type="button"
                      >
                        Edit User Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
