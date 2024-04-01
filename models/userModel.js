const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      require: [true, "Role is required !"],
      enum: ["admin", "organisation", "donar", "hospital"],
    },
    name: {
      type: String,
      require: function () {
        if (this.role === "donar" || this.role === "admin") {
          return true;
        } else {
          return false;
        }
      },
    },
    organisationName: {
      type: String,
      require: function () {
        if (this.role === "organisation") return true;
        else return false;
      },
    },
    hospitalName: {
      type: String,
      require: function () {
        if (this.role === "hospital") return true;
        else return false;
      },
    },
    email: {
      type: String,
      require: [true, "Email is requied !"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is requied !"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      require: [true, "Address is required !"],
    },
    phone: {
      type: String,
      require: [true, "Phone number is required !"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
