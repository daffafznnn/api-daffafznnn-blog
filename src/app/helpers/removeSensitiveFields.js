const removeSensitiveFields = (user) => {
  if (typeof user !== 'object' || user === null) {
    throw new Error("Invalid user object");
  }

  const { password_hash, google_id, ...userWithoutSensitiveFields } = user;
  return userWithoutSensitiveFields;
};

export default removeSensitiveFields;
