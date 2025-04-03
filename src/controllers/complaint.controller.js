import { Complaint } from "../models/complaint.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";

export const createComplaint = async (req, res) => {
    try {
        const { type, message, transactionId } = req.body;
        const userId = req.user._id; // Assuming authentication middleware
        

        if (!["Billing Issue", "Meter Issue", "Power Outage", "Other", "Feedback"].includes(type)) {
            return res.status(400).json({ message: "Invalid complaint type" });
        }

        const newComplaint = new Complaint({
            userId,
            type,
            message,
            transactionId: type === "Billing Issue" ? transactionId : null
        });

        await newComplaint.save();
        res.status(201).json({ message: "Complaint registered successfully", complaint: newComplaint });
    } catch (error) {
        res.status(500).json({ message: "Error creating complaint", error });
    }
};
export const getAllComplaints = asyncHandler(async (req, res) => {
    const complaints = await Complaint.find();

    if (!complaints.length) {
        return res.status(404).json(new ApiResponse(404, "No complaints found"));
    }

    res.status(200).json(new ApiResponse(200, "Complaints fetched successfully", complaints));
});

export const updateComplaintStatus = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { status } = req.body;

        if (!["Open", "In Progress", "Resolved"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId, 
            { status }, 
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ message: "Complaint status updated", complaint: updatedComplaint });
    } catch (error) {
        res.status(500).json({ message: "Error updating complaint status", error });
    }
};

export const deleteComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

        if (!deletedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting complaint", error });
    }
};
