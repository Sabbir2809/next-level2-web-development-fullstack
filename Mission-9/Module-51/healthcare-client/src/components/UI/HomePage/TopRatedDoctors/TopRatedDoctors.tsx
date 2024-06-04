import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const TopRatedDoctors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?page=1&limit=3`);
  const { data: doctors } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20, 20, 0.1)",
        clipPath: "polygon(0 0,  100% 25%, 100% 100%, 0 75%)",
      }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Top Rated Doctors
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18} sx={{ marginTop: 2 }}>
          Access to Expert Physicians and Surgeons, Advanced Technologies
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18}>
          and Top Rated Surgery Facilities Right Here
        </Typography>
      </Box>
      <Container
        sx={{
          margin: "30px auto",
        }}>
        <Grid container spacing={2}>
          {doctors.map((doctor: any) => (
            <Grid item key={doctor.id} md={4}>
              <Card>
                <Box
                  sx={{
                    width: "100%",
                    height: 400,
                    "& img": {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      objectFit: "cover",
                    },
                  }}>
                  {doctor.profilePhoto ? (
                    <Image src={doctor.profilePhoto} alt={doctor.name} width={500} height={300} />
                  ) : null}
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <LocationOnIcon /> {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    paddingBottom: "20px",
                  }}>
                  <Button>Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
          }}>
          <Button
            component={Link}
            href="/doctors"
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}>
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
