/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "../../config";
import { useDispatch, useSelector } from "react-redux";

import AddressCard from "./address-card";
import { Notification, NotificationType } from "../ui/Notification";
import { userInformationSelector } from "../../store/selectors/authSelector";
import { shopAddressListSelector } from "../../store/selectors/shopSelectors";
import {
  addAddress,
  deleteAddress,
  getAllAddresses,
  updateAddress,
} from "../../store/slices/shopSlice";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(userInformationSelector);
  const addressList = useSelector(shopAddressListSelector);

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      Notification({
        message: "You can add max 3 addresses",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            values: formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllAddresses({ userId: user?.id }));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            Notification({
              message: "Address updated successfully",
              type: NotificationType.SUCCESS,
            });
          }
        })
      : dispatch(
          addAddress({
            values: formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllAddresses({ userId: user?.id }));
            setFormData(initialAddressFormData);
            Notification({
              message: "Address added successfully",
              type: NotificationType.SUCCESS,
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllAddresses({ userId: user?.id }));
        Notification({
          message: "Address deleted successfully",
          type: NotificationType.SUCCESS,
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(getAllAddresses({ userId: user?.id }));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
