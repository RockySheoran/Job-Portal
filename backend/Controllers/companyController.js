import { companyModel } from "../Model/companyModel.js";
import cloudinary from "../utils/Cloudinary.js";
import { getDataUri } from "../utils/DataUri.js";

export const companyRegister = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await companyModel.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you cannot register same company",
        success: false,
      });
    }
    company = await companyModel.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "company register successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await companyModel.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "companies get successfully",
      success: true,
      companies,

    })
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary
    const fileUri = getDataUri(file);

    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudinaryResponse.secure_url;


    const updateData = { name, description, website, location, logo };

    const company = await companyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!company) {
      return res.status(400).json({
        message: "company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "company updated successfully",
      status: true,
      company
    })
  } catch (error) {
    console.log(error);
  }
};

export const getCompDeleteByAdminId = async (req, res) => {
  try {
    const adminId = req.id; // Assuming req.id contains the admin ID
    // console.log("Admin ID:", adminId);

    const { ComId } = req.body; // Extract jobId from the request body
    // console.log("Job ID to delete:", ComId);

    // Find and delete the job by ID
    const company = await companyModel.findByIdAndDelete(ComId);

    if (!company) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
