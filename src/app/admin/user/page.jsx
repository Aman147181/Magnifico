"use client";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [userToShow, setuserToShow] = useState([]);
  const [user, setuser] = useState([]);
  const [userPerPage, setuserPerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [filterValue, setFilterValue] = useState("");
const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let filteredusers = user.filter((u) =>
      u.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      u.email.toLowerCase().includes(filterValue.toLowerCase()) 
     
    );

    let indexOfFirstItem = (currentPage - 1) * userPerPage;
    let indexOfLastItem = indexOfFirstItem + userPerPage;
    setuserToShow(filteredusers.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, user, userPerPage, filterValue]);

  const fetchuser = async () => {
    setLoading(true);
    const response = await fetch("/api/users");
    const data = await response.json();
    setuser(data);
    setLoading(false);
  };

  const rowOption = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
   
  ];

  const handleDelete = async () => {
    let selectedIds = null;
    if (selectedKeys?.size === 0) return;
    if (selectedKeys === "all") {
      let all = new Set(user.map((m) => m._id));
      selectedIds = Array.from(all);
    } else {
      selectedIds = Array.from(selectedKeys);
    }

    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        fetchuser();
        setSelectedKeys(new Set());
      }
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);

  const onSearchChange = (value) => {
    setFilterValue(value);
    setCurrentPage(1); 
  };

  const onClear = () => {
    setFilterValue("");
    setCurrentPage(1); 
  };

  return (
    <div className="flex mt-20 flex-col w-full p-10">
      <div className="flex justify-between w-full mb-3 items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by username or email..."
          startContent={<FaSearch />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        {(selectedKeys?.size > 0 || selectedKeys === "all") && (
          <Button onClick={handleDelete} className="max-w-[200px] mt-6" color="danger">
            Delete
          </Button>
        )}
      </div>
      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        isHeaderSticky
        onSelectionChange={setSelectedKeys}
        aria-label="Example table with client-side pagination"
        bottomContent={
          user?.length > 0 && (
            <div className="flex w-full justify-between">
              <Pagination
                showControls
                showShadow
                color="primary"
                radius="full"
                page={currentPage}
                variant="light"
                total={Math.ceil(
                  user.filter((m) =>
                    m.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                    m.email.toLowerCase().includes(filterValue.toLowerCase()) 
                   
                  ).length / userPerPage
                )}
                onChange={(page) => setCurrentPage(page)}
              />
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={(e) => {
                    setuserPerPage(parseInt(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  {rowOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )
        }
        classNames={{
          wrapper: "min-h-[272px] max-h-[560px] overflow-y-auto",
           
        }}
      >
        <TableHeader>
        <TableColumn key="id">Id</TableColumn>

          <TableColumn key="first">Username</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="role">Role</TableColumn>
        </TableHeader>
        <TableBody isLoading={Loading} loadingContent="Loading..." emptyContent={"No users to display."}>
          {userToShow?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>{item?._id}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.role}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
