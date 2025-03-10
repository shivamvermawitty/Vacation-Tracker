import { z } from 'zod';

const formSchema = z.object({
  fromDate: z.string().min(3, 'Date Of Birth is required'),
  toDate: z.string().min(3, 'Date Of Birth is required'),
  color: z.string().min(3, 'Color is required'),
  email: z.string().email('Invalid Email'),
});

export function validateLeaveForm(formData) {
  const result = formSchema.safeParse(formData);
  if (!result.success) {
    const errorObj = {};
    result.error.errors.forEach((error) => {
      errorObj[error.path[0]] = error.message;
    });

    return { valid: result.success, error: errorObj };
  }
  return { valid: result.success, error: {} };
}
