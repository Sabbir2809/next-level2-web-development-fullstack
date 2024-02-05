import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StudentServices } from "./student.service";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsFromDB(req.query);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student are Retrieved Successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student is Retrieved Successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentFromDB(id, student);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student is Updated Successfully",
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(id);
  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student is Deleted Successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
};
