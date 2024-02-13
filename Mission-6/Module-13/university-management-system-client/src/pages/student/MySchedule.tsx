import { Button, Col, Row, Tag } from "antd";
import { useGetAllEnrollCoursesQuery } from "../../redux/features/student/studentCourseManagementApi";

const MySchedule = () => {
  const { data } = useGetAllEnrollCoursesQuery(undefined);

  return (
    <Row gutter={[0, 20]}>
      {data?.data?.map((item, index) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }} key={index}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseId.title}</h2>
            </div>
            <div>
              <Row
                key={index}
                justify="space-between"
                align="middle"
                style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}>
                <p>Section: {item?.offeredCourseId?.section}</p>
                <div>
                  Days:
                  {item?.offeredCourseId?.days?.map((day, index) => (
                    <Tag style={{ marginLeft: "2px" }} key={index}>
                      {day}
                    </Tag>
                  ))}
                </div>
                <p>Start Time: {item?.offeredCourseId?.startTime}</p>
                <p>End Time: {item?.offeredCourseId?.endTime}</p>
                <Button>Enroll</Button>
              </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default MySchedule;
