import React, { useState, useMemo } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchEmployees, deleteEmployeeById} from '../../lib/fetchData';
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';

export default function Index({ Employees }) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [EmployeesPerPage] = useState(5); // Set the number of Employees per page

  const openDeleteModal = (EmployeeId) => {
    setSelectedEmployeeId(EmployeeId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedEmployeeId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteEmployeeById(selectedEmployeeId);
      closeDeleteModal();
      // Optionally, you can refresh the Employees list after deletion
      const updatedEmployees = await fetchEmployees();
      fetchEmployees();
      // Update the state or re-fetch the data
    } catch (error) {
      console.error('Error deleting Employee:', error);
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
      <Link href={`/Employees/${id}/view`}>
        <EyeIcon className="h-4 w-4" />
      </Link>
      <Link href={`/Employees/${id}/edit`}>
        <PencilIcon className="h-4 w-4 mx-5" />
      </Link>
      <TrashIcon className="h-4 w-4 cursor-pointer" onClick={() => openDeleteModal(id)} />
    </div>
  );

  const CustomTableCell = ({ children, className }) => (
    <TableCell className={`tableCell ${className}`}>{children}</TableCell>
  );

  const filteredEmployees = useMemo(() => {
    return Employees.filter((Employee) =>
    Employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [Employees, searchTerm]);

  // Get current Employees
  const indexOfLastEmployee = currentPage * EmployeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - EmployeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <div>
        <Link href={`/Employees/addEmployee/`}>
          <button
            className="flex rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-auto mr-5 mb-5"
            type="button"
          >
            Add New Employee
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
                <CustomTableCell>Employee</CustomTableCell>
                <CustomTableCell>Email address</CustomTableCell>
                <CustomTableCell>Gender</CustomTableCell>
                <CustomTableCell>Phone Number</CustomTableCell>
                <CustomTableCell>Actions</CustomTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentEmployees.map((Employee) => (
                <TableRow key={Employee.id}>
                  <CustomTableCell>{Employee.id}</CustomTableCell>
                  <CustomTableCell>
                    <CellWrapper image={Employee.image} fullname={Employee.fullname} />
                  </CustomTableCell>
                  <CustomTableCell>{Employee.email}</CustomTableCell>
                  <CustomTableCell>{Employee.gender}</CustomTableCell>
                  <CustomTableCell>{Employee.Phone}</CustomTableCell>
                  <CustomTableCell>
                    <Actions id={Employee.id} />
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          className="mt-3 justify-content-center"
          count={Math.ceil(filteredEmployees.length / EmployeesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to delete this Employee?</p>
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
    </div>
  );
}

export async function getServerSideProps() {
  const Employees = await fetchEmployees();

  return {
    props: {
      Employees,
    },
  };
}
