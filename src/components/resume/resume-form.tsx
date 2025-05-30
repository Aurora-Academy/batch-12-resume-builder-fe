import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from "@/lib/resumeValidation";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import type { ResumeCoreSections } from "@/types/resume";
import { addNewResume } from "@/slices/resumeSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ChevronLeft, ChevronRight, Save, FileText } from "lucide-react";

import { Stepper } from "@/components/ui/stepper";
import { PersonalInfoForm } from "@/components/resume/forms/personal-info-form";
import { EducationForm } from "@/components/resume/forms/education-form";
import { ExperienceForm } from "@/components/resume/forms/experience-form";
import { SkillsForm } from "@/components/resume/forms/skills-form";
import { ProjectsForm } from "@/components/resume/forms//projects-form";
import { CertificationsForm } from "@/components/resume/forms/certifications-form";
import { ResumePreview } from "@/components/resume/forms/resume-preview";

const steps = [
  "Personal Info",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Certifications",
  "Preview",
];

const defaultValues: ResumeCoreSections = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    github: "",
    linkedin: "",
    address: "",
    website: "",
  },
  education: [{ institution: "", degree: "", startDate: "", endDate: "", course: "" }],
  experiences: [],
  skills: [],
  projects: [],
  certifications: [],
};

export default function ResumeBuilder() {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const methods = useForm<ResumeCoreSections>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const nextStep = async () => {
    // DONOT ALLOW TO GO PAST STEPS LENGTH
    if (currentStep >= steps.length - 1) {
      return;
    }
    // VALIDATE THE CONTENT
    const fieldsToValidate = getFieldsForSteps(currentStep);

    let isValid = true;

    if (currentStep === 0 || currentStep === 1) {
      isValid = await trigger(fieldsToValidate);
    } else if (currentStep < 6) {
      // Validate only if there is content
      const currentData = getValues();
      const sectionName = fieldsToValidate[0];
      if (Array.isArray(currentData[sectionName]) && currentData[sectionName].length > 0) {
        isValid = await trigger(fieldsToValidate);
      } else {
        // Skip validation since there are no data
        isValid = true;
      }
    } else {
      // preview step - no validation required
      isValid = true;
    }

    // GO TO NEXT STEP
    if (isValid) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  function getResumeCoreSections(): ResumeCoreSections {
    return methods.getValues() as ResumeCoreSections;
  }

  const isFirstTwoStepsValid = () => {
    watch(["personalInfo", "education"]);
    const personalInfo = getValues().personalInfo;
    const education = getValues().education;
    const isPersonalInfoValid =
      !!personalInfo.email &&
      !!personalInfo.fullName &&
      !!personalInfo.phone &&
      !!personalInfo.summary &&
      !!personalInfo.address;
    const isEducationValid =
      Array.isArray(education) &&
      education.length > 0 &&
      education.every(
        (e) => !!e.institution && !!e.startDate && !!e.endDate && !!e.degree && !!e.course
      );
    return isPersonalInfoValid && isEducationValid;
  };

  const onSubmit = async (data: ResumeCoreSections) => {
    try {
      console.log({ data });
      alert("Resume saved successfully");
    } catch (e) {
      console.error("Error saving resume:", e);
      alert("Error saving resume. Please try again");
    }
  };

  const onSaveAndExit = async () => {
    try {
      const data = getResumeCoreSections();
      const resume = {
        ...data,
        id: uuidv4(),
        title: `resume-${uuidv4()}`,
        status: "draft" as const,
        isSavedToServer: false,
        updatedAt: new Date().toISOString(),
      };
      dispatch(addNewResume(resume));
      alert("Resume saved successfully");
    } catch (e) {
      console.error("Error saving resume:", e);
      alert("Error saving resume. Please try again");
    }
  };

  const getFieldsForSteps = (
    step: number
  ): (
    | "personalInfo"
    | "education"
    | "experiences"
    | "skills"
    | "projects"
    | "certifications"
  )[] => {
    switch (step) {
      case 0:
        return ["personalInfo"];
      case 1:
        return ["education"];
      case 2:
        return ["experiences"];
      case 3:
        return ["skills"];
      case 4:
        return ["projects"];
      case 5:
        return ["certifications"];
      case 6:
        return [];
      default:
        return [];
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <EducationForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <SkillsForm />;
      case 4:
        return <ProjectsForm />;
      case 5:
        return <CertificationsForm />;
      case 6:
        return <ResumePreview />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <FileText className="h-8 w-8" />
                Resume Builder
              </CardTitle>
              <CardDescription>Create a professional resume step by step</CardDescription>
            </CardHeader>
            <CardContent>
              <Stepper steps={steps} currentStep={currentStep} className="mb-8" />
            </CardContent>
          </Card>
          <FormProvider {...methods}>
            <form>
              {renderStepContent()}
              <div className="flex justify-between my-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentStep === steps.length - 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div>Saving...</div>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Resume
                        </>
                      )}
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="default"
                        onClick={handleSubmit(onSaveAndExit)}
                        disabled={isSubmitting || !isFirstTwoStepsValid()}
                      >
                        {isSubmitting ? (
                          <>
                            <div>Saving Draft...</div>
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save & Exit
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={nextStep}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
