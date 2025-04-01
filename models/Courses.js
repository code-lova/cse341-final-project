const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d+(\.\d{1,2})?$/.test(value); // Allows integers and up to 2 decimal places
        },
        message: "Amount must be a valid number with up to two decimal places",
      },
    },
    courseType: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
