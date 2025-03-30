const twilio = require("twilio");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (contact, otp) => {
  return await client.messages.create({
    body: `Your Verification Code is ${otp}`,
    to: contact,
    from: process.env.TWILIO_PHONE_NUMBER,
  });
};

module.exports = sendOTP;
