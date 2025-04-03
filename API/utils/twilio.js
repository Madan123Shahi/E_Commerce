const twilio = require("twilio");
const logger = require("../utils/logger");
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOTP = async (contact, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your Verification Code is ${otp}`,
      to: contact,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    logger.info(`Twilio OTP sent to ${contact}:SID ${message.sid}`);
    return message;
  } catch (error) {
    logger.error(`Twilio OTP Sending failed to ${contact}:${error.message}`);
  }
};

module.exports = sendOTP;
