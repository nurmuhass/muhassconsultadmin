import React, { useState, useMemo } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fetchcategories, deletecategoryById} from '../../lib/fetchData';
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import Pagination from '@mui/material/Pagination';

export default function Index({ categories }) {
  const [selectedcategoryId, setSelectedcategoryId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10); // Set the number of categories per page

  const openDeleteModal = (categoryId) => {
    setSelectedcategoryId(categoryId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedcategoryId(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deletecategoryById(selectedcategoryId);
      closeDeleteModal();
      // Optionally, you can refresh the categories list after deletion
      const updatedcategories = await fetchcategories();
      fetchcategories();
      // Update the state or re-fetch the data
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error
    }
  };



  const CellWrapper = ({ image}) => (
    <div className="flex items-center">
      <img src={image} alt="" className="w-8 h-8 rounded-full mr-2 object-cover" />
    </div>
  );

  const Actions = ({ id }) => (
    <div className="flex items-center space-between">
      <Link href={`/categories/${id}/view`}>
        <EyeIcon className="h-4 w-4" />
      </Link>
      <Link href={`/categories/${id}/edit`}>
        <PencilIcon className="h-4 w-4 mx-5" />
      </Link>
      <TrashIcon className="h-4 w-4 cursor-pointer" onClick={() => openDeleteModal(id)} />
    </div>
  );

  const CustomTableCell = ({ children, className }) => (
    <TableCell className={`tableCell ${className}`}>{children}</TableCell>
  );

  const filteredcategories = useMemo(() => {
    return categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Get current categories
  const indexOfLastcategory = currentPage * categoriesPerPage;
  const indexOfFirstcategory = indexOfLastcategory - categoriesPerPage;
  const currentcategories = filteredcategories.slice(indexOfFirstcategory, indexOfLastcategory);

  // Change page
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <div>
        <Link href={`/categories/addCategory/`}>
          <button
            className="flex rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90 ml-auto mr-5 mb-5"
            type="button"
          >
            Add New category
          </button>
        </Link>

        <div>
          <input
            type="text"
            placeholder="Search by Cat Title"
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
                <CustomTableCell>category Tile</CustomTableCell>
                <CustomTableCell>Image</CustomTableCell>
                <CustomTableCell>Actions</CustomTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentcategories.map((category) => (
                <TableRow key={category.id}>
                  <CustomTableCell>{category.id}</CustomTableCell>
                  <CustomTableCell>{category.title}</CustomTableCell>
                  <CustomTableCell>
                    <CellWrapper image={category.image}  />
                  </CustomTableCell>
                  <CustomTableCell>
                    <Actions id={category.id} />
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Pagination
          className="mt-3 justify-content-center"
          count={Math.ceil(filteredcategories.length / categoriesPerPage)}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md">
            <p>Are you sure you want to delete this category?</p>
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
  const categories = await fetchcategories();

  return {
    props: {
      categories,
    },
  };
}
