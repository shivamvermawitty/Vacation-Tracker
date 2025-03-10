import { z } from 'zod';

const formSchema = z.object({
  password: z.string().min(4, 'Invalid Password'),
  email: z.string().email('Invalid email'),
});

export function validateLoginData(formData) {
  const result = formSchema.safeParse(formData);
  if (!result.success) {
    // create error object when the form data is not valid
    const errorObj = {};
    result.error.errors.forEach((error) => {
      errorObj[error.path[0]] = error.message;
    });

    return { valid: result.success, error: errorObj };
  }
  return { valid: result.success, error: {} };
}
