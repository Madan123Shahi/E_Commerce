import twilio from "twilio";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_SID
);

export const phoneSMS = async (to, message) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error(`Error Sending SMS:${error.message}`);
    return { success: false, message: error.message };
  }
};
