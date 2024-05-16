import nodemailer from "nodemailer";
const domain = process.env.NEXT_PUBLIC_APP_URL;
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});
export const sendVerificationEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const confirmLink = `${domain}/auth/confirm_email?token=${token}`;

  const userMailOptions = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: email,
    subject: "Please confirm your email address",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #d4edda; padding: 20px;">
        <h2>Hi ${name} </h2>
        <p>Welcome to Davidleobnb! In order to get started, you need to confirm your email address.</p>
        <button style="background-color: red; border-radius: 12px; padding: 10px"><a href="${confirmLink}">Confirm email</a></button>
      </div>`,
  };
  try {
    await transporter.sendMail(userMailOptions);
    return {
      success: "Your verification link has been sent to your mail",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Email not sent",
    };
  }
};

export const sendPasswordResetToken = async (
  email: string,
  token: string,
  name: string
) => {
  const resetLink = `${domain}/auth/new_password?token=${token}`;

  const userMailOptions = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: email,
    subject: "Please reset your password!",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #d4edda; padding: 20px;">
        <h2>Hi ${name} </h2>
        <p><strong>Reset Password Link:</strong> Click <a href="${resetLink}">here</a> to reset your password.</p>
      </div>`,
  };
  try {
    await transporter.sendMail(userMailOptions);
    return {
      success: "Your password reset token has been sent",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Email not sent",
    };
  }
};
export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string,
  name: string
) => {
  const userMailOptions = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: email,
    subject: "Two Factor Confirmation Token!",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #d4edda; padding: 20px;">
        <h2>Hi ${name} </h2>
        <p>Your 2FA code is: <strong>${token}</strong></p>
      </div>`,
  };
  try {
    await transporter.sendMail(userMailOptions);
    return {
      success: "Your 2FA code has been Sent",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Email not sent",
    };
  }
};
