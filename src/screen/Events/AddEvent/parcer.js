import { z } from 'zod';

const formSchema = z.object({
  eventName: z.string().min(3, 'First name is required'),

  eventDate: z.string().min(3, 'Date Of Birth is required'),
});

export function validateEventData(formData) {
  return formSchema.safeParse(formData);
}
