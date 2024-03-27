const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    //Validation Check
    if (!user) {
      throw new Error("User not found");
    }

    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    console.log("hello");

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      //calculating blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //calculate out blood quantity
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in and out calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;

      //quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save new record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).json({
      success: "Success",
      message: "New Blood Bank record added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in fetching data from API",
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 }); //filters
    return res.status(200).json({
      success: "Success",
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in get all inventory",
    });
  }
};

/********************* GET DONAR RECORD *********************/

const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // console.log(donarId);
    const donars = await userModel.find({ _id: { $in: donarId } }); //matching user id with donar id

    return res.status(200).send({
      success: true,
      message: "Donar record fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in Donar records",
      error,
    });
  }
};

//*************** GET HOSPITAL RECORD  ******************  */
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    //get hospital id
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });

    //find hospital
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });

    return res.status(200).send({
      success: true,
      message: "Hospital record fetched successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in hospital records",
      error,
    });
  }
};

//********** GET ORG CONTROLLER******************* */
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });

    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });

    return res.status(200).send({
      success: true,
      message: "ORG data fetched successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in organisation records",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
};
