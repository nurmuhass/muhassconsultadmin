import React from 'react';
import {  useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import { fetchCategoryById} from '../../../lib/fetchData';
import Link from 'next/link';

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  const [categoryData, setcategoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await fetchCategoryById(id);
        setcategoryData(category);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);


  if (!categoryData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen">
    <main>
      <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div class="mx-auto max-w-270">
          <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-title-md2 font-bold text-black dark:text-black">
              View category Page - {id}
            </h2>
            <nav>
              <ol class="flex items-center gap-2">
                <li>
                  <a class="font-medium" href="">Dashboard /</a>
                </li>
                <li class="font-medium text-primary">View category</li>
              </ol>
            </nav>
          </div>
  
         
          <div class="col-span-2 sm:col-span-1">
  <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
   
    <div class="p-7">
      <div class="grid grid-cols-2 gap-8">
        <div class="w-full">
          <label class="mb-3 block text-sm font-medium text-black dark:text-black" for="fullName">Full Name</label>
          <div class="relative">
            <input
              class="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Title"
              value={categoryData.title}
              onChange={(event) => handleChange('title', event.target.value)}
              disabled
            />
          </div>
        </div>

        <div className="w-full">
  <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="Image">
  Image
  </label>
  <div className="relative">
  <img src={categoryData.image} alt="cat"  className='rounded-half w-300'/>
  </div>
 
</div>
      </div>

      <div class="flex justify-end gap-4.5 mt-5">
      <Link href={`/categories/`}>
        <button
          class="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
          type="button"
          
        >
       
          Cancel
        </button>
        </Link>
        <Link href={`/categories/${id}/edit`}>
        <button
          class="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
          type="button" >
          Edit Cat
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
