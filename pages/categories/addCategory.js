import {  useRouter } from 'next/router';
import { useState } from 'react';
import { uploadCategoryImage, addNewcategory } from '../../lib/fetchData';
import Link from 'next/link';

const Addcategory = () => {
  const router = useRouter();
  const [categoryData, setcategoryData] = useState({
    title: '',
    image: null, // Change this if you have a default image for new categories
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddcategory = async () => {
    try {
      setLoading(true);

      let imageUrl = null;

      if (imageFile) {
        // Assuming you have a function to handle image uploads
        imageUrl = await uploadCategoryImage(imageFile);
      } else {
        // If no image selected, you may want to set a default image URL here
        imageUrl = categoryData.image || ''; // Change this if you have a default image for new categories
      }

      // Prepare the new category data
      const newcategory = {
        ...categoryData,
        image: imageUrl,
      };

      // Add the new category to the database
      await addNewcategory(newcategory);

      router.push(`/categories`); // Redirect to the category list page
    } catch (error) {
      console.error('Error adding new category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setcategoryData((prevData) => ({
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
                Add New category
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                  <Link href={`/categoriesPage/`}>
                     
                    </Link>
                  </li>
                  <li className="font-medium text-primary">Add category</li>
                </ol>
              </nav>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
               
                <div className="p-7">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="fullName">
                        Title
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          placeholder="Title"
                          value={categoryData.title}
                          onChange={(event) => handleChange('title', event.target.value)}
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
  <img src={ imageFile ?  URL.createObjectURL(imageFile) : null} alt="cat"  className='rounded-half'/>
</div>

                  </div>

                  <div className="flex justify-end gap-4.5 mt-5">
                    <Link href="/categories">
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
                      onClick={loading ? null : handleAddcategory}
                    >
                      {loading ? 'Adding...' : 'Add category'}
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

export default Addcategory;
