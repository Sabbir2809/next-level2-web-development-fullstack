"use client";
import logo from "@/assets/icons/charity-icon.png";
import HForm from "@/components/Forms/HForm";
import HInput from "@/components/Forms/HInput";
import { loginUser } from "@/services/actions/loginPatient";
import { registerPatient } from "@/services/actions/registerPatient";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// zod validation schema
const registerValidationSchema = z.object({
  password: z
    .string({ required_error: "Password is Required" })
    .min(6, "Must be at lest 6 characters!"),
  patient: z.object({
    name: z.string({ required_error: "Name is Required" }).min(3, "Please Enter Your Full Name!"),
    email: z
      .string({ required_error: "Email is Required" })
      .email("Please Enter Your Valid Email Address!"),

    contactNumber: z
      .string({
        required_error: "Contact Number is Required",
      })
      .regex(/^\d{11}$/, "Please Provide a Valid Phone Number!"),
    address: z
      .string({
        required_error: "Address is Required",
      })
      .min(3, "Please Enter Your Current Address"),
  }),
});

const RegisterPage = () => {
  // useRouter hook
  const router = useRouter();

  // register handle submit
  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);

    try {
      // register server action
      const res = await registerPatient(data);
      // checking response
      if (res?.data?.id) {
        // successfully register toast message
        toast.success(res?.message);
        // login server action
        const user = await loginUser({
          email: values.patient.email,
          password: values.password,
        });
        // checking response
        if (user?.data?.accessToken) {
          // set user info localStorage
          storeUserInfo({ accessToken: user?.data?.accessToken });
          // navigate home route
          router.push("/");
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            padding: 4,
            textAlign: "center",
          }}>
          {/* Logo and Title*/}
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box>
              <Image src={logo} alt="Logo" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          {/* Registration Form Section */}
          <Box>
            <HForm onSubmit={handleRegister} resolver={zodResolver(registerValidationSchema)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <HInput name="patient.name" type="text" label="Name" fullWidth={true} />
                </Grid>

                <Grid item md={6}>
                  <HInput name="patient.email" type="email" label="Email" fullWidth={true} />
                </Grid>
                <Grid item md={6}>
                  <HInput name="password" type="password" label="Password" fullWidth={true} />
                </Grid>

                <Grid item md={6}>
                  <HInput
                    name="patient.contactNumber"
                    type="tel"
                    label="Contact Number"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <HInput name="patient.address" type="text" label="Address" fullWidth={true} />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth={true}
                sx={{
                  margin: "10px 0px",
                }}>
                Register
              </Button>
              {/* Switch Login Page */}
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link href="/login" className="text-blue-500">
                  Login
                </Link>
              </Typography>
            </HForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
