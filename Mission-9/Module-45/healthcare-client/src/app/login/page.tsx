import logo from "@/assets/icons/charity-icon.png";
import { Box, Button, Container, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";

const LoginPage = () => {
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
            <form>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <TextField
                    id="outlined-basic"
                    type="email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
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
                  />
                </Grid>
              </Grid>
              <Typography component="p" fontWeight={300} textAlign="end" marginBottom="1">
                <Link href="/forget-password" className="text-blue-500">
                  Forget Password?
                </Link>
              </Typography>

              <Button
                fullWidth={true}
                sx={{
                  margin: "10px 0px",
                }}>
                Login
              </Button>
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
