// "use server"
import * as z from "zod";
import {
  parsePhoneNumberWithError,
  validatePhoneNumberLength,
} from "libphonenumber-js/min";
import { countriesWithCodes } from "./countries-with-code";
import { createManyUnion, formatPhoneNumberInternational } from "./utils";

const countryCodes = countriesWithCodes.map((c) => c.code_2);
const countryCode: any = createManyUnion(
  countryCodes as typeof countryCodes & [string, string, ...string[]],
  {
    required_error: "You must select a country",
    invalid_type_error: "Invalid country code",
  }
);
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

export const EmailSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const PhoneSchema = z.object({
  phone: z
    .object({
      phone: z.string().trim(),
      countryCode,
    })
    // .refine(
    //   (data) => {
    //     try {
    //       const numberLength = validatePhoneNumberLength(
    //         data.phone,
    //         data.countryCode
    //       );
    //       return;
    //     } catch (_error: unknown) {
    //       return false;
    //     }
    //   }
    //   // {
    //   //   message: "Phone number is too short",
    //   //   path: ["phone"],
    //   // }
    // )
    .refine(
      (data) => {
        try {
          const phone = parsePhoneNumberWithError(data.phone, data.countryCode);
          return phone.isValid();
        } catch (_error: unknown) {
          return false;
        }
      },
      {
        message: "Phone number does not match selected country",
        path: ["phone"],
      }
    )
    .transform((data) => ({
      phone: formatPhoneNumberInternational(
        parsePhoneNumberWithError(data.phone, data.countryCode)
      ),
      countryCode: data.countryCode,
    })),
});
export type PhoneSchema = z.infer<typeof PhoneSchema>;

export const PhoneOTPSchema = PhoneSchema.merge(
  z.object({
    code: z
      .string()
      .trim()
      .regex(/^[0-9]{6}/, {
        message: "The OTP must be a 6-digit number",
      }),
  })
);
export type verifyPhoneInput = z.infer<typeof PhoneOTPSchema>;

export type ParseStringPhoneNumberResult =
  | { success: true; data: PhoneSchema["phone"] }
  | { success: false; error: string };

export function parseStringPhoneNumber(
  phone: unknown
): ParseStringPhoneNumberResult {
  try {
    if (typeof phone !== "string") {
      return {
        success: false,
        error: "Invalid phone number",
      };
    }

    const parsedPhoneNumber = parsePhoneNumberWithError(phone);
    if (parsedPhoneNumber.country === undefined) {
      return { success: false, error: "Invalid phone number" };
    }

    return {
      success: true,
      data: {
        phone: formatPhoneNumberInternational(parsedPhoneNumber),
        countryCode: parsedPhoneNumber.country,
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: "Invalid phone number",
    };
  }
}

export const EmailLoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
export const PhoneLoginSchema = PhoneOTPSchema.merge(
  z.object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
);

export const AuthenticationSchema = z.object({
  email: z.optional(
    z.string().email({
      message: "Email is required",
    })
  ),
  phone: z.optional(z.string()),
  countryCode: z.optional(z.string()),
  firstName: z.optional(
    z.string().min(1, { message: "First Name is required" })
  ),
  lastName: z.optional(z.string().min(1, { message: "Last Name is required" })),
  dob: z.optional(z.date()),
  password: z
    .string()
    .min(6, {
      message: "Minimum 6 characters required",
    })
    .optional(),
  code: z.optional(z.string()),
});
export const RegisterSchema = z.object({
  phone: z.string(),
  countryCode: z.string(),
  email: z.string().email({
    message: "Email is required",
  }),
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  dob: z.date(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
export const RegistrationSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  // phone: z.string(),
  // countryCode: z.string(),
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  dob: z.date(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  code: z.optional(z.string()),
  marketingMessage: z.optional(z.boolean()),
});
