import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams(); // id 값 추출

  return (
    <div>
      <h1>👤 유저 상세 페이지</h1>
      <p>유저 ID: {id}</p>
    </div>
  );
};

export default UserDetail;
