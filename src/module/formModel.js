const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  dateOfAdmission: String,
  admissionFor: String,

  particularsOfChild: {
    fullName: String,
    surname: String,
    nameUsedAtHome: String,
    nationality: String,
    dob: String,
    gender: String,
    language: String,
    otherLanguage: String,
    age: String,
    houseNo: String,
    buildingName: String,
    streetName: String,
    city: String,
    pincode: String,
  },

  particularsOfParents: {
    FatherName: String,
    FatherQualification: String,
    FatherOccupation: String,
    FatherOrganisationName: String,
    FatherSTDCodeRes: String,
    FatherTelRes: String,
    FatherSTDCodeOff: String,
    FatherTelOff: String,
    FatherMobile: String,
    FatherEmail: String,
    MotherName: String,
    MotherQualification: String,
    MotherOccupation: String,
    MotherOrganisationName: String,
    MotherSTDCodeRes: String,
    MotherTelRes: String,
    MotherSTDCodeOff: String,
    MotherTelOff: String,
    MotherMobile: String,
    MotherEmail: String,
  },

  childPersonalBackground: {
    characteristics: [String],
    PreviousSchooling: String,
    PreviousSchoolingDetails: String,
    Toilettrained: String,
    Siblings: {
      Brothers: [
        { name: String, age: String },
        { name: String, age: String },
        { name: String, age: String },
      ],
      Sisters: [
        { name: String, age: String },
        { name: String, age: String },
        { name: String, age: String },
      ],
    },
    PreviousKalamKidsDetails: String,
    PreviousKalamKids: String,
    suffered: String,
    surgery: String,
    allergy: String,
    phobias: String,
    phobiasDetails: String,
    medication: String,
    medicationDetails: String,
  },

  medicalRecord: {
    BCG: String,
    "DPT (I, II, III)": String,
    "Oral Polio vaccine (OPV)": String,
    Measles: String,
    MMR: String,
    DT: String,
    "HBV-Hepatitis (I, II, III)": String,
    "Hi B (Meningitis-3 doses)": String,
    Chickenpox: String,
    Typhoid: String,
    "Hepatitis A (2 doses)": String,
  },

  Declarationparent: {
    signatureRef: String, // base64 image
    date: String,
    acknowledgmentName: String,
    acknowledgmentSignatureRef: String, // base64 image
    volunteerJob: Boolean,
    specialEventsCost: Boolean,
    attendMeetings: Boolean,
  },
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);
