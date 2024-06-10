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
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

import Image from "next/image";
import VillaAddForm from "@/app/(notAdmin)/components/VillaUpload";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [villaToShow, setvillaToShow] = useState([]);
  const [villa, setvilla] = useState([]);
  const [villaPerPage, setvillaPerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  useEffect(() => {
    let indexOfFirstItem = (currentPage - 1) * villaPerPage;
    let indexOfLastItem = indexOfFirstItem + villaPerPage;
    setvillaToShow(() => villa?.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, villa, villaPerPage]);
  const fetchvilla = async () => {
    const response = await fetch("/api/villa");
    const data = await response.json();
    setvilla(data);
  };
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    let filteredvillas = villa.filter((m) =>
      m.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      m.location.toLowerCase().includes(filterValue.toLowerCase()) 
     
    );

    let indexOfFirstItem = (currentPage - 1) * villaPerPage;
    let indexOfLastItem = indexOfFirstItem + villaPerPage;
    setvillaToShow(filteredvillas.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, villa, villaPerPage, filterValue]);
  const onSearchChange = (value) => {
    setFilterValue(value);
    setCurrentPage(1); 
  };

  const onClear = () => {
    setFilterValue("");
    setCurrentPage(1); 
  };
  const rowOption = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
   
  ];
  const handleDelete = async () => {
    let selectedIds = null;
    if (selectedKeys?.size === 0) return;
    if (selectedKeys === "all") {
      let all = new Set(villa.map((m) => m._id));
      selectedIds = Array.from(all);
    }
    else {
      selectedIds = Array.from(selectedKeys);
    }

    try {
      const response = await fetch("/api/villa", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        fetchvilla();
        setSelectedKeys(new Set());
      }
    } catch (error) {
      console.error("Error deleting villas:", error);
    }
  };

  useEffect(() => {
    fetchvilla();
  }, []);

  return (
    <div className="flex mt-20 flex-col  w-full p-10">
      <Button color="primary" className="max-w-32 mb-3" onPress={onOpen}>
        Add Villa 
      </Button>
      <Modal
        size="4xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <VillaAddForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex justify-between w-full mb-3 items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name or location..."
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
        onSelectionChange={setSelectedKeys}
        aria-label="Example table with client side pagination"
        bottomContent={
          villa?.length > 0 && (
            <div className="flex w-full justify-between">
             <Pagination
                showControls
                showShadow
                color="primary"
                radius="full"
                page={currentPage}
                variant="light"
                total={Math.ceil(
                  villa.filter((m) =>
                    m.name.toLowerCase().includes(filterValue.toLowerCase()) ||
                    m.location.toLowerCase().includes(filterValue.toLowerCase()) 
                    
                   
                  ).length / villaPerPage
                )}
                onChange={(page) => setCurrentPage(page)}
              />
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={(e) => {
                    setvillaPerPage(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
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
          <TableColumn key="image"> Image</TableColumn>
          <TableColumn key="name"> Name</TableColumn>
          <TableColumn key="description">Description</TableColumn>
          <TableColumn key="location">location</TableColumn>
          <TableColumn key="pricePerNight">Price per night</TableColumn>
          <TableColumn key="people">No. of people</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No villas to display."}>
          {villaToShow?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>
                <Image
                  radius="xl"
                  src={item?.images[0]}
                  alt="villa"
                  width={70}
                  height={70}
                />
              </TableCell>
              <TableCell>{item?.name}</TableCell>

              <TableCell>{item?.description}</TableCell>

              <TableCell>{item?.location}</TableCell>
              <TableCell>{item?.pricePerNight}</TableCell>
              <TableCell>{item?.people}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
