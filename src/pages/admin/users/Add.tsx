import { useNavigate } from "react-router";
import UserForm from "@/components/User-Form";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/admin/users");
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  return <UserForm mode="create" onSuccess={handleSuccess} onCancel={handleCancel} />;
}
