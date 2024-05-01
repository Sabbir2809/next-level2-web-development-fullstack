import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" py={2}>
        {/* logo text */}
        <Typography component={Link} href="/" variant="h4" fontWeight={600}>
          <Box component="span" color="primary.main">
            H
          </Box>
          ealth
          <Box component="span" color="primary.main">
            C
          </Box>
          are
        </Typography>

        {/* Features */}
        <Stack direction="row" gap={4} justifyContent="space-between">
          <Typography component={Link} href="/Consultation">
            consultation
          </Typography>
          <Typography component={Link} href="/health">
            Health Plains
          </Typography>
          <Typography component={Link} href="/medicine">
            Medicine
          </Typography>
          <Typography component={Link} href="/diagnostics">
            Diagnostics
          </Typography>
          <Typography component={Link} href="/NGOs">
            NGOs
          </Typography>
        </Stack>
        <Button component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
