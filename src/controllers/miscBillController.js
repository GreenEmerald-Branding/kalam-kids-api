const MiscBill = require('../module/miscBillModel');
const Student = require('../module/student'); 
const Category = require('../module/Category'); // Import Category model

// Create a new miscellaneous bill
exports.createMiscBill = async (req, res) => {
    console.log('Received request to create miscellaneous bill'); // Debug log
    try {
        const { studentId, items, totalAmount, status, category, amountInWords, accountantName, payeeName, payeePhoneNumber, particulars, modeOfPayment } = req.body; // Added amountInWords, accountantName

        // Find the last bill to generate a new invoice number
        const lastBill = await MiscBill.findOne().sort({ invoiceNo: -1 });
        let newInvoiceNo = 'MISC-0001';
        if (lastBill && lastBill.invoiceNo) {
            const lastNo = parseInt(lastBill.invoiceNo.split('-')[1]);
            newInvoiceNo = `MISC-${String(lastNo + 1).padStart(4, '0')}`;
        }

        const newBill = new MiscBill({
            studentId,
            items,
            totalAmount,
            amountInWords, // Added
            accountantName, // Added
            status,
            invoiceNo: newInvoiceNo,
            category,
            payeeName,
            payeePhoneNumber,
            particulars,
            modeOfPayment,
        });

        await newBill.save();
        res.status(201).json({ success: true, message: "Miscellaneous bill created successfully", data: newBill });
    } catch (error) {
        console.error("Error creating miscellaneous bill:", error.message);
        res.status(500).json({ success: false, message: "Failed to create miscellaneous bill", error: error.message });
    }
};

// Get all miscellaneous bills
exports.getAllMiscBills = async (req, res) => {
    try {
        const bills = await MiscBill.find()
            .populate('studentId', 'studentName')
            .populate('category', 'name'); // Populate category name
        res.status(200).json({ success: true, data: bills });
    } catch (error) {
        console.error("Error fetching miscellaneous bills:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch miscellaneous bills" });
    }
};

// Get miscellaneous bills by student ID
exports.getMiscBillsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const bills = await MiscBill.find({ studentId })
            .populate('studentId', 'studentName')
            .populate('category', 'name'); // Populate category name
        res.status(200).json({ success: true, data: bills });
    } catch (error) {
        console.error("Error fetching miscellaneous bills for student:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch miscellaneous bills for student" });
    }
};

// Get a single miscellaneous bill by ID
exports.getMiscBillById = async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await MiscBill.findById(id)
            .populate('studentId', 'studentName')
            .populate('category', 'name'); // Populate category name
        if (!bill) {
            return res.status(404).json({ success: false, message: "Miscellaneous bill not found" });
        }
        res.status(200).json({ success: true, data: bill });
    } catch (error) {
        console.error("Error fetching miscellaneous bill:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch miscellaneous bill" });
    }
};

// Update a miscellaneous bill
exports.updateMiscBill = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedBill = await MiscBill.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBill) {
            return res.status(404).json({ success: false, message: "Miscellaneous bill not found" });
        }

        res.status(200).json({ success: true, message: "Miscellaneous bill updated successfully", data: updatedBill });
    } catch (error) {
        console.error("Error updating miscellaneous bill:", error.message);
        res.status(500).json({ success: false, message: "Failed to update miscellaneous bill", error: error.message });
    }
};

// Delete a miscellaneous bill
exports.deleteMiscBill = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBill = await MiscBill.findByIdAndDelete(id);
        if (!deletedBill) {
            return res.status(404).json({ success: false, message: "Miscellaneous bill not found" });
        }
        res.status(200).json({ success: true, message: "Miscellaneous bill deleted successfully" });
    } catch (error) {
        console.error("Error deleting miscellaneous bill:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete miscellaneous bill", error: error.message });
    }
};
