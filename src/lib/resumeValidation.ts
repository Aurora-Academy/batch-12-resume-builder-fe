import { z } from "zod";

const isDateInFuture = (dateString: string) => {
  if (!dateString) return false;
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [inputYear, inputMonth] = dateString.split("-").map(Number);
  if (inputYear > currentYear) return true;
  if (inputYear === currentYear && inputMonth > currentMonth) return true;
  return false;
};

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be atleast 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be atleast 10 characters"),
  summary: z.string().min(50, "Summary must be atleast 50 characters"),
  github: z.string().url("Invalid github url").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid linkedin url").optional().or(z.literal("")),
  address: z.string().min(5, "Invalid Address"),
  website: z.string().url("Invalid website url").optional().or(z.literal("")),
});

export const educationSchema = z.object({
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree is required"),
  course: z.string().min(2, "Course/Field of study is required"),
  startDate: z.string().min(1, "start date is required"),
  endDate: z
    .string()
    .min(1, "End date is required")
    .refine((date) => !isDateInFuture(date), {
      message: "End date cannot be in the future",
    }),
});

export const experienceSchema = z.object({});

export const skillSchema = z.object({});

export const projectSchema = z.object({});

export const certificationSchema = z.object({});

export const resumeSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema).min(1, "Atlease one education information is required"),
  experiences: z.array(experienceSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillSchema),
  certifications: z.array(certificationSchema),
});

export const draftResumeSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema).optional(),
  experiences: experienceSchema,
  projects: projectSchema,
  skills: skillSchema,
  certifications: certificationSchema,
});
