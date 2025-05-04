import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { URLS } from "@/constants";

import TableSkeleton from "@/components/TableSkeleton";

const fetchUsers = async () => {
  const { data } = await axiosInstance.get(URLS.USERS, {
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  });
  return data?.data;
};

const User = () => {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
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
    </div>
  );
};

export default User;
