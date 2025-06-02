import { URLS } from "@/constants";
import { createAxiosAdminFn } from "./axiosAdmin";

export async function getAIResponse(query: string): Promise<string> {
  try {
    const axiosInstance = createAxiosAdminFn();
    const { data } = await axiosInstance.post(URLS.ASSISTANT, { query });
    return data.content;
  } catch (e: any) {
    console.log({ e });
    return "";
  }
}

export async function generateExperienceDescription(experience: {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock AI-generated description based on role and company
  const role = experience.position.toLowerCase();
  const company = experience.company;

  let description = `• Led key initiatives at ${company} in the ${experience.position} role\n`;

  if (role.includes("engineer") || role.includes("developer")) {
    description += `• Developed and maintained scalable applications using modern technologies\n`;
    description += `• Collaborated with cross-functional teams to deliver high-quality software solutions\n`;
    description += `• Participated in code reviews and implemented best practices for development workflows`;
  } else if (role.includes("manager") || role.includes("lead")) {
    description += `• Managed and mentored team members to achieve project deliverables\n`;
    description += `• Coordinated with stakeholders to define project requirements and timelines\n`;
    description += `• Implemented process improvements that increased team efficiency by 25%`;
  } else if (role.includes("analyst") || role.includes("consultant")) {
    description += `• Analyzed complex business requirements and provided strategic recommendations\n`;
    description += `• Created detailed reports and presentations for executive leadership\n`;
    description += `• Collaborated with clients to identify opportunities for process optimization`;
  } else {
    description += `• Executed key responsibilities with attention to detail and quality\n`;
    description += `• Contributed to team success through effective collaboration and communication\n`;
    description += `• Supported organizational goals through dedicated performance and initiative`;
  }

  return description;
}

export async function generateProjectDescription(project: {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock AI-generated description based on project info
  const title = project.title;
  const techs = project.technologies.join(", ");
  const hasLink = project.link ? "with live deployment" : "";

  return `${title} is a comprehensive application ${hasLink} built using ${techs}. This project demonstrates proficiency in modern development practices including responsive design, user experience optimization, and scalable architecture. Key features include intuitive user interface, robust data management, and seamless integration with external services. The project showcases problem-solving skills and attention to both technical excellence and user needs.`;
}
