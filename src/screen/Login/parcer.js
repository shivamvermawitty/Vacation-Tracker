import { z } from 'zod';

const formSchema = z.object({
  password: z.string().min(4, 'Invalid Password'),
  email: z.string().email('Invalid email'),
});

export function validateLoginData(formData) {
  const result = formSchema.safeParse(formData);
  return result;
}
