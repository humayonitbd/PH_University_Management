
import { useGetAllMyEnrolledCourseQuery } from "../../../redux/features/student/courseManagementApi";

const MyCourseSchedule = () => {
    const {data:MyCourseSchedule} = useGetAllMyEnrolledCourseQuery(undefined);
    console.log('myCourseSchedule', MyCourseSchedule)
    return (
      <div>
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "10px",
          }}
        >
          My Enrolled Course
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            backgroundColor: "#f7f7f7",
            padding: "40px 0",
          }}
        >
          {MyCourseSchedule?.data?.map((item) => (
            <div
              key={item.offeredCourse._id}
              style={{
                border: "2px solid #e0e0e0",
                padding: "20px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #ff6f61 0%, #d32f2f 100%)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  {item?.course.title}
                </h2>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "400",
                    color: "#f5f5f5",
                  }}
                >
                  Section: {item.offeredCourse.section}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default MyCourseSchedule;