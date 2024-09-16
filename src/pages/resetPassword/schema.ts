import { CLAUSES, GLOBALS } from 'src/common';
import { object, ref, string } from 'yup';

export const resetPasswordSchema = object().shape({
  password: string()
    .required(CLAUSES.PASSWORD_REQUIRED)
    .min(GLOBALS.MIN_PASSWORD_LENGTH, CLAUSES.PASSWORD_LENGTH)
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      CLAUSES.PASSWORD_COMPLEXITY,
    ),
  confirmPassword: string()
    .oneOf([ref('password')], CLAUSES.CONFIRM_PASSWORD_MATCH)
    .required(CLAUSES.CONFIRM_PASSWORD_REQUIRED),
});
