const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInquiryEmail = async (to, studentData) => {
  try {
    // Read the HTML template
    const templatePath = path.join(__dirname, "Templetes/inquiryNotification.html");
    let template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual data
    template = template
      .replace('{{studentName}}', studentData.studentName)
      .replace('{{fatherName}}', studentData.fatherName)
      .replace('{{fatherMobile}}', studentData.fatherMobile);

    // Mail options for the parent
    const mailOptionsToParent = {
      from: process.env.EMAIL_USER, // Use the environment variable for the sender's email
      to: to, // Father's email
      subject: 'New Student Enquiry Notification',
      html: template,
    };

    // Send email to the parent
    await transporter.sendMail(mailOptionsToParent);
    console.log(`📧 Enquiry email sent to: ${to}`);

    // Mail options for yourself (admin)
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '📩 New Inquiry Received',
      html: `
        <h1>New Enquiry from ${studentData.studentName}</h1>
        <p>You have received a new inquiry:</p>
        <ul>
          <li><strong>Student Name:</strong> ${studentData.studentName}</li>
          <li><strong>Father's Name:</strong> ${studentData.fatherName}</li>
          <li><strong>Mobile Number:</strong> ${studentData.fatherMobile}</li>
        </ul>
        <p>
          <a href="https://kalamkids.in/login" target="_blank" style="display:inline-block;margin-top:10px;padding:8px 15px;background-color:#114497;color:#fff;text-decoration:none;border-radius:5px;">
            Click Here to Login
          </a>
        </p>
      `,
    };
    

    // Send email to yourself (admin)
    await transporter.sendMail(mailOptionsToAdmin);
    console.log(`📧 Inquiry notification sent to admin: ${process.env.EMAIL_USER}`);

  } catch (error) {
    console.error("❌ Error sending inquiry email:", error);
  }
};
const sendAdmissionApprovalEmail = async (to, studentData) => {
  try {
    // Read the HTML template
    const templatePath = path.join(__dirname, "Templetes/admissionApprovalNotification.html");
    let template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual data
    template = template
      .replace('{{studentName}}', studentData.studentName)
      .replace('{{admissionNumber}}', studentData.admissionNumber)
      .replace('{{parentType}}', studentData.parentType);

    // Mail options for the parent
    const mailOptions = {
      from: process.env.EMAIL_USER, // Use the environment variable for the sender's email
      to: to, // Parent's email
      subject: 'Admission Approval Notification',
      html: template,

    };

    // Send email to the parent
    await transporter.sendMail(mailOptions);
    console.log(`📧 Admission approval email sent to: ${to}`);

  } catch (error) {
    console.error("❌ Error sending admission approval email:", error);
  }
};
 
 
const sendEmail = async (to, subject, templatePath, replacements) => {
  try {
    // Read the HTML template
    let template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders with actual data
    for (const [key, value] of Object.entries(replacements)) {
      if (typeof value === 'object') {
        // Handle nested objects
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          template = template.replace(new RegExp(`{{${key}.${nestedKey}}}`, 'g'), nestedValue);
        }
      } else {
        template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }
    }

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: template,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to: ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendInquiryEmailToFather = async (to, studentData) => {
  const templatePath = path.join(__dirname, "Templetes/fatherInquiryNotification.html");
  await sendEmail(to, 'PAYMENT RECEIPT', templatePath, studentData);
};

const sendInquiryEmailToMother = async (to, studentData) => {
  const templatePath = path.join(__dirname, "Templetes/motherInquiryNotification.html");
  await sendEmail(to, 'PAYMENT RECEIPT', templatePath, studentData);
};

 


module.exports = { sendInquiryEmail, sendAdmissionApprovalEmail,sendInquiryEmailToFather, sendInquiryEmailToMother   };
 