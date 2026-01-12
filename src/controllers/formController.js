const Form = require("../module/formModel");
const Student = require("../module/sutdent"); // Corrected the typo
// const { sendEmail } = require('../mailer'); 
const { sendInquiryEmail, sendAdmissionApprovalEmail, sendInquiryEmailToFather, sendInquiryEmailToMother } = require('../mailer');
const expansive = require("../module/expansive");
 
  // Adjust the path as necessary
// Adjust the path as necessary
exports.submitForm = async (req, res) => {
  try {
    const formData = req.body; // Get the data from the request body
    console.log("Received form data:", formData); // Log the incoming data

    // Validate characteristics
    if (!Array.isArray(formData.childPersonalBackground.characteristics)) {
      return res.status(400).json({ success: false, message: "Characteristics must be an array." });
    }

    // Validate that all elements in the characteristics array are strings
    if (!formData.childPersonalBackground.characteristics.every(item => typeof item === 'string')) {
      return res.status(400).json({ success: false, message: "All characteristics must be strings." });
    }

    // Create a new instance of the Form model
    const newForm = new Form(formData);

    // Save to the database
    await newForm.save();

    // Respond with success
    res.status(201).json({ success: true, message: "Form submitted successfully", data: newForm });
  } catch (error) {
    console.error("Error saving form:", error.message);
    res.status(500).json({ success: false, message: "Failed to save form", error: error.message });
  }
}
exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params; // Get the form ID from the request parameters
    const updatedData = req.body; // Get the updated data from the request body

    // Validate the input if necessary
    if (!updatedData) {
      return res.status(400).json({ success: false, message: "No data provided for update." });
    }

    // Find the existing form and update it
    const form = await Form.findByIdAndUpdate(id, updatedData, { new: true });

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found." });
    }

    res.status(200).json({ success: true, message: "Form updated successfully.", data: form });
  } catch (error) {
    console.error("Error updating form:", error.message);
    res.status(500).json({ success: false, message: "Failed to update form." });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    console.error("Error fetching form:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch form" });
  }
};
exports.getAllForm = async (req, res) => {
  try {
    const  form = await Form.find();
    res.status(200).json({ success: true, data:  form });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete form" });
  }
};

exports.submitStudent = async (req, res) => {
  try {
    const studentData = req.body;
    console.log("Received student data:", studentData);

    // Validate required fields
    if (!studentData.studentName || !studentData.fatherName || !studentData.fatherMobile) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create a new student instance
    const newStudent = new Student(studentData);
    await newStudent.save(); // Save to the database

    // Send inquiry emails if provided
    if (studentData.fatherEmail) {
      await sendInquiryEmail(studentData.fatherEmail, studentData);
    }
    if (studentData.motherEmail) {
      await sendInquiryEmail(studentData.motherEmail, studentData);
    }

    res.status(201).json({ success: true, message: "Student submitted successfully", data: newStudent });
  } catch (error) {
    console.error("Student submission error:", error.message);
    res.status(500).json({ success: false, message: "Submission failed", error: error.message });
  }
};


exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching student:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch student" });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete student" });
  }
};
exports.approveForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { feeAmount } = req.body;  

    // Validate fee amount
    if (!feeAmount || isNaN(feeAmount) || feeAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid fee amount" });
    }

    // Find the form with the highest invoice number
    const lastOrder = await Form.find({ invoiceNo: { $regex: /^KSS-\d{6}$/ } })
      .sort({ invoiceNo: -1 }) // Sort invoiceNo descending
      .limit(1);


    let lastNumber = 700; // Default starting number
    if (lastOrder.length > 0) {
      const numberPart = parseInt(lastOrder[0].invoiceNo.split("-")[1]);
      if (!isNaN(numberPart)) {
        lastNumber = numberPart;
      }
    }

    const newInvoiceNo = `KSS-${String(lastNumber + 1).padStart(6, "0")}`;

    // Check if the form is already approved to avoid double invoicing
    const existingForm = await Form.findById(id);
    if (!existingForm) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }
    if (existingForm.isApproved && existingForm.invoiceNo) {
      return res.status(400).json({ success: false, message: "Form already approved" });
    }

    // Update the form to mark it as approved
    const form = await Form.findByIdAndUpdate(
      id,
      { isApproved: true, invoiceNo: newInvoiceNo, feeAmount }, // Add feeAmount to update
      { new: true }
    );

    // Send email notification to parents
    if (form.particularsOfParents) {
      const { FatherEmail, MotherEmail } = form.particularsOfParents; // Assuming these fields exist
      const studentData = {
        studentName: form.particularsOfChild?.fullName || "Student",
        admissionNumber: newInvoiceNo,
      };

      // Send email to father
      if (FatherEmail) {
        await sendAdmissionApprovalEmail(FatherEmail, { ...studentData, parentType: 'Father' });
      }

      // Send email to mother
      if (MotherEmail) {
        await sendAdmissionApprovalEmail(MotherEmail, { ...studentData, parentType: 'Mother' });
      }
    }

    res.status(200).json({ success: true, message: "Form approved successfully", data: form });
  } catch (error) {
    console.error("Error approving form:", error.message);
    res.status(500).json({ success: false, message: "Failed to approve form" });
  }
};


exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.status(200).json({ success: true, data: form });
  } catch (error) {
    console.error("Error fetching form:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch form" });
  }
};
exports.getApprovedForms = async (req, res) => {
  try {
    const approvedForms = await Form.find({ isApproved: true });

    if (approvedForms.length === 0) {
      return res.status(404).json({ success: false, message: "No approved forms found" });
      return res.$exists(202).json({suc})
    }

    res.status(200).json({ success: true, data: approvedForms });
  } catch (error) {
    console.error("Error fetching approved forms:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch approved forms" });
  }
};


 

 

  
 
const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-CA', options).split('/').join('-'); // Format to YYYY-MM-DD
};
exports.payForm = async (req, res) => {
  const { amount, paidBy, amountInWords, cashReceivedFrom, relationshipName, chequeDetails,
    qrTransactionId,
    bankTransferId,
    cashDenominations,
    receiverName,
  } = req.body;

  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).send("Form not found");

    form.feePayments = form.feePayments || [];

    // Fetch the last payment's invoice number
    const lastFormWithPayment = await Form.findOne({ "feePayments.0": { $exists: true } })
      .sort({ "feePayments._id": -1 })
      .select("feePayments");

    let lastNumber = 2083; // Default starting number
    if (lastFormWithPayment) {
      const lastPayment = lastFormWithPayment.feePayments[lastFormWithPayment.feePayments.length - 1];
      const lastId = lastPayment?._id || "";
      const match = lastId.match(/^CR-(\d{6})$/);
      if (match) {
        lastNumber = parseInt(match[1]);
      }
    }

    const newInvoiceNo = `CR-${String(lastNumber + 1).padStart(6, "0")}`;
    
    const newRemainingBalance = form.feeAmount - ((form.paidFee || 0) + amount);

    const newPayment = {
      _id: newInvoiceNo,
      amount,
      paidBy,
      amountInWords,
      cashReceivedFrom,
      relationshipName,
      chequeDetails,
      qrTransactionId,
      bankTransferId,
      cashDenominations,
      receiverName,
      date: formatDate(new Date()),
      remainingBalance: newRemainingBalance
    };

    form.paidFee = (form.paidFee || 0) + amount;
    form.feePayments.push(newPayment);

    await form.save();

    // Prepare student data for emails, including payment details
    const studentData = {
      studentName: form.particularsOfChild.fullName,
      fatherName: form.particularsOfParents.FatherName,
      fatherMobile: form.particularsOfParents.FatherMobile,
      motherName: form.particularsOfParents.MotherName,
      motherMobile: form.particularsOfParents.MotherMobile,
      admissionNumber: form.invoiceNo,
      class: form.admissionFor,
      paymentDetails: {
        _id: newInvoiceNo,
        amount,
        paidBy,
        amountInWords,
        cashReceivedFrom,
        relationshipName,
        chequeDetails,
        qrTransactionId,
        bankTransferId,
        cashDenominations,
        receiverName,
        date: newPayment.date,
        remainingBalance: newRemainingBalance
      }
    };

    // Send emails to both parents
    const fatherEmail = form.particularsOfParents.FatherEmail;
    const motherEmail = form.particularsOfParents.MotherEmail;

    if (fatherEmail) {
      await sendInquiryEmailToFather(fatherEmail, studentData);
    }

    if (motherEmail) {
      await sendInquiryEmailToMother(motherEmail, studentData);
    }

    res.send({
      message: "Payment successful",
      paymentId: newInvoiceNo,
      updatedForm: form,
    });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res.status(500).json({ success: false, message: "Payment processing failed" });
  }
};


exports.getPaymentsForForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    const feePaymentsWithFormId = form.feePayments.map(payment => ({
      ...payment.toObject(),  // convert Mongoose subdoc to plain JS object
      formId: form._id        // manually add the form ID
    }));

    res.status(200).json({
      success: true,
      data: {
        paymentId: form._id,
        cashNo:form.cashNo,
        totalPaid: form.paidFee,
        feePayments: feePaymentsWithFormId
      }
    });
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};



 
exports.getAllPayments = async (req, res) => {
  try {
    const forms = await Form.find({});

    const allPayments = forms.flatMap(form => {
      let totalPaidFee = 0; // Initialize total paid fee for each form

      return (form.feePayments || []).map(payment => {
        totalPaidFee += payment.amount || 0; // Accumulate the total paid fee

        // Calculate remaining amount for this payment
        const remaining = form.feeAmount - totalPaidFee; // Remaining amount after this payment

        return {
          paymentId: payment._id, 
          cashNo: payment.cashNo,             
          fullName: form.particularsOfChild?.fullName || "",
          fatherMobile: form.particularsOfParents?.FatherMobile || "",
          motherMobile: form.particularsOfParents?.MotherMobile || "",

          registerNo: form.invoiceNo || "",
          class: form.admissionFor || "",
          amount: payment.amount,
          paidBy: payment.paidBy,
          date: payment.date,
          feeAmount: form.feeAmount,
          paidFee: totalPaidFee, 
          remaining,  
          amountInWords: payment.amountInWords,
          cashReceivedFrom: payment.cashReceivedFrom,
          relationshipName: payment.relationshipName,
          chequeDetails: payment.chequeDetails,
          qrTransactionId: payment.qrTransactionId,
          bankTransferId: payment.bankTransferId,
          cashDenominations: payment.cashDenominations,
          receiverName: payment.receiverName,
        };
      });
    });

    res.status(200).json({
      success: true,
      data: allPayments
    });
  } catch (error) {
    console.error("Error fetching all payments:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch all payments" });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    // Prepare the payment history
    const paymentHistory = form.feePayments.map(payment => ({
      cashNo: payment.cashNo,
      date: payment.date,
      amount: payment.amount,
    }));

    // Calculate the overall paid fee
    const overallPaidFee = form.paidFee;

    res.status(200).json({
      success: true,
      data: {
        formId: form._id,
        overallPaidFee,
        paymentHistory,
      }
    });
  } catch (error) {
    console.error("Error fetching payment history:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch payment history" });
  }
};
exports.getOverallPayment = async (req, res) => {
  try {
    // Fetch all forms and calculate total paid fees
    const forms = await Form.find({});
    const totalPaid = forms.reduce((acc, form) => {
      return acc + (form.paidFee || 0);
    }, 0);

    // Fetch all expansive records and calculate total amount
    const expansives = await expansive.find({});
    const totalExpansiveAmount = expansives.reduce((acc, exp) => {
      return acc + (exp.approvedAmount || 0);
    }, 0);
 
    const adjustedTotalPaid = totalPaid - totalExpansiveAmount;

    res.status(200).json({
      success: true,
      BalanceAmount: adjustedTotalPaid, 
      totalPaid: totalPaid,
    });
  } catch (error) {
    console.error("Error fetching overall payment:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch overall payment" });
  }
};
exports.getCounts = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const formCount = await Form.countDocuments();
    const approvedFormCount = await Form.countDocuments({ isApproved: true });
    const forms = await Form.find({});
    // Calculate the total amount of fees collected
    const totalCollectedFees = await Form.aggregate([
      {
        $group: {
          _id: null, // Grouping by null to get a single result
          total: { $sum: { $ifNull: ["$paidFee", 0] } } // Sum the paidFee field, defaulting to 0 if null
        }
      }
    ]);

    const totalCollected = totalCollectedFees.length > 0 ? totalCollectedFees[0].total : 0; // Get the total amount or default to 0

    // Calculate the overall fee amount of all forms
    const totalFeeAmount = await Form.aggregate([
      {
        $group: {
          _id: null, // Grouping by null to get a single result
          total: { $sum: { $ifNull: ["$feeAmount", 0] } } // Sum the feeAmount field, defaulting to 0 if null
        }
      }
    ]);

    const overallFeeAmount = totalFeeAmount.length > 0 ? totalFeeAmount[0].total : 0; // Get the total fee amount or default to 0
    const totalPaid = forms.reduce((acc, form) => {
      return acc + (form.paidFee || 0);
    }, 0);

    // Fetch all expansive records and calculate total amount
    const expansives = await expansive.find({});
    const totalExpansiveAmount = expansives.reduce((acc, exp) => {
      return acc + (exp.approvedAmount || 0);
    }, 0);
 
    const adjustedTotalPaid = totalPaid - totalExpansiveAmount;
    res.status(200).json({
      success: true,
      data: {
        students: studentCount,
        forms: formCount,
        approvedForms: approvedFormCount,
        totalCollectedFees: totalCollected, // Include the total collected fees in the response
        overallFeeAmount,
        BalanceAmount: adjustedTotalPaid, 
        totalPaid: totalPaid,
        totalExpansiveAmount
      // Include the overall fee amount of all forms
      }
    });
  } catch (error) {
    console.error("Error getting counts:", error.message);
    res.status(500).json({ success: false, message: "Failed to get counts" });
  }
};
exports.promoteForm = async (req, res) => {
  try {
    const { id } = req.params; // Get the form ID from the request parameters
    const { newClass, newFeeAmount } = req.body; // Get the new class and fee amount from the request body

    // Validate the input
    if (!newClass || !newFeeAmount) {
      return res.status(400).json({ success: false, message: "New class and fee amount are required." });
    }

    // Find the existing form
    const existingForm = await Form.findById(id);
    if (!existingForm) {
      return res.status(404).json({ success: false, message: "Form not found." });
    }

    // Create a new form with duplicated admissionFor and feeAmount
    const newForm = new Form({
      ...existingForm.toObject(), // Copy existing form data
      admissionFor: newClass, // Update admissionFor
      feeAmount: newFeeAmount, // Update feeAmount
      paidFee: 0, // Reset paidFee to 0
      feePayments: [], // Reset feePayments to an empty array
      _id: undefined, // Ensure a new ID is created
      createdAt: undefined, // Reset timestamps
      updatedAt: undefined,
    });

    // Save the new form
    await newForm.save();

    res.status(201).json({ success: true, message: "Form promoted successfully.", data: newForm });
  } catch (error) {
    console.error("Error promoting form:", error.message);
    res.status(500).json({ success: false, message: "Failed to promote form." });
  }
};
