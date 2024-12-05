// import { useEffect, useState } from "react";
// import { TextBoxComponent } from "../../../../CommonComponents/Fields/TextBox/TextBoxComponent";
// import { DropdownComponent } from "../../../../CommonComponents/Fields/Dropdown/DropdownComponent";
// import { CheckBoxComponent } from "../../../../CommonComponents/Fields/Checkbox/Checkbox";
// import { parserVehicleDetailsResponce, SubjectIPrams } from "./SubjectI";
// import { Submit } from "../../../../CommonComponents/Fields/Submit/Submit";
// import { openNotificationWithIcon } from "../../../../CommonComponents/Toster/Toster";
// import {
//   successAddedMessage,
//   successUpdateMessage,
// } from "../../../../../utils/const";

// interface PlateData {
//   Plate: string;
//   id: string;
// }

// interface FieldData {
//   Plate: string;
//   State: string;
//   Expiration: string;
//   Make: string;
//   Model: string;
//   Year: string;
//   Color: string;
//   Style: string;
//   Type: string;
//   VIN: string;
//   DOT: string;
//   PoundsOverweight: string;
//   Occupation: string;
// }

// export const Subject: React.FC<SubjectIPrams> = ({
//   editData,
// }) => {
//   const [Plate, setPlate] = useState<PlateData[]>([]);
//   const [allData, setAllData] = useState<parserVehicleDetailsResponce[]>([]);
//   const [field, setField] = useState<FieldData>({
//     Plate: editData.Plate,
//     State: editData.State,
//     Expiration: editData.Expiration,
//     Make: editData.Make,
//     Model: editData.Model,
//     Year: editData.Year,
//     Color: editData.Color,
//     Style: editData.Style,
//     Type: editData.Type,
//     VIN: editData.VIN,
//     DOT: editData.DOT,
//     PoundsOverweight: editData.PoundsOverweight,
//     Occupation: editData.Occupation,
//   });

//   const updateField = (name: keyof FieldData, value: string) => {
//     setField((prev) => ({ ...prev, [name]: value }));
//   };

//   const Save = async () => {
//     if (editData.id) {
//       window.electronAPI.updateJSONData({...field,id:editData.id});
//       openNotificationWithIcon("success", successUpdateMessage);
//     } else {
//       window.electronAPI.createOutputJSONFile(field);
//       openNotificationWithIcon("success", successAddedMessage);
//     }
//   };

//   const initialRender = () => {
//     window.electronAPI
//       .readXMLFiles("parser_vehicle_details")
//       .then((e: string) => {
//         const ParserVehicleDetailsResponce: parserVehicleDetailsResponce[] = e
//           .trim()
//           .split("\n")
//           .map((line: string) => JSON.parse(line));

//         const arr: PlateData[] = ParserVehicleDetailsResponce.map((val) => ({
//           Plate: val.Plate ? val.Plate : "",
//           id: String(val._id),
//         }));

//         setAllData(ParserVehicleDetailsResponce);
//         setPlate(arr);
//       });
//   };

//   useEffect(() => {
//     initialRender();
//   }, []);

//   return (
//     <>
//       <div>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "30px",
//           }}
//         >
//           <DropdownComponent
//             dataSource={Plate.map((val) => ({
//               id: val.id,
//               value: val.Plate,
//             })).filter((val) => val.value)}
//             fieldName="Plate"
//             value={field.Plate}
//             handleRowClick={(value) => {
//               updateField("Plate", value);
//               const perticulardata = JSON.parse(
//                 allData.find((item) => item._id === Number(value))?.Fields ||
//                   "{}"
//               );

//               setField({
//                 Plate: value,
//                 State: perticulardata["State Code"] || "",
//                 Expiration: "",
//                 Make: perticulardata.Make || "",
//                 Model: perticulardata.Model || "",
//                 Year: perticulardata.Year || "",
//                 Color: perticulardata.PrimaryColor || "",
//                 Style: "",
//                 Type: perticulardata.Type || "",
//                 VIN: perticulardata.VIN || "",
//                 DOT: "",
//                 PoundsOverweight: perticulardata.GrossWeight || "",
//                 Occupation: perticulardata.Owner1 || "",
//               });
//             }}
//             showTooltip={false}
//           />

//           <TextBoxComponent
//             value={field.State}
//             onChangeValue={(value) => updateField("State", value)}
//             fieldName="State"
//           />

//           <TextBoxComponent
//             value={field.Expiration}
//             onChangeValue={(value) => updateField("Expiration", value)}
//             fieldName="Expiration"
//           />
//           <div>
//             <CheckBoxComponent value={false} fieldName="No Plate" />
//             <CheckBoxComponent value={false} fieldName="21 Days Plate" />
//           </div>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "30px",
//           }}
//         >
//           <TextBoxComponent
//             value={field.Make}
//             onChangeValue={(value) => updateField("Make", value)}
//             fieldName="Make"
//           />
//           <TextBoxComponent
//             value={field.Model}
//             onChangeValue={(value) => updateField("Model", value)}
//             fieldName="Model"
//           />
//           <TextBoxComponent
//             value={field.Year}
//             onChangeValue={(value) => updateField("Year", value)}
//             fieldName="Year"
//           />
//           <TextBoxComponent
//             value={field.Color}
//             onChangeValue={(value) => updateField("Color", value)}
//             fieldName="Color"
//           />
//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "30px",
//           }}
//         >
//           <TextBoxComponent
//             value={field.Style}
//             onChangeValue={(value) => updateField("Style", value)}
//             fieldName="Style"
//           />
//           <TextBoxComponent
//             value={field.Type}
//             onChangeValue={(value) => updateField("Type", value)}
//             fieldName="Type"
//           />
//           <TextBoxComponent
//             value={field.VIN}
//             onChangeValue={(value) => updateField("VIN", value)}
//             fieldName="VIN"
//           />
//         </div>

//         <div>
//           <CheckBoxComponent value={false} fieldName="Commercial vehicle" />
//           <CheckBoxComponent
//             value={false}
//             fieldName="Hazardous Material (DOT)"
//           />
//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             gap: "30px",
//           }}
//         >
//           <TextBoxComponent
//             value={field.DOT}
//             onChangeValue={(value) => updateField("DOT", value)}
//             fieldName="DOT#"
//           />
//           <TextBoxComponent
//             value={field.PoundsOverweight}
//             onChangeValue={(value) => updateField("PoundsOverweight", value)}
//             fieldName="Pounds Overweight"
//           />
//           <TextBoxComponent
//             value={field.Occupation}
//             onChangeValue={(value) => updateField("Occupation", value)}
//             fieldName="Occupation"
//           />
//         </div>

//         <div style={{ display: "flex", justifyContent: "end" }}>
//           <Submit onSave={Save} />
//         </div>
//       </div>
//     </>
//   );
// };
