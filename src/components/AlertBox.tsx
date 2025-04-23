const AlertBox = ({ variant = "red", msg }: { variant?: string | null; msg: string }) => {
  return (
    <>
      <div
        className={`bg-${variant}-100 border border-${variant}-400 text-${variant}-700 px-4 py-3 rounded relative`}
        role="alert"
      >
        <span className="block sm:inline">{msg}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
      </div>
    </>
  );
};

export default AlertBox;
