import { CLAUSES, GLOBALS } from 'src/common/constants.ts';
import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string().email(CLAUSES.VALID_EMAIL).required(CLAUSES.EMAIL_REQUIRED),
  password: string()
    .required(CLAUSES.PASSWORD_REQUIRED)
    .min(GLOBALS.MIN_PASSWORD_LENGTH, CLAUSES.PASSWORD_LENGTH)
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      CLAUSES.PASSWORD_COMPLEXITY,
    ),
});
