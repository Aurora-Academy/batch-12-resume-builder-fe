import { Outlet } from "react-router";
import { AdminSidebar } from "./AdminNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto my-15 mx-15">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
