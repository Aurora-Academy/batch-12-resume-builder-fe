import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/user";
import { updateUser } from "@/services/user";

// Mock API functions - replace with your actual API calls
const createUser = async (
  userData: Omit<User, "id" | "createdAt" | "updatedAt">
): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newUser: User = {
    ...userData,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newUser;
};

const updateUserById = async (userData: User): Promise<User> => {
  const { _id, ...rest } = userData;
  const updatedUser: User = {
    ...rest,
  };
  if (!_id) throw new Error("Id is required");
  const user = await updateUser(_id, updatedUser);
  return user;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserById,
    onSuccess: (updatedUser) => {
      // Update the specific user in cache
      queryClient.setQueryData(["users", updatedUser._id], updatedUser);
      // Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
