import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
};

export default TableSkeleton;
