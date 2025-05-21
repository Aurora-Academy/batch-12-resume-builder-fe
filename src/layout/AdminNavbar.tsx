import { Link, useLocation } from "react-router";
import { FileText, LayoutDashboard, LogOut, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";

export function AdminSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const generalNavs = [
    {
      label: "Reports",
      url: "/admin",
      isAdminOnly: false,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "Resumes",
      url: "/admin/resumes",
      isAdminOnly: false,
      icon: <FileText className="h-4 w-4" />,
    },
  ];
  const adminNavs = [
    { label: "Users", url: "/admin/users", isAdminOnly: true, icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <FileText className="h-6 w-6" />
          <span
            className={cn(
              "font-bold text-lg transition-opacity duration-200",
              state === "collapsed" && "opacity-0 hidden"
            )}
          >
            ProResume
          </span>
          <SidebarTrigger className={cn("ml-auto", state === "collapsed" && "ml-0")} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalNavs.map((link, idx) => {
                return (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild isActive={isActive(link?.url)} tooltip={link?.label}>
                      <Link to={link?.url}>
                        {link?.icon}
                        <span>{link?.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user?.roles.includes("admin") && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavs.map((link, idx) => {
                  return (
                    <SidebarMenuItem key={idx}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(link?.url)}
                        tooltip={link?.label}
                      >
                        <Link to={link?.url}>
                          <LayoutDashboard className="h-4 w-4" />
                          <span>{link?.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className={cn("flex flex-col gap-4", state === "collapsed" && "items-center")}>
          {/* Separator */}
          <div className="h-px bg-border w-full" />

          {/* User profile section */}
          <div className={cn("flex items-center gap-3", state === "collapsed" && "flex-col")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto" aria-label="User menu">
                  <Avatar
                    className={cn("h-9 w-9 cursor-pointer", state === "collapsed" ? "mx-auto" : "")}
                  >
                    <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name || "User"}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
