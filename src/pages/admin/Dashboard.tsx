import { withErrorBoundary } from "@/components/ErrorFallback";
import { Suspense, lazy } from "react";

import Report1 from "./Report1";

const HeavyReport = lazy(() => import("./Report2"));
const Users = lazy(() => import("../User"));

const SafeReport1 = withErrorBoundary(Report1);
const SafeReport2 = withErrorBoundary(HeavyReport);
const SafeUsers = withErrorBoundary(Users);

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <SafeReport1 />
      <SafeReport2 />
      <SafeUsers />
    </div>
  );
};

export default Dashboard;
