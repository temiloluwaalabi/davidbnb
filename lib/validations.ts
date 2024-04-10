import * as z from "zod";

export const FilterScehma = z.object({
  location: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  guests: z.object({
    adults: z.number().default(1),
    children: z.number().default(0),
    infants: z.number().default(0),
    pets: z.number().default(0),
  }),
});
