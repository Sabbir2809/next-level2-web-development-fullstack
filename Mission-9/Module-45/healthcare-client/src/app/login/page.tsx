"use client";
import logo from "@/assets/icons/charity-icon.png";
import { loginUser } from "@/services/actions/loginPatient";
import { storeUserInfo } from "@/services/auth.services";
import { Box, Button, Container, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

// Interface
export type TFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  // useRouter hook
  const router = useRouter();

  // useForm hook
  const { register, handleSubmit } = useForm<TFormData>();

  // on submit handler
  const onSubmit: SubmitHandler<TFormData> = async (values) => {
    try {
      const res = await loginUser(values);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success(res?.message);
        router.push("/");
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
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <TextField
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("email", { required: true })}
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
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
