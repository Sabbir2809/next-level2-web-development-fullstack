"use client";
import logo from "@/assets/icons/charity-icon.png";
import { registerPatient } from "@/services/actions/registerPatient";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

// Interface
interface IPatientRegisterFromData {
  password: string;
  patient: {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
}

const RegisterPage = () => {
  // useRouter hook
  const router = useRouter();
  // useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPatientRegisterFromData>();

  // on submit handler
  const onSubmit: SubmitHandler<IPatientRegisterFromData> = async (values) => {
    const data = modifyPayload(values);

    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
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

          {/* Registration Info */}
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.name", { required: true })}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.email", { required: true })}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="outlined-basic"
                    type="password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("password", { required: true })}
                  />
                </Grid>

                <Grid item md={6}>
                  <TextField
                    id="outlined-basic"
                    type="tel"
                    label="Phone"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.contactNumber", { required: true })}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="outlined-basic"
                    type="text"
                    label="Address"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.address", { required: true })}
                  />
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
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
