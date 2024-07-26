export function ValidateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function ValidatePassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }

  const smallRegex = /[a-z]/;
  const capitalRegex = /[A-Z]/;
  if (!smallRegex.test(password) || !capitalRegex.test(password)) {
    return false;
  }
  const numberRegex = /[\d]/;
  if (!numberRegex.test(password)) {
    return false;
  }

  const specialRegex = /[!@#$%^&*.?]/;
  if (!specialRegex.test(password)) {
    return false;
  }
  return true;
}
