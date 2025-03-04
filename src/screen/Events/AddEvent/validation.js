import { z } from 'zod';

const formSchema = z.object({
  eventName: z.string().min(3, 'First name is required'),

  eventDate: z.string().min(3, 'Date Of Birth is required'),
});

export function validateEventData(formData) {
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
