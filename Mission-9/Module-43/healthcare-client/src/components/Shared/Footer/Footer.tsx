import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography component={Link} href="/Consultation" color="#fff">
            consultation
          </Typography>
          <Typography component={Link} href="/health" color="#fff">
            Health Plains
          </Typography>
          <Typography component={Link} href="/medicine" color="#fff">
            Medicine
          </Typography>
          <Typography component={Link} href="/diagnostics" color="#fff">
            Diagnostics
          </Typography>
          <Typography component={Link} href="/NGOs" color="#fff">
            NGOs
          </Typography>
        </Stack>

        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Link href="/">
            <Image src={facebookIcon} alt="Facebook" width={30} height={30} />
          </Link>
          <Link href="/">
            <Image src={linkedinIcon} alt="Facebook" width={30} height={30} />
          </Link>
          <Link href="/">
            <Image src={instagramIcon} alt="Facebook" width={30} height={30} />
          </Link>
          <Link href="/">
            <Image src={twitterIcon} alt="Facebook" width={30} height={30} />
          </Link>
        </Stack>

        <div className="border-b-[1px] border-dashed"></div>
        <Stack direction="row" gap={2} justifyContent="space-between" alignItems="center" py={3}>
          <Typography component="p" color="white">
            @2024 PHealthcare. All Rights Reserved.
          </Typography>
          <Typography component={Link} href="/" variant="h4" fontWeight={600} color="white">
            <Box component="span" color="primary.main">
              H
            </Box>
            ealth
            <Box component="span" color="primary.main">
              C
            </Box>
            are
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy! Terms and Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
