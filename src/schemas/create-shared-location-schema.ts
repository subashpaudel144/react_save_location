import { z } from 'zod'

export const createSharedLocationSchema = z.object({
  locationName: z
    .string()
    .min(2, { message: 'Location name must be at least 2 characters long' })
    .max(50),
  locationType: z.string(),
  locationLogo:
    typeof window === 'undefined'
      ? z.undefined()
      : z.instanceof(File, { message: 'Please upload a valid image' }),
})
export type CreateSharedLocationFormInputs = z.infer<
  typeof createSharedLocationSchema
>
