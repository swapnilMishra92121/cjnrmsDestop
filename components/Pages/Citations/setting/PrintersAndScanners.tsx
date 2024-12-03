import React, { useState, useEffect } from "react";
import { PrintersAndScannersIparams } from "./PrintersAndScannersI";

const PrintersAndScanners: React.FC<PrintersAndScannersIparams> = ({
  selectedPrinter,
  setSelectedPrinter,
}) => {
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [printers, setPrinters] = useState<{ name: string }[]>([]);

  // Fetch printers from electronAPI
  useEffect(() => {
    window.electronAPI
      .getPrinters()
      .then((printerList: { name: string }[]) => {
        setPrinters(printerList);
      })
      .catch((err) => {
        console.error("Failed to get printers:", err);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Printers & scanners</h1>

      {/* Printer Buttons */}
      <div style={styles.section}>
        {printers.map((printer, index) => (
          <div
            key={printer.name}
            style={{
              ...styles.printerItem,
              backgroundColor: activeBtn === index ? "#e0f7fa" : "white",
            }}
          >
            <span>{printer.name}</span>
            <button
              onClick={() => {
                setSelectedPrinter(printer.name);
                setActiveBtn(index);
              }}
              style={styles.actionButton}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <button style={styles.linkButton}>Get help</button>
        <button style={styles.linkButton}>Give feedback</button>
      </div>
    </div>
  );
};

const PreferenceItem: React.FC<{
  label: string;
  isSwitch: boolean;
  isChecked: boolean;
  description?: string;
}> = ({ label, isSwitch, isChecked, description }) => (
  <div style={styles.preferenceItem}>
    <div>
      <span>{label}</span>
      {description && <small style={styles.description}>{description}</small>}
    </div>
    {isSwitch && (
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
        style={styles.switch}
      />
    )}
  </div>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  dropdownContainer: {
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
  },
  section: {
    marginBottom: "20px",
  },
  printerItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  actionButton: {
    background: "#0078d4",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  preferenceItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0",
  },
  description: {
    display: "block",
    fontSize: "12px",
    color: "gray",
  },
  switch: {
    cursor: "pointer",
  },
  footer: {
    marginTop: "20px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default PrintersAndScanners;