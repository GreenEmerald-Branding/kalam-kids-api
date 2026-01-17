const FollowUp = require('../module/followUpModel');
const Student = require('../module/student'); // Ensure the correct model name

// Add a new follow-up
exports.addFollowUp = async (req, res) => {
  try {
    const { enquiryId, followUpDate, remarks } = req.body;

    // Validate input
    if (!enquiryId || !followUpDate || !remarks) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create a new follow-up instance
    const newFollowUp = new FollowUp({ enquiryId, followUpDate, remarks });
    await newFollowUp.save();

    // Update the student document to include the follow-up reference
    await Student.findByIdAndUpdate(enquiryId, { $push: { followUps: newFollowUp._id } });

    res.status(201).json({ success: true, message: "Follow-Up added successfully", data: newFollowUp });
  } catch (error) {
    console.error("Error adding follow-up:", error.message);
    res.status(500).json({ success: false, message: "Failed to add follow-up", error: error.message });
  }
};

// Get follow-ups by enquiry ID
exports.getFollowUpsByEnquiryId = async (req, res) => {
  try {
    const { enquiryId } = req.params;
    const followUps = await FollowUp.find({ enquiryId });

    if (!followUps.length) {
      return res.status(200).json({ success: false, message: "No follow-ups found for this enquiry." });
    }

    // Map the follow-ups to include only the enquiryId and relevant details
    const responseData = followUps.map(followUp => ({
      enquiryId: followUp.enquiryId,
      followUpDate: followUp.followUpDate,
      remarks: followUp.remarks,
      createdAt: followUp.createdAt,
      updatedAt: followUp.updatedAt,
    }));

    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error("Error fetching follow-ups:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch follow-ups" });
  }
};
  