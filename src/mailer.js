const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// ✅ Corrected Path to HTML Template
const emailTemplatePath = path.join(__dirname, "Templetes/emailTemplete.html"); 


// ✅ Read HTML File and Replace Variables
const generateEmailContent = (data) => {
  try {
    let template = fs.readFileSync(emailTemplatePath, "utf-8");
    template = template.replace("{{name}}", data.name);
    template = template.replace("{{orderId}}", data.invoiceNo);
    template = template.replace("{{businessName}}", data.businessName);
    template = template.replace("{{totalCost}}", data.discountedPrice);
    return template;
  } catch (error) {
    console.error("❌ Error reading email template:", error);
    return "Error loading email template"; // Fallback content
  }
};

// ✅ Configure Email Transporter
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

// ✅ Function to Send Email
const sendEmail = async (toEmail, data) => {
  try {
    const emailContent = generateEmailContent(data);

    // ✅ Send confirmation to the user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Your Order Confirmation - Green Emerald Agency",
      html: emailContent,
    };

    await transporter.sendMail(userMailOptions);
    console.log("📧 Email sent to user:", toEmail);

    // ✅ Send notification to yourself
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "greenemeraldagency@gmail.com", // Replace with your email
      subject: "📩 New Message Received",
      html: `
        <p>You got a new message from: <strong>${toEmail}</strong></p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Order ID:</strong> ${data.invoiceNo}</p>
        <p><strong>Business Name:</strong> ${data.businessName}</p>
         <p><strong>Check Order Details:</strong> <a href="https://package.greenemeraldbranding.com/admin" target="_blank">Click here</a></p>
      `,
    };
    

    await transporter.sendMail(adminMailOptions);
    console.log("📧 Admin notification sent!");

  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};


module.exports = sendEmail;
