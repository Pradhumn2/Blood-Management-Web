const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;
    const user = await userModel.findOne({ email });

    //Validation Check
    if (!user) {
      throw new Error("User not found");
    }
    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donar account");
    }
    if (inventoryType === "out" && user.role !== "hospital") {
      throw new Error("Not a hospital");
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

module.exports = { createInventoryController, getInventoryController };
