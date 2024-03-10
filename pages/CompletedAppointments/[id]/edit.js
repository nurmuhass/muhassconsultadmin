import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchAppointmentById} from '../../../lib/fetchData';
import Link from 'next/link';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function edit() {
  const router = useRouter();
  const { id } = router.query;
  const [AppoinmentData, setAppoinmentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchAppointmentById(id);
        setAppoinmentData(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handlePaymentStatusUpdate = async () => {
    try {
      setLoading(true);

      // Update the status to "Paid" in your Firestore database
      const successfulAppointmentRef = doc(db, 'SuccessfulAppointments', id);
      await updateDoc(successfulAppointmentRef, { paid: true });

      console.log('Status updated to Paid successfully');
      router.push(`/CompletedAppointments/`);
    } catch (error) {
      console.error('Error updating status to Paid:', error);
    } finally {
      setLoading(false);
    }
  };


  if (!AppoinmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <main>
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <div className="mx-auto max-w-270">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-bold text-black dark:text-black">
                View Appointment - {id}
              </h2>
              <nav>
                <ol className="flex items-center gap-2">
                  <li>
                    <a className="font-medium" href="">
                      Dashboard /
                    </a>
                  </li>
                  <li className="font-medium text-primary">View Appointment</li>
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
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black">
                      Patients Full Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-5 py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={AppoinmentData.fullname === '' ? AppoinmentData.patientsData.fullname : AppoinmentData.fullname }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black">
                      Patients  Email
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={AppoinmentData.patientsData.email }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    
                          value={AppoinmentData.age === '' ? AppoinmentData.patientsData.DOB : AppoinmentData.age }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
                        Patients Medical Condition
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          value={AppoinmentData.medicalCondition}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black">
                        Gender
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                
                          value={AppoinmentData.gender === '' ? AppoinmentData.patientsData.gender : AppoinmentData.gender }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black">
                       Doctors FullName
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray pl-3 py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                       
                          value={AppoinmentData.doctorsData.fullname || ''}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" htmlFor="gender">
                        Doctors Email
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke pl-3 bg-gray py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      
                          value={AppoinmentData.doctorsData.email || ''}
                          disabled 
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
                        Doctors Phone
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke pl-3 bg-gray py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      
                          value={AppoinmentData.doctorsData.Phone }
                          disabled 
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
                       Appoinment Date
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke pl-3 bg-gray py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      
                          value={AppoinmentData.selectedTimeSlot === null ? AppoinmentData.Date :AppoinmentData.selectedDay + ' ' + AppoinmentData.Date }
                          disabled 
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-black" >
                        Appoinment TimeSlot
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke pl-3 bg-gray py-3 pr-4.5 font-medium text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      
                          value={AppoinmentData.selectedTimeSlot === null ? AppoinmentData.timeSlot : AppoinmentData.selectedTimeSlot}
                          disabled 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5 mt-5">
                    <Link href={`/CompletedAppointments/`}>
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-black"
                        type="button"
                      >
                        Back
                      </button>
                    </Link>
                    {AppoinmentData.paid === true ?       
                    
                  null
                    
                    :
              
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-5"
                      type="button"
                      onClick={handlePaymentStatusUpdate}
                      disabled={loading}
                    >
                       {loading ? 'Updating...' : 'Change Status to Paid'}
                    </button>
         
                    
                    }
                  
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
