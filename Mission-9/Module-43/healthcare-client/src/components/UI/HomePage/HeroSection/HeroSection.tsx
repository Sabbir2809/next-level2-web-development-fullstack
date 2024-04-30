import doctor1 from "@/assets/images/doctor1.png";
import doctor2 from "@/assets/images/doctor2.png";
import doctor3 from "@/assets/images/doctor3.png";
import stethoscope from "@/assets/images/stethoscope.png";
import arrow from "@/assets/svgs/arrow.svg";
import grid from "@/assets/svgs/grid.svg";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 20,
      }}>
      {/* Left side */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}>
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-90px",
            left: "-120px",
          }}>
          <Image src={grid} alt="grid" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Healthier Hearts
        </Typography>
        <Typography variant="h3" component="h1">
          Comes From
        </Typography>
        <Typography variant="h3" component="h1" color="primary.main">
          Preventive Care
        </Typography>
        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          sx={{
            my: 4,
          }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi optio quia quam error, hic
          dolore ipsum fugiat, omnis ea, enim assumenda. Sed ex est ea fugiat facilis. Est, sequi.
          Porro!
        </Typography>

        {/* Button */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}>
          <Button>Make Appointment</Button>
          <Button variant="outlined">Contact Us</Button>
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 0,
        }}>
        {/* arrow sign */}
        <Box
          sx={{
            position: "absolute",
            left: "200px",
            top: "-30px",
          }}>
          <Image src={arrow} alt="arrow" width={100} height={100} />
        </Box>
        {/* Image */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}>
          {/* doctor-1 */}
          <Box mt={4}>
            <Image src={doctor1} alt="doctor1" width={240} height={380} />
          </Box>
          {/* doctor-2 */}
          <Box>
            <Image src={doctor2} alt="doctor2" width={240} height={380} />
          </Box>
        </Box>
        {/* doctor-3 */}
        <Box
          sx={{
            position: "absolute",
            top: "220px",
            left: "150px",
          }}>
          <Image src={doctor3} alt="doctor3" width={240} height={240} />
        </Box>
        {/* stethoscope */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            right: 0,
            zIndex: "-1",
          }}>
          <Image src={stethoscope} alt="stethoscope" width={180} height={180} />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
