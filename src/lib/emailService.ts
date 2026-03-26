import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function send(subject: string, message: string) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      to_email: "muggu@mmkaisolutions.com",
      subject,
      message,
      submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    },
    PUBLIC_KEY
  );
}

export async function sendAdmissionEmail(data: {
  studentName: string;
  age: string;
  grade: string;
  schoolName: string;
  parentName: string;
  parentEmail: string;
  parentMobile: string;
  city: string;
  programLevel: string;
  interests: string;
  heardFrom: string;
}) {
  const message = `
NEW ADMISSION APPLICATION
=========================
Student Name   : ${data.studentName}
Age            : ${data.age}
Grade          : ${data.grade}
School         : ${data.schoolName}
City           : ${data.city}

PARENT / GUARDIAN
-----------------
Parent Name    : ${data.parentName}
Mobile         : ${data.parentMobile}
Email          : ${data.parentEmail}

PROGRAM
-------
Level Selected : ${data.programLevel}
Interests      : ${data.interests || "Not provided"}
Heard From     : ${data.heardFrom || "Not provided"}
  `.trim();

  return send(`New Admission – ${data.studentName}`, message);
}

export async function sendInternshipEmail(data: {
  studentName: string;
  classGrade: string;
  schoolName: string;
  cityState: string;
  parentName: string;
  parentContact: string;
  studentEmail: string;
  whyJoin: string;
  preferredMode: string;
}) {
  const message = `
NEW INTERNSHIP APPLICATION
==========================
Student Name   : ${data.studentName}
Class / Grade  : ${data.classGrade}
School         : ${data.schoolName}
City / State   : ${data.cityState}

PARENT / GUARDIAN
-----------------
Parent Name    : ${data.parentName}
Contact        : ${data.parentContact}
Student Email  : ${data.studentEmail || "Not provided"}

DETAILS
-------
Why Join       : ${data.whyJoin}
Preferred Mode : ${data.preferredMode}
  `.trim();

  return send(`New Internship Application – ${data.studentName}`, message);
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  mobile: string;
  role?: string;
  message?: string;
}) {
  const message = `
NEW INQUIRY / GET STARTED
=========================
Name           : ${data.name}
Role           : ${data.role || "Not specified"}
Email          : ${data.email}
Mobile         : ${data.mobile}
Message        : ${data.message || "No message provided"}
  `.trim();

  return send(`New Inquiry – ${data.name}`, message);
}
