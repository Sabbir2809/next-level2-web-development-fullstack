import { useParams } from "react-router-dom";

const FacultyDetails = () => {
  const { facultyId } = useParams();

  return (
    <div>
      <h1>This is FacultyDetails of ${facultyId}</h1>
    </div>
  );
};
export default FacultyDetails;
