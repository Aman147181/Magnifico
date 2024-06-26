"use client";
import { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const Profile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [session, setSession] = useState(null);
  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    image: null,
    phoneNumber: "",
    nationality: "",
  });
  const date = (startDate) => {
    let date = new Date(startDate.year, startDate.month - 1, startDate.day);
    return date.toLocaleDateString();
  };
  const fetchUserData = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/profile");
      if (!response.ok) {
        toast.error("Failed to fetch user data");
        return;
      }
      const data = await response.json();
      console.log(data);
      setSession(data.user);
      setFormData({
        username: data.user.name,

        password: "",
        image: null,
        phoneNumber: data.user.phoneNumber || "",
        nationality: data.user.nationality || "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserReservations = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/reservations/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setReservations(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch user properties when session is available
    console.log(session);
    if (session?._id) {
      fetchUserReservations(session?._id);
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      setFormData((prevFields) => ({
        ...prevFields,
        image: file,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = null;

      if (formData.image) {
        // Convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(formData.image);
        reader.onloadend = async () => {
          imageUrl = reader.result;

          const response = await fetch(`/api/profile/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              image: imageUrl,
            }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }

          toast.success("Profile updated successfully");
          onOpenChange(false); // Close the modal
          fetchUserData();
        };
      } else {
        const response = await fetch(`/api/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            image: imageUrl,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        toast.success("Profile updated successfully");
        onOpenChange(false); // Close the modal
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      fetchUserData();
    }
  };

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  else
    return (
      <div className="flex flex-col w-full min-h-screen px-3 py-20 pb-10 bg-white ">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center w-full px-5 space-x-0 mobile:flex-row mobile:space-x-6 sm:space-x-10 mobile:items-center mobile:justify-center">
            <div className="border-2 rounded-full min-w-24 min-h-24 max-w-28 max-h-28 md:min-w-28 md:max-w-36 md:max-h-36 md:min-h-28 border-slate-50">
              <img
                className="object-cover object-center w-full aspect-square rounded-full"
                src={session?.image}
                alt="Your Image"
              />
            </div>
            <div className="flex flex-col items-center justify-center px-2 pb-5 mobile:items-start ">
              <h1 className="text-base font-semibold text-black sm:text-lg font-poppins ">
                {session?.name}
              </h1>
              <div className="flex items-center justify-center space-x-1 text-gray-600">
                <h1 className="text-base">{session?.email}</h1>
              </div>

              <div className="flex mt-5 mb-3 space-x-5 text-gray-600">
                <h1>
                  <span className="text-black font-semibold pr-[2px]">0</span>{" "}
                  Bookmarks
                </h1>
                <h1>
                  {" "}
                  <span className="text-black font-semibold  pr-[2px]">
                    {reservations?.length}
                  </span>{" "}
                  Reservations
                </h1>
              </div>
              <Button color="primary" onPress={onOpen}>
                Edit Profile
              </Button>
            </div>
          </div>

          <Tabs
            variant="underlined"
            fullWidth
            size="lg"
            placement="center"
            aria-label="Options"
            className="mt-10 "
            color="primary"
          >
            <Tab key="Reservation" title="Reservations">
              <Table
                isHeaderSticky
                aria-label="Example table with client-side pagination"
                classNames={{
                  wrapper: "min-h-[272px] max-h-[560px] overflow-y-auto",
                }}
              >
                <TableHeader>
                  <TableColumn key="villa">Villa</TableColumn>
                  <TableColumn key="number">No. of Guest</TableColumn>

                  <TableColumn key="cost ">Cost</TableColumn>
                  <TableColumn key="start">Check In</TableColumn>
                  <TableColumn key="end">Check Out</TableColumn>

                  <TableColumn key="status">Status</TableColumn>
                </TableHeader>
                <TableBody
                  isLoading={loading}
                  loadingContent="Loading..."
                  emptyContent={"No reservations to display."}
                >
                  {reservations?.map((item) => (
                    <TableRow key={item?._id}>
                      <TableCell>{item?.villaname}</TableCell>
                      <TableCell>{item?.numberOfGuests}</TableCell>

                      <TableCell>{item?.cost}</TableCell>

                      <TableCell>{date(item?.start)}</TableCell>
                      <TableCell>{date(item?.end)}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>
            <Tab key="bookmark" title="Bookmarks">
              <div className="flex flex-col items-center justify-center w-full ">
                <h1 className="font-mono text-lg pt-6 sm:text-2xl text-sky-900 font-bold">
                  Bookmarks tab is yet to be built
                </h1>
              </div>
            </Tab>
            <Tab key="Notification" title="Notifications">
              <div className="flex flex-col items-center justify-center w-full ">
                <h1 className="font-mono text-lg pt-6 sm:text-2xl text-sky-900 font-bold">
                  Notifications tab is yet to be built
                </h1>
              </div>
            </Tab>
          </Tabs>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Profile
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image URL
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nationality
                      </label>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-4">
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
};

export default Profile;
