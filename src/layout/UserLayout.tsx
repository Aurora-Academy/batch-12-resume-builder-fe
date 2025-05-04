import { Outlet } from "react-router";
import { Suspense } from "react";

const UserLayout = () => {
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

export default UserLayout;
