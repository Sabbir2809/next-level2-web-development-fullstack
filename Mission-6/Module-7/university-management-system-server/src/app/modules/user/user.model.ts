import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { UserStatus } from "./user.constant";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// middleware hook: pre
userSchema.pre("save", async function (next) {
  // hashing password and dave into DB
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

// middleware hook: post
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// statics
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

const User = model<IUser, UserModel>("User", userSchema);
export default User;
