import ResumeBuilder from "@/components/resume/resume-form";

const AddResume = () => {
  return (
    <div className="container max-w-4xl pt-2 pb-4">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">Create New Resume</h1>
      </div>
      <ResumeBuilder />
    </div>
  );
};

export default AddResume;
