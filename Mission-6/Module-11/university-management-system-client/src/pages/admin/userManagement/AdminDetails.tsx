import { useParams } from "react-router-dom";

const AdminDetails = () => {
  const { adminId } = useParams();

  return (
    <div>
      <h1>This is AdminDetails of ${adminId}</h1>
    </div>
  );
};
export default AdminDetails;
