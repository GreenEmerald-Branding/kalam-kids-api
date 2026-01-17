const PredefinedMiscItem = require("../module/predefinedMiscItemModel");

// Create a new predefined misc item
exports.createPredefinedMiscItem = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const newItem = new PredefinedMiscItem({ name, amount });
    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all predefined misc items
exports.getAllPredefinedMiscItems = async (req, res) => {
  try {
    const items = await PredefinedMiscItem.find();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a predefined misc item
exports.updatePredefinedMiscItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount } = req.body;
    const updatedItem = await PredefinedMiscItem.findByIdAndUpdate(
      id,
      { name, amount },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a predefined misc item
exports.deletePredefinedMiscItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await PredefinedMiscItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};