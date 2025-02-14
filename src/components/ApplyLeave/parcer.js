import { z } from 'zod';

const formSchema = z.object({
  fromDate: z.string().min(3, 'Date Of Birth is required'),
  toDate: z.string().min(3, 'Date Of Birth is required'),
  color: z.string().min(3, 'Color is required'),
  email: z.string().email('Invalid Email'),
});

export function parseFormData(formData) {
  try {
    formSchema.parse(formData);
    return false;
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errorObj = {};
      err.errors.forEach((error) => {
        errorObj[error.path[0]] = error.message;
      });
      return errorObj;
    }
  }
}
