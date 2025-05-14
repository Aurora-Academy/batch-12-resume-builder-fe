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
export function AdminSidebar() {
  const location = useLocation();
  const { state } = useSidebar();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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
            Resume Builder
          </span>
          <SidebarTrigger className={cn("ml-auto", state === "collapsed" && "ml-0")} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin")} tooltip="Dashboard">
                  <Link to="/admin">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/resumes")} tooltip="Resumes">
                  <Link to="/admin/resumes">
                    <FileText className="h-4 w-4" />
                    <span>Resumes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/admin/users")} tooltip="Users">
                  <Link to="/admin/users">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className={cn("flex flex-col gap-4", state === "collapsed" && "items-center")}>
          {/* App navigation button */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className={state === "collapsed" ? "w-8 h-8 p-0" : ""}
          >
            <Link to="/">
              {state === "collapsed" ? <FileText className="h-4 w-4" /> : "Back to App"}
            </Link>
          </Button>

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
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@example.com</span>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
