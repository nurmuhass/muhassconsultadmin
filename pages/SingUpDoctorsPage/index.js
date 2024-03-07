import React, { useState,useMemo } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {  deleteUserById } from '../../lib/fetchData';
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { fetchSingUpDoctors } from "../../lib/fetchData";
import Pagination from '@mui/material/Pagination';

export default function SingUpDoctorsPage({ SingUpDoctors }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set the number of items per page



  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUserById(selectedUserId);
      closeDeleteModal();
      // Optionally, you can refresh the users list after deletion
      const updatedUsers = await fetchUsers();
      fetchUsers();
      // Update the state or re-fetch the data
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error
    }
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2 py-1 rounded ${status === 'Approved' ? 'text-green-500 bg-green-100' : 'text-yellow-600 bg-yellow-100'}`}>
      {status}
    </span>
  );

  const CellWrapper = ({ image, fullname }) => (
    <div className="flex items-center">
      <img src={image} alt="" className="w-8 h-8 rounded-full mr-2 object-cover" />
      {fullname}
    </div>
  );

  const Actions = ({ id }) => (
    <div className="flex items-center space-between">
     
    <Link href={`/SingUpDoctorsPage/${id}/verify`}>
      <button
        className="flex rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-auto mr-5 mb-5"
        type="button"
      >
        Verify
      </button>
    </Link>
    </div>
  );

  const CustomTableCell = ({ children, className }) => (
    <TableCell className={`tableCell ${className}`}>{children}</TableCell>
  );

  const filteredSingUpDoctors = useMemo(() => {
    return SingUpDoctors.filter((SingUpDoctor) =>
    SingUpDoctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [SingUpDoctors, searchTerm]);
  

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSingUpDoctors = filteredSingUpDoctors.slice(startIndex, endIndex); 


  return (
     <div className="min-h-screen">
     
{SingUpDoctors.length <1  ?
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="text-center">
    <p class="text-gray-700 text-3xl mb-10 font-bold">They are no New SignUp Doctors</p>
    <span class="text-6xl font-bold">😟</span>
  </div>
</div>
:
<>

<div>
  <Link href={`/UsersPage/adduser/`}>
    <button
      className="flex rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-auto mr-5 mb-5"
      type="button"
    >
      Add New User
    </button>
  </Link>
  

<div>
<input
    type="text"
    placeholder="Search by Email"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border p-2 mb-3"
  />
</div>

        <TableContainer component={Paper} className="p-15 flex-1 min-w-screen mx-0">
          <Table aria-label="simple table">
          <TableHead>
        
  <TableRow>
    <CustomTableCell>Tracking ID</CustomTableCell>
    <CustomTableCell>User</CustomTableCell>
    <CustomTableCell>
   Email address
    </CustomTableCell>
    <CustomTableCell>Gender</CustomTableCell>
    <CustomTableCell>Phone Number</CustomTableCell>
    <CustomTableCell>Actions</CustomTableCell>
  </TableRow>
</TableHead>

            <TableBody>
    {paginatedSingUpDoctors.map((SingUpDoctor) => (
                <TableRow key={SingUpDoctor.id}>
                  <CustomTableCell>{SingUpDoctor.id}</CustomTableCell>
                  <CustomTableCell>
                    <CellWrapper image={SingUpDoctor.image} fullname={SingUpDoctor.fullname} />
                  </CustomTableCell>
                  <CustomTableCell>{SingUpDoctor.email}</CustomTableCell>
                  <CustomTableCell>{SingUpDoctor.gender}</CustomTableCell>
                  <CustomTableCell>{SingUpDoctor.Phone}</CustomTableCell>
                  <CustomTableCell>
                    <Actions id={SingUpDoctor.id} />
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableContainer className="mx-0">
        <Pagination
          count={Math.ceil(filteredSingUpDoctors.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </TableContainer>
          </Table>
        </TableContainer>
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleDelete}>
                Yes
              </button>
              <button className="bg-gray-200 text-black px-4 py-2 rounded-md" onClick={closeDeleteModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

</>

}

    </div>
  );
}

export async function getServerSideProps() {
  const SingUpDoctors = await fetchSingUpDoctors();

  return {
    props: {
      SingUpDoctors,
    },
  };
}
