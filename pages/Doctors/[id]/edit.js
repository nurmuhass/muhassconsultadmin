import React from 'react'
// pages/users/[id]/edit.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetcDoctorsById, updateDoctorData, uploadImage } from '../../../lib/fetchData';
import Link from 'next/link';


const Modal = ({ imageUrl, closeModal }) => (
    <div
      id="myModal"
      className="fixed top-0 left-0 w-half h-half bg-black bg-opacity-90 flex justify-center items-center z-50"
    >
      <div className="modal-content relative max-w-2/4 max-h-1/4" onClick={(e) => e.stopPropagation()}>
        {/* Cancel icon in the top right corner */}
        <span
          id="cancelIcon"
          className="cancel-icon text-white text-3xl cursor-pointer absolute top-0 right-0"
          onClick={closeModal}
        >
          &times;
        </span>
        <img
          id="modalImg"
          src={imageUrl}
          alt="Full-size Image"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
  
  

  
export default function edit() {
    const router = useRouter();
    const { id } = router.query;
    const [userData, setUserData] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');
   
    
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [editableTimeSlot, setEditableTimeSlot] = useState('');

  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day ? null : day);
    setSelectedTimeSlot(null);
    setEditableTimeSlot(''); // Reset editable time slot when a new day is clicked
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTimeSlot(selectedTimeSlot === time ? null : time);
    setEditableTimeSlot(''); // Reset editable time slot when a time slot is clicked
  };

  const handleEditableTimeSlotChange = (event) => {
    setEditableTimeSlot(event.target.value);
  };
  
    const openModal = (imageUrl) => {
      setModalImageUrl(imageUrl);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const user = await fetcDoctorsById(id);
            setUserData(user);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        if (id) {
          fetchData();
        }
      }, [id]);
    
      useEffect(() => {
        const cancelIcon = document.getElementById("cancelIcon");
        if (cancelIcon) {
          cancelIcon.addEventListener("click", closeModal);
      
          return () => {
            cancelIcon.removeEventListener("click", closeModal);
          };
        }
      }, []); // Empty dependency array ensures it runs once after mount
  
      const handleChange = (field, value) => {
        setUserData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
      };
    
    
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
      await updateDoctorData(id, updatedUserData);
      router.push(`/Doctors/${id}/view`);
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setLoading(false);
    }
  };
      
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
      };
    
      if (!userData) {
        return <div>Loading...</div>;
      }

      let availableDays
      if(userData){
        const {
          isCheckedSun,
          isCheckedMon,
          isCheckedTue,
          isCheckedWed,
          isCheckedThurs,
          isCheckedFri,
          isCheckedSat,
          timeSlotsSun,
          timeSlotsMon,
          timeSlotsTue,
          timeSlotsWed,
          timeSlotsThurs,
          timeSlotsFri,
          timeSlotsSat,
        } = userData;
        
         availableDays = [
          { day: 'Sunday', isChecked: isCheckedSun, timeSlots: timeSlotsSun },
          { day: 'Monday', isChecked: isCheckedMon, timeSlots: timeSlotsMon },
          { day: 'Tuesday', isChecked: isCheckedTue, timeSlots: timeSlotsTue },
          { day: 'Wednesday', isChecked: isCheckedWed, timeSlots: timeSlotsWed },
          { day: 'Thursday', isChecked: isCheckedThurs, timeSlots: timeSlotsThurs },
          { day: 'Friday', isChecked: isCheckedFri, timeSlots: timeSlotsFri },
          { day: 'Saturday', isChecked: isCheckedSat, timeSlots: timeSlotsSat },
        ];
      
      }
 
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
            Edit Doctor - {id}
            </h2>
            <nav>
              <ol className="flex items-center gap-2">
                <li>
                  <a className="font-medium" href="">Dashboard /</a>
                </li>
                <li className="font-medium text-primary">Edit Doctor</li>
              </ol>
            </nav>
          </div>
  
           {/* Modal for displaying full-size image */}
           {isModalOpen && (
        <Modal imageUrl={modalImageUrl} closeModal={closeModal} />
      )}

          <div className="col-span-2 sm:col-span-1">
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-black">
        Personal Information
      </h3>
    </div>
    <div className="p-7">

      <div class="col-span-2 sm:col-span-1">
              {/* Add your image upload section here */}
              {/* Example: */}
              <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div class="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 class="font-medium text-black dark:text-black">
                  Edit photo
                  </h3>
                </div>
                <div class="p-7">
                  {/* Your image upload UI here */}
                  {/* Example: */}
                  <div class="mb-4 flex items-center gap-3">
                  <div className="h-14 w-14 mb-5"  onClick={() => openModal(userData.image)}>
                    <img src={imageFile ? URL.createObjectURL(imageFile) : userData.image} alt="User" className='rounded-full'/>
                    </div>
                  
                  </div>
  
                  {/* Your file upload input */}
                  {/* Example: */}
                  <div id="FileUpload" class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5 mt-10">
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
      

      <div className="grid grid-cols-2 gap-8">
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="fullName">Full Name</label>
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
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="email">Email</label>
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
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="DOB">Date of Birth</label>
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
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="phone">Phone Number</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-3 py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Phone Number"
              value={userData.Phone}
              onChange={(event) => handleChange('Phone', event.target.value)} 
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="state">State</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="State"
              value={userData.state}
              onChange={(event) => handleChange('state', event.target.value)}
              
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="city">City</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="City"
              value={userData.city}
              onChange={(event) => handleChange('city', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="gender">Address</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke pl-3 bg-gray py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Address"
              value={userData.address}
              onChange={(event) => handleChange('address', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="gender">Gender</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke pl-3 bg-gray py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Gender"
              value={userData.gender}
              onChange={(event) => handleChange('gender', event.target.value)}
            />
          </div>
        </div>

      </div>

      <div className="w-full mt-5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="bio">Bio</label>
          <div className="relative">
            <textarea
              className="w-full rounded border border-stroke pl-3 bg-gray py-6  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Bio"
              value={userData.bio}
              onChange={(event) => handleChange('bio', event.target.value)}
            />
          </div>
        </div>

   
    </div>

    <div className="col-span-2 sm:col-span-1">
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-black">
        Doctor`s Information
      </h3>
    </div>
    <div className="p-7">
      <div className="grid grid-cols-2 gap-8">

{/* second */}

<div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Category">Category</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Category"
              value={userData.category}
              onChange={(event) => handleChange('category', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Clinic">Clinic</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Clinic"
              value={userData.clinic}
              onChange={(event) => handleChange('clinic', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Licence Number">Licence Number</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Licence Number"
              value={userData.license}
              onChange={(event) => handleChange('licence', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Years of Experience">Years of Experience</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Years of Experience"
              value={userData.y_exp}
              onChange={(event) => handleChange('y_exp', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Availability">Availability</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray py-3  pl-3 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Availability"
              value={userData.Availability}
              onChange={(event) => handleChange('Availability', event.target.value)}
            />
          </div>
        </div>
   
   
      
     </div>  


      </div>
         </div>
           </div>



  <div className="col-span-2 sm:col-span-1">
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-black">
        Service Types
      </h3>
    </div>
    <div className="p-7">
      <div className="grid grid-cols-2 gap-8">

{/* second */}

        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Phone Consultation">Phone Consultation</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-3 py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Phone Consultation"
              value={userData.isEnabledPhone}
              onChange={(event) => handleChange('isEnabledPhone', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Video Consultation">Video Consultation</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Video Consultation"
              value={userData.isEnabledVideo}
              onChange={(event) => handleChange('isEnabledVideo', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Text Consultation">Text Consultation</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Text Consultation"
              value={userData.isEnabledText}
              onChange={(event) => handleChange('isEnabledText', event.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <label className="mb-3 block text-sm font-medium text-black dark:text-black" for="Actual Visit Consultation">Actual Visit Consultation</label>
          <div className="relative">
            <input
              className="w-full rounded border border-stroke pl-3 bg-gray py-3  pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              placeholder="Actual Visit Consultation"
              value={userData.isEnabledVisit}
              onChange={(event) => handleChange('address', event.target.value)}
            />
          </div>
        </div>
      
     </div>  

    

      </div>
         </div>
           </div>







  </div>
</div>

            <div className="col-span-2 sm:col-span-1">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-black">
                   Doctors's Schedule
                  </h3>
                </div>
               
                <div className="p-7">
             

                 
        <>
      <h1 className="text-4xl font-bold mb-4 text-center">Available Slots</h1>
      <div className="mb-4 text-center">
        <p className="text-lg font-bold">Select Date</p>
        <div className="flex flex-wrap justify-center">
          {availableDays.map(({ day, timeSlots }) => (
            <div key={day} className="w-1/2">
              <button
                onClick={() => handleDayClick(day)}
                className={`p-2 border ${
                  selectedDay === day ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {day}
              </button>
            </div>
          ))}
        </div>
      </div>

      {availableDays.map(({ day, timeSlots }) => (
        <div key={day} className="">
          {selectedDay === day && (
            <div>
              <p className="text-lg font-bold mb-2">Select Time</p>
              {timeSlots.map((time, index) => (
                <button
                  key={`${day}-${index}`}
                  onClick={() => handleTimeSlotClick(time)}
                  className={`p-2 border ${
                    selectedTimeSlot === time ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </>


                    <div className="flex justify-end gap-4.5">
                    <Link href={`/Doctors/`}>
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
