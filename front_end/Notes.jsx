// Regexp
// Password
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
// This one will include at least one lowercase letter, 1 uppercase letter, 1 digit, 1 special character, min 8 characters

// Email
// /^([+]?\d{1,3})?\d{10}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/ OR
// /^(?:([+]?\d{1,3})?\d{10}|[^\s@]+@[^\s@]+\.[^\s@]+)$/

// Two ways to check for password strength
const evaluatePasswordStrength = (pwd) => {
  if (pwd.length < 6) return "Weak";
  if (!passwordRegexp.test(pwd)) return "Medium";
  return "Strong";
};

// 2. Using ternary operator for compact single line
const evaluatePasswordStrength2 = (pwd) => {
  pwd.length < 6 ? "Weak" : !passwordRegexp.test(pwd) ? "Medium" : "Strong";
};
