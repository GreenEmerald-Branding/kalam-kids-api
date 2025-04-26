const expansive = require('../module/expansive');
const Category = require("../module/Category");

exports.submitExpansive = async (req, res) => {
    try {
        const newExpansive = new expansive(req.body);
        await newExpansive.save();
        res.status(201).json({ success: true, message: "Payment submitted successfully", data: newExpansive });
    } catch (error) {
        console.error("Error saving payment:", error.message);
        res.status(500).json({ success: false, message: "Failed to save payment", error: error.message });
    }
};

exports.getAllExpansive = async (req, res) => {
    try {
        const expansives = await expansive.find();
        res.status(200).json({ success: true, data: expansives });
    } catch (error) {
        console.error("Error fetching payments:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch payments" });
    }
};

exports.updateExpansive = async (req, res) => {
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

exports.deleteExpansive = async (req, res) => {
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

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch categories" });
    }
};

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.error("Error adding category:", error.message);
        res.status(500). json({ success: false, message: "Failed to add category" });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        console.error("Error updating category:", error.message);
        res.status(500).json({ success: false, message: "Failed to update category" });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete category", error: error.message });
    }
};
exports.approveExpansive = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the request parameters

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

    // Update the expansive record to set approved to true and generate a new invoice number
    expansiveRecord.approved = true;
    expansiveRecord.invoiceNo = `VR-${String(lastNumber + 1).padStart(6, "0")}`; // Generate new invoice number

    // Save the updated record
    await expansiveRecord.save();

    res.status(200).json({ success: true, message: "Expansive approved successfully", data: expansiveRecord });
  } catch (error) {
    console.error("Error approving expansive:", error.message);
    res.status(500).json({ success: false, message: "Failed to approve expansive", error: error.message });
  }
};