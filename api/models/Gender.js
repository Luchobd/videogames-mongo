const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const GenderSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

GenderSchema.plugin(mongooseDelete, { overrideMethods: "all" });
const GenderModel = model("Gender", GenderSchema); // Creacion Modelo/Schema

module.exports = GenderModel;
