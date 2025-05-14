import { Outlet } from "react-router";
import { Suspense } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<p>Loading page...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
