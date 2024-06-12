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
  const [messageToShow, setMessageToShow] = useState([]);
  const [message, setMessage] = useState([]);
  const [messagePerPage, setMessagePerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [filterValue, setFilterValue] = useState("");
const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let filteredMessages = message.filter((m) =>
      m.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
      m.lastname.toLowerCase().includes(filterValue.toLowerCase()) ||
      m.email.toLowerCase().includes(filterValue.toLowerCase()) 
     
    );

    let indexOfFirstItem = (currentPage - 1) * messagePerPage;
    let indexOfLastItem = indexOfFirstItem + messagePerPage;
    setMessageToShow(filteredMessages.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, message, messagePerPage, filterValue]);

  const fetchMessage = async () => {
    setLoading(true);
    const response = await fetch("/api/message");
    const data = await response.json();
    console.log(data)
    setMessage(data);
    console.log(message);
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
      let all = new Set(message.map((m) => m._id));
      selectedIds = Array.from(all);
    } else {
      selectedIds = Array.from(selectedKeys);
    }

    try {
      const response = await fetch("/api/message", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        fetchMessage();
        setSelectedKeys(new Set());
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  useEffect(() => {
    fetchMessage();
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
          placeholder="Search by first name, last name or email..."
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
          message?.length > 0 && (
            <div className="flex w-full justify-between">
              <Pagination
                showControls
                showShadow
                color="primary"
                radius="full"
                page={currentPage}
                variant="light"
                total={Math.ceil(
                  message.filter((m) =>
                    m.firstname.toLowerCase().includes(filterValue.toLowerCase()) ||
                    m.lastname.toLowerCase().includes(filterValue.toLowerCase()) ||
                    m.email.toLowerCase().includes(filterValue.toLowerCase()) 
                   
                  ).length / messagePerPage
                )}
                onChange={(page) => setCurrentPage(page)}
              />
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={(e) => {
                    setMessagePerPage(parseInt(e.target.value));
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
          <TableColumn key="first">First Name</TableColumn>
          <TableColumn key="last">Last Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="message">Message</TableColumn>
          <TableColumn key="phone">Phone Number</TableColumn>
        </TableHeader>
        <TableBody isLoading={Loading} loadingContent="Loading..." emptyContent={"No messages to display."}>
          {messageToShow?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.firstname}</TableCell>
              <TableCell>{item?.lastname}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.message}</TableCell>
              <TableCell>{item?.phonenumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
