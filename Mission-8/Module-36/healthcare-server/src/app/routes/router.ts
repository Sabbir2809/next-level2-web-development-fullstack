import { Router } from "express";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { AppointmentRoutes } from "../modules/Appointment/appointment.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { DoctorRoutes } from "../modules/Doctor/doctor.routes";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/doctorSchedule.routes";
import { PatientRoutes } from "../modules/Patient/patient.routes";
import { PaymentRoutes } from "../modules/Payment/payment.routes";
import { ScheduleRoutes } from "../modules/Schedule/schedule.routes";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.routes";
import { UserRoutes } from "../modules/User/user.routes";
const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
