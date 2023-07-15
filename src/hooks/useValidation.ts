const useValidation = () => {
  /* A regular expression that validates the email and password. */
  const usernameValidation = /^[A-z][A-z0-9-_]{3,23}$/;
  // eslint-disable-next-line no-useless-escape
  const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,24}$/;

  return {
    usernameValidation,
    emailValidation,
    passwordValidation,
  };
};

export default useValidation;
