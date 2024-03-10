'use client';
import { forwardRef, useState } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon ,CalendarIcon,NewspaperIcon} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import MedicationIcon from '@mui/icons-material/Medication';
import MasksIcon from '@mui/icons-material/Masks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();
  const [isAppointmentsOpen, setAppointmentsOpen] = useState(false);
  const [isDoctorsOpen, setDoctorsOpen] = useState(false);

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-0 mb-0">
   
       
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        
      
        <Link href="/Employees">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Employees"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Employees</p>
            </div>
          </div>
        </Link>
     

        <Link href="/blogs">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/blogs" || router.pathname == "/blogs/addblog"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <NewspaperIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Blog</p>
            </div>
          </div>
        </Link>
      
        <Link href="/UsersPage">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/UsersPage"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
            <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>UsersPage</p>
            </div>
          </div>
        </Link>

       

    
        <Link href="/failedRequest">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/failedRequest"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Failed Request</p>
            </div>
          </div>
        </Link>
        
   {/* Appointments Dropdown */}
   <div className="relative group">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors group ${isAppointmentsOpen ? "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}`}
            onClick={() => setAppointmentsOpen(!isAppointmentsOpen)}
          >
            <div className="mr-2">
              <CalendarMonthIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Appointments</p>
            </div>
          </div>
          {isAppointmentsOpen && (
            <div className="absolute bg-white rounded shadow-md mt-2 ml-2 py-1">
              <Link href="/Appointments">
                <div className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${router.pathname == "/Appointments" && "bg-orange-100 text-orange-500"}`}>
                  All Appointments
                </div>
              </Link>
              <Link href="/CompletedAppointments">
                <div className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${router.pathname == "/CompletedAppointments" && "bg-orange-100 text-orange-500"}`}>
                  Successful App
                </div>
              </Link>
              <Link href="/UnsuccesfulAppointments">
                <div className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${router.pathname == "/UnsuccesfulAppointments" && "bg-orange-100 text-orange-500"}`}>
                  Unsuccessful App
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Doctors Dropdown */}
        <div className="relative group">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors group ${isDoctorsOpen ? "bg-orange-100 text-orange-500" : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"}`}
            onClick={() => setDoctorsOpen(!isDoctorsOpen)}
          >
            <div className="mr-2">
              <MasksIcon className="h-6 w-6" />
            </div>
            <div>
              <p>Doctors</p>
            </div>
          </div>
          {isDoctorsOpen && (
            <div className="absolute bg-white rounded shadow-md mt-2 ml-2 py-1">
              <Link href="/Doctors">
                <div className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${router.pathname == "/Doctors" && "bg-orange-100 text-orange-500"}`}>
                  All Doctors
                </div>
              </Link>
              <Link href="/SingUpDoctorsPage">
                <div className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${router.pathname == "/SingUpDoctorsPage" && "bg-orange-100 text-orange-500"}`}>
                  SignUpDoctors
                </div>
              </Link>
            </div>
          )}
        </div>



      </div>
    </div>
  ); 
});

SideBar.displayName = "SideBar";

export default SideBar;
