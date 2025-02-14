"use client";
import { useState } from "react";
import {
  Input,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation"; // Updated import
import {useDateFormatter} from "@react-aria/i18n";

export default function ClientForm({ bike }) {
  const router = useRouter(); // Initialize router
  let formatter = useDateFormatter({dateStyle: "full"});

  // State to hold form data
  const [clientFormData, setClientFormData] = useState({
    bikeId: bike.id,
    bikeModel: bike.model,
    bikeBrand: bike.brand,
    bikePower: bike.power,
    email: "",
    fullName: "",
    idPassport: "",
    contactNumber: "",
    pillion: false,
    drivingLicense: false,
    licenseNo: "",
    internationalLicense: false,
    mossyForest: false,
  });

  const handleChange = (field, value) => {
    setClientFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clientFormData);

    // Store data temporarily in sessionStorage
    sessionStorage.setItem("clientFormData", JSON.stringify(clientFormData));

    // Navigate to the AdminForm
    router.push("/admin-form");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-4 p-4">
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={clientFormData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          value={clientFormData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          required
        />
        <Input
          label="ID / Passport"
          placeholder="Enter your ID number"
          type="text"
          value={clientFormData.idPassport}
          onChange={(e) => handleChange("idPassport", e.target.value)}
          required
        />
        <Input
          label="Contact Number"
          placeholder="Enter your contact number"
          type="text"
          value={clientFormData.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
          required
        />

        <RadioGroup
          label="PILLION / PASSENGER"
          value={clientFormData.pillion}
          onValueChange={(value) => handleChange("pillion", value)}
          orientation="horizontal"
          required
        >
          <Radio value={true}>YES</Radio>
          <Radio value={false}>NO</Radio>
        </RadioGroup>

        <RadioGroup
          label="Do you have international driving licence?"
          value={clientFormData.drivingLicense}
          onValueChange={(value) => handleChange("drivingLicense", value)}
          orientation="horizontal"
          required
        >
          <Radio value={true}>YES</Radio>
          <Radio value={false}>NO</Radio>
        </RadioGroup>

        <Input
          label="License No"
          placeholder="Enter your license number"
          type="text"
          value={clientFormData.licenseNo}
          onChange={(e) => handleChange("licenseNo", e.target.value)}
          required
        />


        <Checkbox
          isSelected={clientFormData.internationalLicense}
          onValueChange={(value) => handleChange("internationalLicense", value)}
        >
          If no international license, do you accept that you have to take full
          responsibility if any fine taken by the enforcement?
        </Checkbox>
        <Checkbox
          isSelected={clientFormData.mossyForest}
          onValueChange={(value) => handleChange("mossyForest", value)}
        >
          Do you accept that "MOSSY FOREST" is forbidden to go for our company's
          scooter?
        </Checkbox>

        <Button
          type="submit"
          color="primary"
          className="self-end"
          isDisabled={
            !clientFormData.internationalLicense || !clientFormData.mossyForest
          }
        >
          Next
        </Button>
      </div>
    </form>
  );
}
