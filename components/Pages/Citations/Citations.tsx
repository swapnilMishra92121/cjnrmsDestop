// "use client";
// import { useEffect, useState } from "react";
// import { TabsComponents } from "../../CommonComponents/TabsComponents/TabsComponents";
// import { jsPDF } from "jspdf";
// import { Header } from "../../CommonComponents/Header/Header";
// import { Subject } from "./component/subject/Subject";
// import { coloum } from "./config";
// import { SetTableData } from "./CitationsI";
// import { Table } from "../../CommonComponents/Table/Table";
// import { ButtonComponents } from "../../CommonComponents/Fields/Button/ButtonComponents";

// export const Citations: React.FC = () => {
//   // Initialize the form state with default empty values

//   const [activeTab, setActiveTab] = useState<number>(1);
//   const [pdfUrl, setPdfUrl] = useState<string>("");
//   const [tableData, setTableData] = useState<SetTableData[]>([]);

//   const [editData, seteditData] = useState<SetTableData>({
//     Color: "",
//     DOT: "",
//     Expiration: "",
//     id: 0,
//     Make: "",
//     Model: "",
//     Occupation: "",
//     Plate: "",
//     PoundsOverweight: "",
//     State: "",
//     Style: "",
//     Type: "",
//     VIN: "",
//     Year: "",
//   });

//   // Data fields for the form
//   const [field, setField] = useState({
//     identificationType: "",
//     subjectType: "",
//     licensePlate: "",
//     plateType: "",
//     state: "",
//     registeredParty: "",
//     dob: "",
//     address: "",
//     vin: "",
//     make: "",
//     model: "",
//     year: "",
//     color: "",
//     doorQuantity: "",
//     insuranceCarrier: "",
//   });

//   const [selectedPrinter, setSelectedPrinter] = useState<string>("");
//   const [printers, setPrinters] = useState<{ name: "" }[]>([]);

//   // Connect to the database and parse the data

//   useEffect(() => {
//     // window.electronAPI
//     //   .getPrinters()
//     //   .then((printerList: any) => {
//     //     setPrinters(printerList);
//     //   })
//     //   .catch((err) => {
//     //     console.error("Failed to get printers:", err);
//     //   });
//   }, []);

//   // Function to handle downloading the filled PDF
//   const handleDownload = async () => {
//     const doc = new jsPDF();
//     doc.text(`License Plate: ${field.licensePlate}`, 10, 10);
//     doc.text(`Plate Type: ${field.plateType}`, 10, 20);
//     doc.text(`State: ${field.state}`, 10, 30);
//     doc.text(`Registered Party: ${field.registeredParty}`, 10, 40);
//     doc.text(`DOB: ${field.dob}`, 10, 50);
//     doc.text(`Address: ${field.address}`, 10, 60);
//     doc.text(`VIN: ${field.vin}`, 10, 70);
//     doc.text(`Make: ${field.make}`, 10, 80);
//     doc.text(`Model: ${field.model}`, 10, 90);
//     doc.text(`Year: ${field.year}`, 10, 100);
//     doc.text(`Color: ${field.color}`, 10, 110);
//     doc.text(`Door Quantity: ${field.doorQuantity}`, 10, 120);
//     doc.text(`Insurance Carrier: ${field.insuranceCarrier}`, 10, 130);
//     const pdfBlob = doc.output("blob");
//     const pdfURL = URL.createObjectURL(pdfBlob);
//     setPdfUrl(pdfURL);
//   };

//   return (
//     <>
//       <Header handleDownload={handleDownload} />

//       <div
//         style={{
//           width: "98%",
//           margin: "0 auto",
//           height: "100vh",
//           overflow: "auto",
//         }}
//       >
//         <TabsComponents
//           activeTab={activeTab}
//           tabList={[
//             { name: "Subject", id: 1 },
//             { name: "Vehicle", id: 1 },
//             { name: "Location", id: 2 },
//             { name: "Violation", id: 3 },
//             { name: "Citation Information", id: 4 },
//             { name: "Notes", id: 5 },
//           ]}
//           handleTabChange={setActiveTab}
//         />

//         <Subject editData={editData} />

//         <select
//           onChange={(e) => setSelectedPrinter(e.target.value)}
//           value={selectedPrinter}
//         >
//           <option value="">Select Printer</option>
//           {printers.map((printer) => (
//             <option key={printer.name} value={printer.name}>
//               {printer.name}
//             </option>
//           ))}
//         </select>

//         {pdfUrl && (
//           <div style={{ marginTop: "20px" }}>
//             <h3>PDF Preview:</h3>
//             <iframe
//               src={pdfUrl}
//               width="100%"
//               height="600px"
//               style={{ border: "1px solid #000" }}
//             ></iframe>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
