export const writeMessageError = (err: unknown) => {
  console.log(JSON.stringify(err));
  const errCode = (err as { code?: string })?.code ?? "";
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "Email already in use",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/user-not-found": "Email or password not found",
  };

  return messages[errCode] || "Something went wrong";
};
