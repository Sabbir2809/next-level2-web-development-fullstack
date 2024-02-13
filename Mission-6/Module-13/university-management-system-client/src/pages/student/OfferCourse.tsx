import { Button, Col, Row, Tag } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagementApi";

type TCourse = {
  [index: string]: any;
};

const OfferCourse = () => {
  const [enrollCourse] = useEnrollCourseMutation();
  const { data: offerCourseData } = useGetAllOfferedCoursesQuery(undefined);

  const singleObject = offerCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.courseId.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      _id: item._id,
      section: item.section,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnrollCourse = async (id: string) => {
    const enrollCourseData = {
      offeredCourseId: id,
    };
    await enrollCourse(enrollCourseData);
  };

  if (!modifiedData.length) {
    return <p>No Available Course</p>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData.map((item, index) => {
        return (
          <Col span={24} style={{ border: "solid #d4d4d4 2px" }} key={index}>
            <div style={{ padding: "10px" }}>
              <h2>{item?.courseTitle}</h2>
            </div>
            <div>
              {item?.sections?.map((section: any, index: number) => (
                <Row
                  key={index}
                  justify="space-between"
                  align="middle"
                  style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}>
                  <p>Section: {section.section}</p>
                  <div>
                    Days:
                    {section.days.map((day: string[], index: number) => (
                      <Tag style={{ marginLeft: "2px" }} key={index}>
                        {day}
                      </Tag>
                    ))}
                  </div>
                  <p>Start Time: {section.startTime}</p>
                  <p>End Time: {section.endTime}</p>
                  <Button onClick={() => handleEnrollCourse(section._id)}>Enroll</Button>
                </Row>
              ))}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
export default OfferCourse;
