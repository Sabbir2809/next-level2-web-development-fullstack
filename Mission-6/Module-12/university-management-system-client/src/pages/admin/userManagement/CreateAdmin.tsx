import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagementApi";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagementApi";

const adminData = {
  name: {
    firstName: "Nuri",
    middleName: "",
    lastName: "Islam",
  },
  gender: "Male",
  bloodGroup: "O+",

  email: "nuri@gmail.com",
  contactNo: "2",
  emergencyContactNo: "2",

  designation: "Admin",

  presentAddress: "123 Main Street",
  permanentAddress: "456 Elm Street",
};

const CreateAdmin = () => {
  const [addAdmin] = useAddAdminMutation();
  const { data: aData, isLoading: aIsLoading } = useGetAcademicDepartmentsQuery(undefined);

  const departmentOptions = aData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const adminData = {
      faculty: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);
    addAdmin(data);
  };

  return (
    <Row>
      <Col span={24}>
        <UMForm onSubmit={onSubmit} defaultValues={adminData}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMSelect name="bloodGroup" label="Blood Group" options={bloodGroupOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      size="large"
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <UMInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="contactNo" label="Contact No." />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="emergencyContactNo" label="Emergency Contact No." />
            </Col>
          </Row>
          <Divider>Address</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="presentAddress" label="Present Address" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMInput type="text" name="permanentAddress" label="Permanent Address" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <UMSelect
                name="academicDepartmentId"
                label="Academic Department"
                options={departmentOptions}
                disabled={aIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Row>
  );
};
export default CreateAdmin;
