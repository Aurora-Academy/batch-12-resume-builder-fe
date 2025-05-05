import { useAdminQuery } from "@/hooks/useAdminQuery";
import { useAuth } from "@/context/AuthContext";

import TableSkeleton from "@/components/TableSkeleton";

const User = () => {
  const { logout } = useAuth();
  const { data, isLoading, isError } = useAdminQuery();

  if (isError) return <div>Error fetching admin users list</div>;
  return (
    <div>
      <ul>
        {isLoading ? (
          <>
            <TableSkeleton />
          </>
        ) : (
          <>
            {data?.map((user: any) => {
              return <li key={user?._id}>{user?.name}</li>;
            })}
          </>
        )}
      </ul>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default User;
