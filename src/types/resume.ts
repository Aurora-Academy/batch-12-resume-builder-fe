export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  github: string;
  linkedin: string;
  address: string;
  website?: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  course: string;
}
export interface Experience {
  company: string;
  position: string;
  location: string;
  endDate: string;
  startDate: string;
  current: boolean;
  description: string;
}

export interface Skills {
  name: string;
}

export interface Projects {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certifications {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeCoreSections {
  personalInfo: PersonalInfo;
  education: Education[];
  experiences: Experience[];
  projects: Projects[];
  skills: Skills[];
  certifications: Certifications[];
}

export type ResumeTemplate = "modern" | "classic" | "minimal";

export interface Resume extends ResumeCoreSections {
  id?: string;
  title: string;
  status: "draft" | "final";
  updatedAt: string;
  template: ResumeTemplate;
  isSavedToServer: boolean;
}
