import { Outlet } from "react-router";
import { Suspense } from "react";

const AdminLayout = () => {
  return (
    <div>
      Header
      <Suspense fallback={<p>Loading page...</p>}>
        <Outlet />
      </Suspense>
      Footer
    </div>
  );
};

export default AdminLayout;
