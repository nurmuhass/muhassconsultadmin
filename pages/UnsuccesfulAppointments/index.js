import React, { useState, useMemo } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {fetchAppoinments, fetchUnSuccessfulAppointments } from '../../lib/fetchData';
import { EyeIcon, PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';


export default function index({UnSuccessfulAppointments}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5); // Set the number of users per page
  

  
    const CustomTableCell = ({ children, className }) => (
      <TableCell className={`tableCell ${className}`}>{children}</TableCell>
    );
  
    const filteredUnSuccessfulAppointments = useMemo(() => {
      return UnSuccessfulAppointments.filter((Appoinment) =>
      Appoinment.bookingrefnum.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [UnSuccessfulAppointments, searchTerm]);
  
    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const AllUnSuccessfulAppointments = filteredUnSuccessfulAppointments.slice(indexOfFirstUser, indexOfLastUser);
  
    // Change page
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };
  return (
    <div className="min-h-screen">
        <p className="flex items-center justify-center text-gray-700 text-3xl mb-16 font-bold">UnSuccessful Appointments</p>
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by Booking REFERENCE NUM "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-3"
        />
      </div>

      <TableContainer component={Paper} className="p-15 flex-1 min-w-screen mx-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableCell>Booking reference Num</CustomTableCell>
              <CustomTableCell>Doctors Email</CustomTableCell>
              <CustomTableCell> Patients Email</CustomTableCell>
              <CustomTableCell>Consultation Date</CustomTableCell>
              <CustomTableCell>Time Slot</CustomTableCell>
              <CustomTableCell>Payment Status</CustomTableCell>
              <CustomTableCell>Action</CustomTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {AllUnSuccessfulAppointments.map((Appoinment) => (
              <TableRow key={Appoinment.id}>
                <CustomTableCell>{Appoinment.bookingrefnum}</CustomTableCell>
                <CustomTableCell>{Appoinment.doctorsData.email}</CustomTableCell>
                <CustomTableCell>{Appoinment.patientsData.email}</CustomTableCell>
                <CustomTableCell>{Appoinment.selectedTimeSlot === null ? Appoinment.Date :Appoinment.selectedDay + ' ' + Appoinment.Date }</CustomTableCell>
                <CustomTableCell>{Appoinment.selectedTimeSlot === null ? Appoinment.timeSlot : Appoinment.selectedTimeSlot}</CustomTableCell>
                <CustomTableCell>
                    <div className={`px-2 py-1 rounded ${Appoinment.paid === true ? 'text-green-500 bg-green-100' : 'text-yellow-600 bg-yellow-100'}`}>
                    {Appoinment.paid === false ? "Not Paid" : "Paid"}
                    </div>
                </CustomTableCell>
                <CustomTableCell> 
                 <Link href={`/UnsuccesfulAppointments/${Appoinment.id}/edit`}>
                     <PencilSquareIcon className="h-4 w-4 mx-5" />
                 </Link>
               </CustomTableCell>
       
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        className="mt-3 justify-content-center"
        count={Math.ceil(filteredUnSuccessfulAppointments.length / usersPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>

  </div>
  )
}
export async function getServerSideProps() {
    const UnSuccessfulAppointments = await fetchUnSuccessfulAppointments();
  
    return {
      props: {
        UnSuccessfulAppointments,
      },
    };
  }
  