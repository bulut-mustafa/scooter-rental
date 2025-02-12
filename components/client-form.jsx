"use client";
import { useState } from "react";
import { Input, RadioGroup, Radio, Select, SelectItem, DatePicker, Checkbox } from "@heroui/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function ClientForm({ priceList }) {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    idPassport: "",
    contactNumber: "",
    pillion: "no",
    drivingLicense: "no",
    duration: "",
    price: "",
    startingTime: now(getLocalTimeZone()),
    options: [],
  });

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    console.log("Form Data:", formData);
    // You can now use this data to send to your server or Firestore
  };

  return (
      <div className="flex flex-col space-y-4 p-4">
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        <Input
          label="ID / Passport"
          placeholder="Enter your ID number"
          type="text"
          value={formData.idPassport}
          onChange={(e) => handleChange("idPassport", e.target.value)}
        />
        <Input
          label="Contact Number"
          placeholder="Enter your contact number"
          type="text"
          value={formData.contactNumber}
          onChange={(e) => handleChange("contactNumber", e.target.value)}
        />
        
        <RadioGroup
          label="PILLION / PASSENGER"
          value={formData.pillion}
          onChange={(value) => handleChange("pillion", value)}
        >
          <Radio value="yes">YES</Radio>
          <Radio value="no">NO</Radio>
        </RadioGroup>

        <RadioGroup
          label="Do you have international driving licence?"
          value={formData.drivingLicense}
          onChange={(value) => handleChange("drivingLicense", value)}
        >
          <Radio value="yes">YES</Radio>
          <Radio value="no">NO</Radio>
        </RadioGroup>

        <div className="flex gap-4 justify-between">
          <Select
            className="w-3/5"
            label="Select duration"
            value={formData.duration}
            onChange={(value) => {
              const selectedPrice = priceList.find(
                (price) => price.duration === value
              );
              handleChange("duration", value);
              handleChange("price", selectedPrice ? selectedPrice.price : "");
            }}
          >
            {priceList.map((price) => (
              <SelectItem key={price.id} value={price.duration}>
                {price.type + " " + price.duration}
              </SelectItem>
            ))}
          </Select>
          <Input
            label="Price"
            className="w-2/5"
            type="number"
            isReadOnly
            value={formData.price}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">RM</span>
              </div>
            }
          />
        </div>

        <DatePicker
          hideTimeZone
          showMonthAndYearPickers
          defaultValue={now(getLocalTimeZone())}
          label="Starting Time"
          variant="bordered"
          value={formData.startingTime}
          onChange={(value) => handleChange("startingTime", value)}
        />

        <Checkbox
          isSelected={formData.options.includes("option1")}
          onChange={(isSelected) => {
            handleChange("options", isSelected
              ? [...formData.options, "option1"]
              : formData.options.filter((opt) => opt !== "option1")
            );
          }}
        >
          Option 1
        </Checkbox>
        <Checkbox
          isSelected={formData.options.includes("option2")}
          onChange={(isSelected) => {
            handleChange("options", isSelected
              ? [...formData.options, "option2"]
              : formData.options.filter((opt) => opt !== "option2")
            );
          }}
        >
          Option 2
        </Checkbox>

        <button
          type="button"
          className="rounded-lg bg-blue-600 text-white self-end p-4"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
  );
}
