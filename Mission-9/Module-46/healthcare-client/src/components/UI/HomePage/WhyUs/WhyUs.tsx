import chooseUs from "@/assets/choose-us.png";
import award from "@/assets/svgs/award-icon.svg";
import call from "@/assets/svgs/call-icon.svg";
import care from "@/assets/svgs/care-icon.svg";
import equipment from "@/assets/svgs/medical-equipment-icon.svg";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const servicesData = [
  {
    imageSrc: award,
    title: "Award Winning Service",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: care,
    title: "Best Quality Pregnancy Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: equipment,
    title: "Complete Medical Equipments",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: call,
    title: "Dedicated Emergency Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
];

const WhyUs = () => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography color="primary" variant="h6" component="h1" fontWeight={700}>
            Why Us
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Why Choose Us
          </Typography>
        </Box>
        {/* Features */}
        <Grid container spacing={2} my={4}>
          <Grid item md={6}>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "15px",
                alignItems: "center",
                borderRadius: "10px 10px 100px 10px",
              }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}>
                <Image src={servicesData[0].imageSrc} alt="award" width={50} />
              </Box>
              <Box>
                <Typography variant="h6" component="h1" fontWeight={600}>
                  {servicesData[0].title}
                </Typography>
                <Typography variant="body2" color="primary.body1" fontWeight={300}>
                  {servicesData[0].description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "15px",
                alignItems: "center",
                borderRadius: "10px 100px 10px 10px",
                margin: "10px 0px",
              }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}>
                <Image src={servicesData[1].imageSrc} alt="award" width={50} />
              </Box>
              <Box>
                <Typography variant="h6" component="h1" fontWeight={600}>
                  {servicesData[1].title}
                </Typography>
                <Typography variant="body2" color="primary.body1" fontWeight={300}>
                  {servicesData[1].description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "15px",
                alignItems: "center",
                borderRadius: "10px 10px 100px 10px",
              }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}>
                <Image src={servicesData[2].imageSrc} alt="award" width={50} />
              </Box>
              <Box>
                <Typography variant="h6" component="h1" fontWeight={600}>
                  {servicesData[2].title}
                </Typography>
                <Typography variant="body2" color="primary.body1" fontWeight={300}>
                  {servicesData[2].description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "15px",
                alignItems: "center",
                borderRadius: "10px 100px 10px 10px",
                margin: "10px 0px",
              }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}>
                <Image src={servicesData[3].imageSrc} alt="award" width={50} />
              </Box>
              <Box>
                <Typography variant="h6" component="h1" fontWeight={600}>
                  {servicesData[3].title}
                </Typography>
                <Typography variant="body2" color="primary.body1" fontWeight={300}>
                  {servicesData[3].description}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Image */}
          <Grid
            item
            md={6}
            sx={{
              display: "flex",
            }}>
            <Box
              sx={{
                justifyContent: "center",
                margin: "0px auto",
              }}>
              <Image src={chooseUs} alt="Choose Us" width={360} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhyUs;
