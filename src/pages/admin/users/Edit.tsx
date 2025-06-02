import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UserForm from "@/components/User-Form";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { User } from "@/types/user";
import { fetchUser } from "@/services/user";

const fetchUserById = async (id: string): Promise<User> => {
  const { data } = await fetchUser(id);
  console.log({ data: data.data });
  return data.data;
};

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: () => fetchUserById(id),
  });

  const handleSuccess = () => {
    navigate("/admin/users");
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading user...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-destructive">Failed to load user data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <UserForm mode="edit" user={user} onSuccess={handleSuccess} onCancel={handleCancel} />;
}
