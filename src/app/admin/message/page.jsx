"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [messageToShow, setMessageToShow] = useState([]);
  const [message, setMessage] = useState([]);
  const [messagePerPage, setMessagePerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  useEffect(() => {
    let indexOfFirstItem = (currentPage - 1) * messagePerPage;
    let indexOfLastItem = indexOfFirstItem + messagePerPage;
    setMessageToShow(() => message?.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, message, messagePerPage]);
  const fetchMessage = async () => {
    const response = await fetch("/api/message");
    const data = await response.json();
    setMessage(data);
  };
  const rowOption = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 15, value: 15 },
    { label: 20, value: 20 },
  ];
  const handleDelete = async () => {
    let selectedIds = null;
    if (selectedKeys?.size === 0) return;
    if (selectedKeys === "all") {
      let all = new Set(message.map((m) => m._id));
      selectedIds = Array.from(all);
    }
    else {
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

  return (
    <div className="flex mt-20 flex-col  w-full p-10">
      
      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Example table with client side pagination"
        bottomContent={
           message?.length > 0 && <div className="flex w-full justify-between">
            <Pagination
              showControls
              showShadow
              color="primary"
              radius="full"
              page={currentPage}
              variant="light"
              total={Math.ceil(message?.length / messagePerPage)}
              onChange={(page) => setCurrentPage(page)}
            />
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={(e) => {
                  setMessagePerPage(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>}
          
          classNames={{
            wrapper: "min-h-[272px]",
          }}
        >
          <TableHeader>
            <TableColumn key="first">First Name</TableColumn>
            <TableColumn key="last">Last Name</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="message">Message</TableColumn>
            <TableColumn key="phone">Phone Number</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No messages to display."}>
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
     
      {(selectedKeys?.size > 0 || selectedKeys === "all") && (
        <Button onClick={handleDelete} className="max-w-[200px] mt-6" color="danger">
          Delete
        </Button>
      )}
    </div>
  );
}
