"use server";
import twilio from "twilio";

export const sendOtp = () => {
  const accountSid = <string>process.env.accountSID;
  const token = <string>process.env.authToken;
  const client = twilio(accountSid, token);

  client.verify.v2
    .services("VA193ac8772ca4a683380735f8675a176c")
    .verifications.create({
      to: "+23408129023087",
      channel: "sms",
    })
    .then((verification) => console.log(verification.status));
};
