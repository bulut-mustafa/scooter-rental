"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDateFormatter } from "@react-aria/i18n";
import { now, getLocalTimeZone } from "@internationalized/date";
import {Input, RadioGroup, Radio, Select, SelectItem, DatePicker, Button, Accordion, AccordionItem,} from "@heroui/react";
import { getDataFromFirestore, addDataToFirestore } from "@/lib/actions";

export default function AdminForm() {
  const router = useRouter();
  const [clientData, setClientData] = useState(null);
  let formatter = useDateFormatter({ dateStyle: "full", timeStyle: "short" });
  const [adminData, setAdminData] = useState({
    plateNumber: [],
    duration: "",
    startingTime: now(getLocalTimeZone()),
    rentalFee: "",
    deliveryFee: 0,
    deposit: 100,
    paymentMethod: "Cash",
    renter: "Tanah Rata",
  });
  const [plateNumbers, setPlateNumbers] = useState([]);


  const handleChange = (field, value) => {
    setAdminData((prev) => ({ ...prev, [field]: value }));
  };

  
  // Retrieve client form data on component mount
  useEffect(() => {
    const data = sessionStorage.getItem("clientFormData");
    if (data) {
      setClientData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (clientData) {
      getDataFromFirestore("bikes")
        .then((data) => {
          setPlateNumbers(data.filter((scooter) => scooter.model === clientData.bikeId));
        })
        .catch((error) => {
          console.error("Error fetching data from Firestore:", error);
        });
    }
  }, [clientData]);
  if (!clientData) {
    return <p>Loading...</p>;
  }


  const handleSubmit =async  (e) => {
    e.preventDefault();

    
    const rentalForm = {
      bikeId: clientData.bikeId,
      bikeBrand: clientData.bikeBrand,
      bikeModel: clientData.bikeModel,
      bikePower: clientData.bikePower,
      plateNumber: adminData.plateNumber.currentKey,
      clientName: clientData.fullName,
      clientEmail: clientData.email,
      clientContact: clientData.contactNumber,
      clientID: clientData.idPassport,
      clientLicenseNo: clientData.licenseNo,
      clientDriverLicense: clientData.drivingLicense,
      clientInternationalLicense: clientData.internationalLicense,
      clientPillion: clientData.pillion,
      clientMossy : clientData.mossyForest,
      rentalFee: adminData.rentalFee,
      deliveryFee: adminData.deliveryFee,
      deposit: adminData.deposit,
      duration: adminData.duration,
      paymentMethod: adminData.paymentMethod,
      startTime: adminData.startingTime?.toDate?.().toISOString() || "",
      renter: adminData.renter,
      createdAt: new Date().toISOString(),
    }
    try {
      const docId = await addDataToFirestore("rentals", rentalForm);
      console.log("Document added with ID:", docId);
      alert("Data saved successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Form</h1>
      <Accordion>
        <AccordionItem
          key="1"
          aria-label="Client Info"
          title="Client Information"
        >
          <ul className="space-y-2">
            <li>Email: {clientData.email}</li>
            <li>Full Name: {clientData.fullName}</li>
            <li>ID / Passport: {clientData.idPassport}</li>
            <li>Contact Number: {clientData.contactNumber}</li>
            <li>Pillion: {clientData.pillion ? "Yes" : "No"}</li>
            <li>Driving License: {clientData.drivingLicense ? "Yes" : "No"}</li>
            <li>License No: {clientData.licenseNo}</li>
          </ul>
        </AccordionItem>
      </Accordion>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <Select
            label="Plate Number"
            value={adminData.plateNumber}
            onSelectionChange={(value) => handleChange("plateNumber", value)}
          >
            {plateNumbers.map((plate) => (
              <SelectItem key={plate.plate}>
                {plate.plate}
              </SelectItem>
            ))}
          </Select>
          <Input
            label="Duration"
            placeholder="Enter how long you want to rent"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">Hours</span>
              </div>
            }
            value={adminData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            required
          />

          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            label="Starting Time"
            variant="bordered"
            value={adminData.startingTime}
            onChange={(value) => handleChange("startingTime", value)}
            required
          />
          <Input
            label="Rental Fee"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">RM</span>
              </div>
            }
            value={adminData.rentalFee}
            onChange={(e) => handleChange("rentalFee", e.target.value)}
            required
          />
          <Input
            label="Delivery Fee"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">RM</span>
              </div>
            }
            value={adminData.deliveryFee}
            onChange={(e) => handleChange("deliveryFee", e.target.value)}
            required
          />
          <Input
            label="Deposit"
            type="number"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">RM</span>
              </div>
            }
            value={adminData.deposit}
            onChange={(e) => handleChange("deposit", e.target.value)}
            required
          />

          <RadioGroup
            label="Payment Method"
            value={adminData.paymentMethod}
            onValueChange={(value) => handleChange("paymentMethod", value)}
            orientation="horizontal"
            required
          >
            <Radio value="Cash">Cash</Radio>
            <Radio value="Online">Online</Radio>
          </RadioGroup>

          <RadioGroup
            label="Location?"
            value={adminData.renter}
            onValueChange={(value) => handleChange("renter", value)}
            orientation="horizontal"
            required
          >
            <Radio value="Tanah Rata">Tanah Rata</Radio>
            <Radio value="Brinchang">Brinchang</Radio>
            <Radio value="Rovers Inn Guesthouse">Rovers Inn GuestHouse</Radio>
            <Radio value="Runner">Runner</Radio>
          </RadioGroup>

          <Button type="submit" color="primary" className="self-end">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
