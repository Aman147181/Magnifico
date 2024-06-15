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
import { toast } from "react-toastify";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";


export default function App() {
const [selectedStatus, setSelectedStatus] = useState("pending");

  const status = ["pending", "confirmed", "cancelled"];
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationToShow, setreservationToShow] = useState([]);
  const [reservation, setreservation] = useState([]);
  const [reservationPerPage, setreservationPerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [filterValue, setFilterValue] = useState("");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let filteredreservations = reservation.filter(
      (m) =>
        m.username.toLowerCase().includes(filterValue.toLowerCase()) ||
        m.villa.toLowerCase().includes(filterValue.toLowerCase())
    );

    let indexOfFirstItem = (currentPage - 1) * reservationPerPage;
    let indexOfLastItem = indexOfFirstItem + reservationPerPage;
    setreservationToShow(
      filteredreservations.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [currentPage, reservation, reservationPerPage, filterValue]);

  const fetchreservation = async () => {
    setLoading(true);
    const response = await fetch("/api/reservations");
    const data = await response.json();
    console.log(data);
    setreservation(data);
    console.log(reservation);
    setLoading(false);
  };

  const rowOption = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
  ];

  const handleEditStatus = async () => {
    let selectedIds = null;
    if (selectedKeys?.size === 0) return;
    if (selectedKeys === "all") return;

    if (selectedKeys?.size === 1) {
      selectedIds = Array.from(selectedKeys);
    } else {
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds, status:selectedStatus }),
      });

      if (response.ok) {
        fetchreservation();
        setSelectedKeys(new Set());
        toast.success("reservation status updated successfully");
      }else {
        const errorData = await response.json();
        throw new Error(errorData.message );
      }

    } catch (error) {
      console.error("Error editing reservation status:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    let selectedIds = null;
    if (selectedKeys?.size === 0) return;
    if (selectedKeys === "all") {
      let all = new Set(reservation.map((m) => m._id));
      selectedIds = Array.from(all);
    } else {
      selectedIds = Array.from(selectedKeys);
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedIds }),
      });

      if (response.ok) {
        fetchreservation();
        setSelectedKeys(new Set());
        toast.success("reservations deleted successfully");
      }
    } catch (error) {
      toast.error(error.reservation);
    }
  };
  const date = (startDate) => {
    let date = new Date(startDate.year, startDate.month - 1, startDate.day);
    return date.toLocaleDateString();
  };
  useEffect(() => {
    fetchreservation();
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
          placeholder="Search by Villa or User"
          startContent={<FaSearch />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        <div className="flex justify-center space-x-3  mb-3 items-center">
         {(selectedKeys?.size > 0 || selectedKeys === "all") && (
            <Button
              onClick={handleDelete}
              className="max-w-[200px] mt-6"
              color="danger"
            >
              Delete
            </Button>
            )}
            {(selectedKeys?.size ===1 ) && (
            <Button
              onClick={onOpen}
              className="max-w-[200px] mt-6"
              color="primary"
            >
              Change Status
            </Button>
          )}
          </div>
      </div>
      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        isHeaderSticky
        onSelectionChange={setSelectedKeys}
        aria-label="Example table with client-side pagination"
        bottomContent={
          reservation?.length > 0 && (
            <div className="flex w-full justify-between">
              <Pagination
                showControls
                showShadow
                color="primary"
                radius="full"
                page={currentPage}
                variant="light"
                total={Math.ceil(
                  reservation?.filter(
                    (m) =>
                      m.username
                        ?.toLowerCase()
                        .includes(filterValue.toLowerCase()) ||
                      m.villaname
                        ?.toLowerCase()
                        .includes(filterValue.toLowerCase())
                  ).length / reservationPerPage
                )}
                onChange={(page) => setCurrentPage(page)}
              />
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={(e) => {
                    setreservationPerPage(parseInt(e.target.value));
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
          <TableColumn key="villa">Villa</TableColumn>
          <TableColumn key="user">User</TableColumn>
          <TableColumn key="number">No. of Guest</TableColumn>

          <TableColumn key="cost ">Cost</TableColumn>
          <TableColumn key="start">Check In</TableColumn>
          <TableColumn key="end">Check Out</TableColumn>

          <TableColumn key="status">Status</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={Loading}
          loadingContent="Loading..."
          emptyContent={"No reservations to display."}
        >
          {reservationToShow?.map((item) => (
            <TableRow key={item?._id}>
              <TableCell>{item?.villaname}</TableCell>
              <TableCell>{item?.username}</TableCell>
              <TableCell>{item?.numberOfGuests}</TableCell>

              <TableCell>{item?.cost}</TableCell>

              <TableCell>{date(item?.start)}</TableCell>
              <TableCell>{date(item?.end)}</TableCell>
              <TableCell>{item?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Change Status</ModalHeader>
              <ModalBody>
              <select
                  id="villaSelect"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-2 py-4 text-base bg-[#f4f4f5] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
                >
                  <option value="" disabled>
                    Status
                  </option>
                  {status?.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
               
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  handleEditStatus();
                  onClose();
                 } }>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
