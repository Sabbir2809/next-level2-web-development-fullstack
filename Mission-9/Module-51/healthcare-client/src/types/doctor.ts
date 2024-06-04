export interface IDoctor {
  id: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number | undefined;
  gender: "MALE" | "FEMALE";
  appointmentFee: number | undefined;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties?: TSpecialties[];
}

export type TSpecialties = {
  specialtiesId: string;
  isDeleted?: null;
};

export interface IDoctorFormData {
  doctor: IDoctor;
  password: string;
}

export interface Doctor {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  review: any[];
  doctorSpecialties: DoctorSpecialty[];
}

export interface DoctorSpecialty {
  specialtiesId: string;
  doctorId: string;
  specialties: any;
}

export interface IDoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
  appointmentId: string | null;
  doctor: Doctor;
  schedule: TSchedule;
}

export type TSchedule = {
  id: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
