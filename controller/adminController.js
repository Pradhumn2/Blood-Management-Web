const userModel = require("../models/userModel");

const getDonarListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    // console.log(donarData);
    res.status(200).json({
      success: "true",
      totalCount: donarData.length,
      message: "donar list fetched successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: "false",
      message: "Error in get donar list for admin",
      error,
    });
  }
};

const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    // console.log(hospitalData);
    res.status(200).json({
      success: "true",
      totalCount: hospitalData.length,
      message: "hospital list fetched successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: "false",
      message: "Error in get hospital list for admin",
      error,
    });
  }
};

const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    // console.log(orgData);
    res.status(200).json({
      success: "true",
      totalCount: orgData.length,
      message: "organisation list fetched successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: "false",
      message: "Error in get organisation list for admin",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: "true",
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: "false",
      message: "Error in deleting user",
      error,
    });
  }
};

//export
module.exports = {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteUserController
};
