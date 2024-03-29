import { forwardRef } from "react";
import Link from "next/link";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import MedicationIcon from '@mui/icons-material/Medication';
import MasksIcon from '@mui/icons-material/Masks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-1 mb-1">
        <picture>
          <img className="w-52 h-auto" src="/MUHASSCONSULT.PNG" alt="company logo" />
        </picture>
       
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
        <Link href="/Appointments">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Appoinments"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <CalendarMonthIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Appoinments</p>
            </div>
          </div>
        </Link>
        <Link href="/SingUpDoctorsPage">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/SingUpDoctorsPage"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <MedicationIcon className="h-5 w-5" />
            </div>
            <div>
              <p>SingUpDoctors</p>
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

        <Link href="/Doctors">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Doctors"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <MasksIcon  className="h-6 w-6" />
            </div>
            <div>
              <p>Doctors</p>
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
        
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
