import { CLAUSES } from 'src/common';
import { object, string } from 'yup';

export const forgotPasswordSchema = object().shape({
  email: string().email(CLAUSES.VALID_EMAIL).required(CLAUSES.EMAIL_REQUIRED),
});
