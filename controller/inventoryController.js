const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { donarEmail } = req.body;
    const { organisationEmail } = req.body;

    // console.log(donarEmail);
    // console.log("hello", organisationEmail);

    const user = await userModel.findOne({ email: donarEmail });
    const org = await userModel.findOne({ email: organisationEmail });

    //Validation Check
    // console.log("user id", user);
    // console.log("org id", org);

    if (!user) {
      throw new Error("User not found");
    }

    if (!org) {
      throw new Error("Organisation not found");
    }
    if (req.body.inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
    }
    if (req.body.inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital account");
    }

    if (req.body.inventoryType === "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(org);

      console.log("organisation is ", organisation);
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
      console.log("Total In", totalInOfRequestedBlood);

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

      console.log("total IN ", totalIn);
      console.log("total out ", totalOut);
      //in and out calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;

      //quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      delete req.body.userId;
      delete req.body.organisationEmail;

      req.body.hospital = user?._id;
      req.body.organisation = org?._id;
    } else {
      req.body.donar = user?._id;
      req.body.organisation = org?._id;
    }

    console.log(req.body);

    //save new record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    console.log("upto here");
    return res.status(201).json({
      success: "Success",
      message: "New Blood Bank record added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: error.message,
    });
  }
};

// get all blood record
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

// get all hospital blood record

const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 }); //filters
    return res.status(200).json({
      success: "Success",
      message: "Get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in get hospital consumer inventory",
    });
  }
};

// GET BLOOD RECORD OF 3

// const getRecentInventoryController = async (req, res) => {
//   try {
//     const inventory = await inventoryModel
//       .find({
//         organidation: req.body.userId,
//       })
//       .limit(3)
//       .sort({ createdAt: -1 });
//     return res.status(200).send({
//       success: true,
//       message: "Recent Inventory Data",
//       inventory,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: "Failed",
//       message: "Error in get blood record for analytics",
//     });
//   }
// };

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

//********** GET ORG CONTROLLER FOR DONARS******************* */
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });

    //finding organisations
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });

    // console.log("donar is ", donar);
    // console.log("organisation id is ", organisations);

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

//********** GET ORG CONTROLLER FOR HOSPITAL******************* */

const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });

    //finding organisations
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });

    // console.log("donar is ", hospital);
    // console.log("organisation id is ", organisations);

    return res.status(200).send({
      success: true,
      message: "Hospital org data fetched successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "Failed",
      message: "Error in organisation records API for hospitals",
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
  getOrganisationForHospitalController,
  getInventoryHospitalController,
};
