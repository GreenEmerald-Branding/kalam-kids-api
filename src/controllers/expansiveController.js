const expansive = require('../module/expansive');

const submitExpansive = async (req, res) => {
    try {
        const newExpansive = new expansive(req.body);
        await newExpansive.save();
        res.status(201).json({ success: true, message: "Payment submitted successfully", data: newExpansive });
    } catch (error) {
        console.error("Error saving payment:", error.message);
        res.status(500).json({ success: false, message: "Failed to save payment", error: error.message });
    }
};

const getAllExpansive = async (req, res) => {
    try {
        const expansives = await expansive.find();
        res.status(200).json({ success: true, data: expansives });
    } catch (error) {
        console.error("Error fetching payments:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch payments" });
    }
};

const updateExpansive = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const updatedData = req.body; // Get the updated data from the request body

        // Find the expansive record by ID and update it
        const updatedExpansive = await expansive.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedExpansive) {
            return res.status(404).json({ success: false, message: "Expansive not found" });
        }

        res.status(200).json({ success: true, message: "Expansive updated successfully", data: updatedExpansive });
    } catch (error) {
        console.error("Error updating expansive:", error.message);
        res.status(500).json({ success: false, message: "Failed to update expansive", error: error.message });
    }
};

const deleteExpansive = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const deletedExpansive = await expansive.findByIdAndDelete(id);
        if (!deletedExpansive) {
            return res.status(404).json({ success: false, message: "Expansive not found" });
        }
        res.status(200).json({ success: true, message: "Expansive deleted successfully" });
    } catch (error) {
        console.error("Error deleting expansive:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete expansive", error: error.message });
    }
};
const approveExpansive = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      const { amount } = req.body;
  
      // Find the expansive record by ID
      const expansiveRecord = await expansive.findById(id);
      if (!expansiveRecord) {
        return res.status(404).json({ success: false, message: "Expansive not found" });
      }
  
      // Check if the record is already approved
      if (expansiveRecord.approved) {
        return res.status(400).json({ success: false, message: "Expansive is already approved" });
      }
  
      // Generate new invoice number
      const lastOrder = await expansive.find({ invoiceNo: { $regex: /^VR-\d{6}$/ } })
        .sort({ invoiceNo: -1 }) // Sort invoiceNo descending
        .limit(1);
  
      let lastNumber = 1080; // Default starting number
      if (lastOrder.length > 0) {
        const numberPart = parseInt(lastOrder[0].invoiceNo.split("-")[1]);
        if (!isNaN(numberPart)) {
          lastNumber = numberPart;
        }
      }
  
      // Update the expansive record to set approved to true, generate a new invoice number, and set the approval date
      expansiveRecord.approved = true;
      expansiveRecord.approvedAmount = amount;
      expansiveRecord.invoiceNo = `VR-${String(lastNumber + 1).padStart(6, "0")}`;
      expansiveRecord.approvalDate = new Date(); // Set the current date as the approval date
  
      // Save the updated record
      await expansiveRecord.save();
  
      res.status(200).json({ success: true, message: "Expansive approved successfully", data: expansiveRecord });
    } catch (error) {
      console.error("Error approving expansive:", error.message);
      res.status(500).json({ success: false, message: "Failed to approve expansive", error: error.message });
    }
};

module.exports = {
    submitExpansive,
    getAllExpansive,
    updateExpansive,
    deleteExpansive,
    approveExpansive
};