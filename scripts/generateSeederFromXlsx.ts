const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

// Optional: Define the interface for the row structure for better type safety
interface PatientRow {
  [key: string]: any; // Allows any additional fields
  "N°"?: string;
  "D.N.I."?: string;
  "No.CELULAR"?: string;
  "H.CL"?: string;
  "APELLIDOS Y NOMBRES"?: string;
  "DX."?: string;
}

// Load the Excel file
const workbook = xlsx.readFile(path.join(__dirname, "xlsx", "patients.xlsx"));
// Select the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(worksheet);

// Format JSON data for Prisma seeder
const patients = data.map((row: PatientRow) => {
  // Extract name field and validate it
  const nameField = row["APELLIDOS Y NOMBRES"];
  let lastName = "";
  let firstName = "";

  if (nameField && typeof nameField === "string") {
    // Check if the name contains a comma
    if (nameField.includes(",")) {
      const [last, first] = nameField.split(",").map((part) => part.trim());
      lastName = last || "";
      firstName = first || "";
    } else {
      // Fallback to splitting by spaces if no comma is present
      const names = nameField.split(" ");
      lastName = names.slice(0, 2).join(" ").trim(); // First two words as last name
      firstName = names.slice(2).join(" ").trim(); // Remaining words as first name
    }
  } else {
    console.warn(
      `Missing or invalid name field for row: ${JSON.stringify(row)}`
    );
  }

  // Extract other fields with default fallbacks
  return {
    id: row["D.N.I."]?.toString() || null,
    lastName: lastName || null,
    firstName: firstName || null,
    birthDate: null, // Remains null as per requirements
    phone: row["No.CELULAR"]?.toString() || null,
    clinicId: row["H.CL"]?.toString() || null,
    diabetesType: row["DX."] || null,
  };
});

// Log the number of successfully processed patients
console.log(`Total patients processed: ${patients.length}`);

// Create the target directory if it doesn't exist
const outputDir = path.join(__dirname, "prisma");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save formatted data to a JSON file
fs.writeFileSync(
  path.join(outputDir, "patientsSeeder.json"),
  JSON.stringify(patients, null, 2)
);

console.log("Seeder data generated successfully!");
