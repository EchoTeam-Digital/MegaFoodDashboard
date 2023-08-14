"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Restaurants from "../../../../../../types/restaurantTypes";
import EditRestaurantLoading from "./loading";
import {
  Button,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Link,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Textarea,
  Switch,
} from "@nextui-org/react";
import NextImage from "next/image";
import User from "../../../../../../types/usersTypes";
import { useFilePicker } from "use-file-picker";
import { useRouter } from "next/navigation";

const EditRestaurant = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurants>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [ownerButtonLoading, setOwnerButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [phoneNumbersPopover, setPhoneNumbersPopover] =
    useState<boolean>(false);
  const [selectedPhone, setSelectedPhone] = useState<number>(0);
  const phoneNumberDisclosure = useDisclosure();
  const deleteRestaurantDisclosure = useDisclosure();
  const [selectedOwnerKeys, setSelectedOwnerKeys] = React.useState(new Set([]));
  const selectedOwner = React.useMemo(
    () => Array.from(selectedOwnerKeys).join(", ").replaceAll("_", " "),
    [selectedOwnerKeys]
  );
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);

  const changeRestaurantValue = (valueName: string, value: any) => {
    setRestaurant({
      ...restaurant,
      [valueName]: value,
    });
  };

  const [openFileSelector] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    limitFilesConfig: { max: 1 },
    maxFileSize: 50,
    onFilesSelected: (file) => {
      changeRestaurantValue("image", file.filesContent[0].content);
    },
  });

  useEffect(() => {
    if (params.slug) {
      fetchRestaurant();
    }
  }, [params.slug]);

  const fetchRestaurant = async () => {
    await axios
      .get(`http://localhost:5020/restaurants/getdata/${params.slug}`)
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error, status code: ", res.status);
          setError(true);
        } else {
          setRestaurant(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchUsers = async () => {
    await axios
      .get(`http://localhost:5020/users/getusers`)
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error, status code: ", res.status);
          setError(true);
        } else {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setSelectedOwnerKeys(new Set([restaurant.owner.id]));
        setOwnerButtonLoading(false);
      });
  };

  const saveRestaurant = async () => {
    const restaurantData = {
      name: restaurant.name,
      email: restaurant.email,
      address: restaurant.address,
      description: restaurant.description,
      deliveryFee: Number.parseInt(restaurant.deliveryFee.toString()),
      phoneNumbers: restaurant.phoneNumbers,
      ownerId: restaurant.owner.id,
      image: restaurant.image,
      status: restaurant.status,
    };
    await axios
      .post(
        `http://localhost:5020/restaurants/edit/${params.slug}`,
        restaurantData
      )
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error, status code: ", res.status);
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        changeRestaurantValue("updatedAt", new Date().toISOString());
        setSaveButtonLoading(false);
      });
  };

  const Error = () => {
    return (
      <div className="flex flex-col items-center justify-center h-auto mr-20 ml-20 mt-7 rounded-lg bg-white dark:bg-gray-800 p-7">
        <h1 className="text-4xl font-bold">حدث خطأ</h1>
        <h1 className="text-2xl font-bold">لم يتم العثور علي المطعم</h1>

        <Button
          onClick={() => {
            setError(false);
            setLoading(true);
            fetchRestaurant();
          }}
          className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-lg"
        >
          حاول مجددا
        </Button>

        <Image
          isBlurred
          shadow="sm"
          as={NextImage}
          src="/error404.jpg"
          alt="error 404"
          width={300}
          height={300}
          className="mt-5"
        />
      </div>
    );
  };

  if (loading) {
    if (error) {
      return <Error />;
    }
    return (
      <div className="flex items-center justify-center h-auto mr-20 ml-20 mt-7 rounded-lg bg-white dark:bg-gray-800 p-7">
        <EditRestaurantLoading />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  const formatPhoneNumber = () => {
    if (restaurant.phoneNumbers) {
      if (restaurant.phoneNumbers.length > 1) {
        return (
          <span className="text-md text-warning cursor-pointer">
            {restaurant.phoneNumbers[0]} + {restaurant.phoneNumbers.length - 1}{" "}
            more
          </span>
        );
      } else {
        return (
          <span className="text-md text-warning cursor-pointer">
            {restaurant.phoneNumbers[0]}
          </span>
        );
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatOwnerName = () => {
    if (restaurant.owner) {
      return (
        <Popover showArrow placement="bottom">
          <PopoverTrigger>{restaurant.owner.name}</PopoverTrigger>
          <PopoverContent className="p-1">
            <Card
              shadow="none"
              className="max-w-[300px] border-none bg-transparent"
            >
              <CardHeader className="justify-between">
                <div className="flex gap-3">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={restaurant.owner.image}
                  />
                  <div className="flex flex-col items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {restaurant.owner.name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-500">
                      {restaurant.owner.email}
                    </h5>
                    <Link
                      href="#"
                      className="text-small tracking-tight text-primary-500 hover:underline hover:text-primary"
                    >
                      {restaurant.owner.id}
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="text-small text-default-400">Phone:</p>
                    <p className="text-small text-default-600">
                      {restaurant.owner.phoneNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-small text-default-400">Address:</p>
                    <p className="text-small text-default-600">
                      {restaurant.owner.address}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </PopoverContent>
        </Popover>
      );
    }
  };

  const calcPhoneNumbers = () => {
    if (restaurant.phoneNumbers) {
      if (restaurant.phoneNumbers.length > 1) {
        return restaurant.phoneNumbers.map((number) => number).join(" - ");
      } else {
        return restaurant.phoneNumbers[0];
      }
    }
  };

  const confirmRemovePhone = () => {
    return (
      <Modal
        isOpen={phoneNumberDisclosure.isOpen}
        onOpenChange={phoneNumberDisclosure.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                تأكيد الحذف
              </ModalHeader>
              <ModalBody>
                <p>
                  هل أنت متأكد من حذف رقم الهاتف{" "}
                  <span className="text-danger">{selectedPhone}</span> ؟
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  إلغاء
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    phoneNumberDisclosure.onClose();
                    removePhoneNumber(selectedPhone);
                  }}
                >
                  نعم
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  const DeleteRestaurnat = async () => {
    await axios
      .delete(`http://localhost:5020/restaurants/delete/${params.slug}`)
      .then((res) => {
        if (res.status !== 200) {
          console.log("Error, status code: ", res.status);
          setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        deleteRestaurantDisclosure.onClose();
        router.push("/dashboard/restaurants");
      });
  };

  const confirmRestaurantDelete = () => {
    return (
      <Modal
        isOpen={deleteRestaurantDisclosure.isOpen}
        onOpenChange={deleteRestaurantDisclosure.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                تأكيد الحذف
              </ModalHeader>
              <ModalBody>
                <p>هل أنت متأكد من حذف المطعم </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  إلغاء
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    DeleteRestaurnat();
                  }}
                >
                  نعم
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  const addPhoneNumber = (phoneNumber: number) => {
    if (!phoneNumber) {
      return;
    }
    setRestaurant({
      ...restaurant,
      phoneNumbers: [...restaurant.phoneNumbers, phoneNumber],
    });
  };
  const removePhoneNumber = (phoneNumber: number) => {
    if (!phoneNumber) {
      return;
    }
    setRestaurant({
      ...restaurant,
      phoneNumbers: restaurant.phoneNumbers.filter(
        (number) => number !== phoneNumber
      ),
    });
  };

  const phoneNumbersChip = () => {
    return (
      <Popover
        placement="bottom"
        showArrow={true}
        isOpen={phoneNumbersPopover}
        onOpenChange={(open) => setPhoneNumbersPopover(open)}
      >
        <PopoverTrigger>
          <Input
            type="text"
            variant="bordered"
            label="أرقم الهواتف"
            className="max-w-[620px]"
            value={calcPhoneNumbers()}
            onClick={() => setPhoneNumbersPopover(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col p-3">
          {restaurant.phoneNumbers.map((number, index) => (
            <Button
              key={index}
              endContent={<i className="bx bx-x text-danger" />}
              className="mb-3"
              onClick={() => {
                setSelectedPhone(number);
                setPhoneNumbersPopover(false);
                phoneNumberDisclosure.onOpen();
              }}
            >
              {number}
            </Button>
          ))}
          <Input
            type="text"
            variant="bordered"
            label="أضف رقم هاتف جديد"
            onChange={(e) => setSelectedPhone(e.target.value)}
          />
          <Button
            className="mt-3 text-white"
            color="success"
            startContent={<i className="bx bx-plus" />}
            onClick={() => addPhoneNumber(selectedPhone)}
          >
            إضافه
          </Button>
        </PopoverContent>
      </Popover>
    );
  };

  const getRating = () => {
    return (
      <>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-yellow-300 mr-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <svg
          className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {restaurant.rate} out of 5
        </p>
      </>
    );
  };

  const chooseOwner = () => {
    const getUserRestaurant = (user: User) => {
      if (user.Restaurant != undefined) {
        const restaurants = user.Restaurant.map(
          (restaurant) => restaurant.name
        );
        return restaurants.join(", ");
      } else {
        return "لا يوجد مطاعم";
      }
    };

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="capitalize w-full h-auto"
            isLoading={ownerButtonLoading}
            onClick={() => {
              if (users.length === 0) {
                setOwnerButtonLoading(true);
                fetchUsers();
              }
            }}
          >
            {selectedOwner ? selectedOwner : restaurant.owner.id}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection actions"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedOwnerKeys}
          onSelectionChange={(keys) => {
            setSelectedOwnerKeys(keys);
            const fitlredKey = Array.from(new Set(keys))
              .join(", ")
              .replaceAll("_", " ");
            changeRestaurantValue(
              "owner",
              users.find((user) => user.id === fitlredKey)
            );
          }}
        >
          <DropdownItem
            className="flex items-center justify-center"
            isReadOnly
            key="search"
          >
            <Input
              type="text"
              variant="bordered"
              placeholder="بحث بالإسم أو أي دي"
              className="w-full"
              onValueChange={(value) => {
                if (value) {
                  // search with id or name
                  const filteredUsers = users.filter(
                    (user) =>
                      user.id.includes(value) || user.name.includes(value)
                  );
                  setUsers(filteredUsers);
                } else {
                  fetchUsers();
                }
              }}
            />
          </DropdownItem>
          {users && users.length > 0 ? (
            users.map((user) => (
              <DropdownItem key={user.id}>
                <div className="flex items-center gap-3">
                  <Avatar isBordered radius="full" size="md" src={user.image} />
                  <div className="flex flex-col items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {user.name}
                      {user.Restaurant.email}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-500">
                      {user.email}
                    </h5>
                    <h5 className="text-small tracking-tight text-default-500">
                      {getUserRestaurant(user)}
                    </h5>
                    <Link
                      href="#"
                      className="text-small tracking-tight text-primary-500 hover:underline hover:text-primary"
                    >
                      {user.id}
                    </Link>
                  </div>
                </div>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem isReadOnly>لا يوجد مستخدمين</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <>
      {confirmRemovePhone()}
      {confirmRestaurantDelete()}
      <div className="flex flex-col gap-3">
        <div className="flex mr-20 ml-20 mt-7 rounded-lg bg-white dark:bg-gray-800 p-7">
          <div className="flex flex-col items-center justify-start">
            <Image
              as={NextImage}
              src={restaurant.image}
              alt={"no image"}
              width={250}
              height={250}
              className="rounded-lg mr-5"
            />
            <div className="flex items-center mt-2">{getRating()}</div>
          </div>
          <div className="justify-between ml-5 w-full lg:block xl:flex 2xl:flex">
            <div className="flex flex-col items-start justify-start max-w-[300px] overflow-x-auto">
              <h1 className="text-sm font-bold text-gray-400">
                Name:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {restaurant.name}
                </span>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                Id:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {restaurant.id}
                </span>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                Email:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {restaurant.email}
                </span>
              </h1>
              <h1 className="flex gap-1 text-sm font-bold text-gray-400">
                Owner:{" "}
                <span className="text-md text-warning dark:text-warning cursor-pointer">
                  {formatOwnerName()}
                </span>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                PhoneNumbers:{" "}
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>{formatPhoneNumber()}</PopoverTrigger>
                  <PopoverContent>
                    {restaurant.phoneNumbers.map((number, index) => (
                      <div key={index}>{number}</div>
                    ))}
                  </PopoverContent>
                </Popover>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                DeliveryFee:{" "}
                <span className="text-md text-success">
                  ${restaurant.deliveryFee}
                </span>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                Created At:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {formatDate(restaurant.createdAt)}
                </span>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                Updated At:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {formatDate(restaurant.updatedAt)}
                </span>
              </h1>
            </div>
            <div className="flex flex-col items-start justify-start max-w-[300px] overflow-x-auto">
              <h1 className="text-sm font-bold text-gray-400">
                Address:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {restaurant.address}
                </span>
              </h1>
              <h1 className="text-sm font-bold text-gray-400">
                Description:{" "}
                <span className="text-md text-black dark:text-gray-200">
                  {restaurant.description}
                </span>
              </h1>
            </div>
            <div>
              <div className="flex gap-2">
                <Button
                  color="danger"
                  className="text-white"
                  startContent={<i className="bx bxs-trash-alt" />}
                  onClick={() => deleteRestaurantDisclosure.onOpen()}
                >
                  حذف
                </Button>
                <Button
                  color="success"
                  className="text-white"
                  startContent={<i className="bx bx-save" />}
                  isLoading={saveButtonLoading}
                  onClick={() => {
                    setSaveButtonLoading(true);
                    saveRestaurant();
                  }}
                >
                  حفظ
                </Button>
              </div>
              <div className="flex justify-center items-end">
                <Button
                  color="primary"
                  className="text-white mt-2"
                  startContent={<i className="bx bx-upload" />}
                  onClick={() => openFileSelector()}
                >
                  رفع صورة
                </Button>
              </div>
              <div className="h-full flex justify-center items-center">
                <Switch
                  isSelected={restaurant.status === "active" ? true : false}
                  color="primary"
                  onValueChange={(value) =>
                    changeRestaurantValue(
                      "status",
                      value ? "active" : "inactive"
                    )
                  }
                >
                  تفعيل المطعم
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-20 ml-20 mt-7 rounded-lg bg-white dark:bg-gray-800 p-7">
          <div className="flex gap-3 mb-10">
            <Input
              type="text"
              variant="bordered"
              label="الإسم"
              defaultValue={restaurant.name}
              onValueChange={(value) => changeRestaurantValue("name", value)}
            />
            {chooseOwner()}
          </div>
          <div className="flex gap-3 mb-10">
            {phoneNumbersChip()}
            <Input
              type="email"
              variant="bordered"
              label="البريد الإلكتروني"
              defaultValue={restaurant.email}
              onValueChange={(value) => changeRestaurantValue("email", value)}
            />
          </div>
          <div className="flex gap-3">
            <Input
              type="number"
              label="ضريبة التوصيل"
              variant="bordered"
              placeholder="0.00"
              onValueChange={(value) =>
                changeRestaurantValue("deliveryFee", value)
              }
              defaultValue={restaurant.deliveryFee}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
            />
            <Input
              type="text"
              variant="bordered"
              label="العنوان"
              defaultValue={restaurant.address}
              onValueChange={(value) => changeRestaurantValue("address", value)}
            />
          </div>
          <div className="mt-10">
            <Textarea
              label="الوصف"
              variant="bordered"
              placeholder="أدخل وصف المطعم"
              defaultValue={restaurant.description}
              onValueChange={(value) =>
                changeRestaurantValue("description", value)
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRestaurant;
