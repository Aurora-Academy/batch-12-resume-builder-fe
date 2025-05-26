import { useParams, useNavigate } from "react-router";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      User Details {id}
      <br />
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default UserDetail;
