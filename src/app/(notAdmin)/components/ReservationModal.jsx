"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { IoMdPeople } from "react-icons/io";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DateRangePicker,
} from "@nextui-org/react";
import { toast } from "react-toastify";

const ReservationModal = ({ isOpen, onOpenChange, session }) => {
  const [selectedVilla, setSelectedVilla] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [value, setValue] = useState({
    start: null,
    end: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    const fetchVillas = async () => {
      const response = await fetch("/api/villa");
      const data = await response.json();
      setVillas(data);
    };
    fetchVillas();
  }, []);

  const handleSubmit = async () => {
    if (!selectedVilla || !value || !value.start || !value.end || !numberOfGuests || numberOfGuests <= 0) {
      toast.error("Please select a villa, valid date range and a valid number of guests.");
      return;
    }

    const reservationData = {
      user: session?._id,
      villa: selectedVilla,
      startDate: value.start,
      endDate: value.end,
      numberOfGuests: numberOfGuests,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Reservation error:", errorData);
        throw new Error(errorData.message || "Failed to create reservation");
      }

      toast.success("Reservation created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Reservation submission error:", error);
      toast.error(error.message || "Failed to create reservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      placement="center"
      size="3xl"
      radius="sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Book Our Villa Today
            </ModalHeader>
            <ModalBody>
              <select
                id="villaSelect"
                value={selectedVilla}
                onChange={(e) => setSelectedVilla(e.target.value)}
                className="mt-1 block w-full pl-3 pr-2 py-4 text-base bg-[#f4f4f5] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
              >
                <option value="" disabled>
                  Select a villa
                </option>
                {villas?.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.name}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                label="Number of guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                labelPlacement="outside"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <IoMdPeople />
                  </div>
                }
              />
              <DateRangePicker
                label="Stay duration"
                value={value}
                onChange={setValue}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={isSubmitting}
              >
                Book Villa Now
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReservationModal;
