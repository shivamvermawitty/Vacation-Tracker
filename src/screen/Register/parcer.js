import { z } from 'zod';
const formSchema = z.object({
  firstName: z.string().min(3, 'First name is required'),
  lastName: z.string().min(3, 'Last name is required'),
  password: z.string().min(4, 'Invalid Password'),
  email: z.string().email('Invalid email address'),
  contact: z.string().min(10, 'Invalid Contact Number'),
  dob: z.string().min(3, 'Date Of Birth is required'),
  gender: z.string().min(4, 'Gender is required'),
  color: z.string().min(4, 'Invalid color'),
});

export function validateUserData(formData) {
  const result = formSchema.safeParse(formData);
  return result;
}
