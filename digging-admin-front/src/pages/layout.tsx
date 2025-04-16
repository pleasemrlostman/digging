import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header>헤더</header>
      <Outlet />
      <footer>푸터</footer>
    </>
  );
};
export default MainLayout;
