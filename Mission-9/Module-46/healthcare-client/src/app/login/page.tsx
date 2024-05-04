"use client";
import logo from "@/assets/icons/charity-icon.png";
import HForm from "@/components/Forms/HForm";
import HInput from "@/components/Forms/HInput";
import { loginUser } from "@/services/actions/loginPatient";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// zod validation schema
const loginValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .email("Please Enter Your Valid Email Address"),
  password: z
    .string({ required_error: "Password is Required" })
    .min(6, "Must be at lest 6 characters"),
});

const LoginPage = () => {
  // useRouter hook
  const router = useRouter();
  const [error, setError] = useState("");

  // login onSubmit handler
  const handleLogin = async (values: FieldValues) => {
    try {
      //server actions
      const res = await loginUser(values);
      // checking response
      if (res?.data?.accessToken) {
        // set user info localStorage
        storeUserInfo({ accessToken: res?.data?.accessToken });
        // success toast message
        toast.success(res?.message);
        // navigate
        router.push("/");
      } else {
        setError(res?.message);
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
                Login Healthcare
              </Typography>
            </Box>
          </Stack>
          {/* Error Message */}
          {error && (
            <Box>
              <Alert severity="warning" color="warning">
                {error}
              </Alert>
            </Box>
          )}
          <Box>
            <HForm onSubmit={handleLogin} resolver={zodResolver(loginValidationSchema)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <HInput name="email" type="email" label="Email Address" fullWidth={true} />
                </Grid>
                <Grid item md={6}>
                  <HInput name="password" type="password" label="Password" fullWidth={true} />
                </Grid>
              </Grid>

              {/* Forget Password Page */}
              <Typography component="p" fontWeight={300} textAlign="end" marginBottom="1">
                <Link href="/forget-password" className="text-blue-500">
                  Forget Password?
                </Link>
              </Typography>

              <Button
                type="submit"
                fullWidth={true}
                sx={{
                  margin: "10px 0px",
                }}>
                Login
              </Button>

              {/* Register page */}
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-500">
                  Register
                </Link>
              </Typography>
            </HForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
