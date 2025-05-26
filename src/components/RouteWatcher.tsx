import { useEffect, useRef } from "react";
import { matchPath, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentPage, setLimit } from "@/slices/userSlice";

const RouteWatcher = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prevPath = prevPathRef?.current;
    const currentPath = location?.pathname;

    const wasOnUsersPage = matchPath("/admin/users/*", prevPath);
    const isOnUsersPage = matchPath("/admin/users/*", currentPath);

    if (wasOnUsersPage && !isOnUsersPage) {
      dispatch(setLimit(10));
      dispatch(setCurrentPage(1));
    }
    prevPathRef.current = currentPath;
  }, [location, dispatch]);

  return null;
};

export default RouteWatcher;
