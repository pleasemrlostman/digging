import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <h1>👤 유저 영역</h1>
      <Outlet />
    </div>
  );
};

export default UserLayout;
