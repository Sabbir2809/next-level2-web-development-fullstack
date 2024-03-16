# Healthcare Web App

HealthCare is a robust and comprehensive healthcare management system designed
to streamline communication and appointment processes between patients, doctors,
and administrators. The system incorporates cutting-edge technologies such as
NodeJS, Express, Prisma, WEB RTC (via Agora.io), and PostgreSQL for efficient and
secure data management.

## Technologies

1. NodeJS and Express: Used for server-side application development.
1. WEB RTC (Agora.io): Third-party service for real-time communication between doctors and patients.
1. Prisma: ORM (Object-Relational Mapping) tool for database management.
1. PostgreSQL: Database management system.
1. NextJS: A React Framework for building applications.

### User Roles and Functionalities

1. **Admin:**

   - **Account Management:**
     - Create and manage doctor accounts.
   - **Appointment Management:**
     - Create schedule slots
     - Manage doctor appointment slots (Change status of appointment).
   - **Access to Information:**
     - View appointment history and details.
     - Access and manage doctor profiles.
     - View metadata

2. **Doctor:**

   - **Appointment Management:**
     - View upcoming appointments.
     - Set appointment slots
     - Take appointments.
   - **Patient Profile:**
     - Access patient profiles and medical history
     - View uploaded diagnostic test reports of patients.
     - View previous prescriptions (if any).
   - **Prescription Management:**
     - Generate prescriptions for patients during and after consultations.
     - Send prescriptions to patients through email by using the system.
     - Attach additional medical notes and instructions to prescriptions

3. Patient
   - **Account Management:**
     - Register a new account during the first visit.
     - Leverage features for password recovery and account security.
   - **Appointment Booking:**
     - Schedule appointments with available time slots.
     - Book appointments with specific doctors.
   - **Medical Record Management:**
     - Manage personal profile data.
     - Maintain medical history.
     - Upload diagnostic test reports.
   - **Prescription Access:**
     - Access and view prescriptions.
     - Receive prescriptions through the platform.
     - Additionally, prescriptions are emailed to the patient for easy access and reference.
   - **Payment and Confirmation:**
     - Pay consultation fees when booking appointments.
     - Receive an email confirmation with an invoice after successful payment.
     - Appointments are confirmed only after payment.
     - If payment is not made within 30 minutes of booking, the booking will be automatically canceled.
   - **Reviews:**
     - Provide reviews with ratings for consulting doctors.
     - Include a comment section for additional feedback.
     - View and manage previously submitted reviews

### System Features

1. Real-time communication through WEB RTC.
1. Secure user authentication and authorization.
1. Seamless appointment scheduling and management.
1. Comprehensive patient profiles and medical records.
1. Seamless integration for patients to pay consultation fees securely.
1. Automated email notifications for appointment confirmations, invoices, and prescription delivery.
1. Doctors can generate detailed prescriptions during and after consultations.
