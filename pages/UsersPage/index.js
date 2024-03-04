import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchUsers } from '../../lib/fetchData';
import { EyeIcon, PencilIcon,TrashIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';


export default function index({users}) {

  
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

const Actions = ({ id}) => (
  <div className="flex items-center space-between">
     <Link href={`/UsersPage/${id}/view`}>
 
        <EyeIcon className="h-4 w-4" />
     
    </Link>
    <Link href={`/UsersPage/${id}/edit`}>

        <PencilIcon className="h-4 w-4 mx-5" />
     
    </Link>
    <Link href={`/UsersPage/${id}/delete`}>
      
        <TrashIcon className="h-4 w-4" />
      
    </Link>
  </div>
);



const CustomTableCell = ({ children, className }) => (
  <TableCell className={`tableCell ${className}`}>{children}</TableCell>
);

  return (
    <div className="min-h-screen">
          <div className="overflow-x-auto max-h-6xl">
       
    <TableContainer component={Paper} className="p-5 flex-1">
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <CustomTableCell>Tracking ID</CustomTableCell>
          <CustomTableCell>User</CustomTableCell>
          <CustomTableCell>Email Address</CustomTableCell>
          <CustomTableCell>Gender</CustomTableCell>
          <CustomTableCell>Phone Number</CustomTableCell>
          <CustomTableCell>State</CustomTableCell>
          <CustomTableCell>Date of Birth</CustomTableCell>
          <CustomTableCell>Actions</CustomTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <CustomTableCell>{user.id}</CustomTableCell>
            <CustomTableCell>
              <CellWrapper image={user.image} fullname={user.fullname} />
            </CustomTableCell>
            <CustomTableCell>{user.email}</CustomTableCell>
            <CustomTableCell>{user.gender}</CustomTableCell>
            <CustomTableCell>{user.Phone}</CustomTableCell>
            <CustomTableCell>{user.state}</CustomTableCell>
            <CustomTableCell> {user.DOB}</CustomTableCell>
            <CustomTableCell>
              <Actions id={user.id} />
            </CustomTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  </div>
  )
}
export async function getServerSideProps() {
  const users = await fetchUsers();

  return {
    props: {
      users,
    },
  };
}
