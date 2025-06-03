"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Resume, ResumeTemplate } from "@/types/resume";
import { useState } from "react";
import ModernTemplate from "@/components/templates/modern-template";
import ClassicTemplate from "@/components/templates/classic-template";
import MinimalTemplate from "@/components/templates/minimal-template";

interface Templates {
  id: ResumeTemplate;
  name: string;
  desc: string;
}

const templates: Templates[] = [
  { id: "modern", name: "Modern", desc: "Professional Resume for Engineers" },
  { id: "classic", name: "Classic", desc: "Professional Resume for Veterans" },
  { id: "minimal", name: "Minimal", desc: "Minimal Resume for Beginners" },
];

export function ResumePreview() {
  const { watch, setValue } = useFormContext<Resume>();
  const formData = watch();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleTemplateChange = (template: ResumeTemplate) => {
    setValue("template", template, { shouldValidate: true });
  };

  const handlePDFDownload = () => {};

  const renderTemplate = () => {
    switch (formData.template) {
      case "modern":
        return <ModernTemplate formData={formData} />;
      case "classic":
        return <ClassicTemplate />;
      case "minimal":
        return <MinimalTemplate />;
      default:
        return <ModernTemplate formData={formData} />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <CardDescription>
          Review your resume before saving. This is how your resume will look when exported.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="">Choose Template</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template?.id} onClick={() => handleTemplateChange(template.id)}>
                {template.name}
              </div>
            ))}
          </div>
        </div>
        <div>{renderTemplate()}</div>
      </CardContent>
    </Card>
  );
}
