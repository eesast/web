import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  Select,
  message,
} from "antd";
import { useUrl } from "../../api/hooks/url";
import * as graphql from "../../generated/graphql";
import { useEffect } from "react";

interface CourseCardProps {
  code: string;
  name: string;
  year: number;
  semester: string;
  professor: string;
  type: string;
  language: string;
}

const CourseCard: React.FC<CourseCardProps> = (props) => {
  return (
    <Card>
      <h1>{props.name}</h1>
      <p>{props.code}</p>
      <p>{props.year}</p>
      <p>{props.semester}</p>
      <p>{props.professor}</p>
      <p>{props.type}</p>
      <p>{props.language}</p>
    </Card>
  );
};

const CoursesPage: React.FC = () => {
  const url = useUrl();
  const course_id = url.query.get("course");

  const [form] = Form.useForm();

  // const { data: courseData, error: courseError } = graphql.useGetCourseSuspenseQuery({
  const {
    data: courseData,
    error: courseError,
    refetch: courseRefetch,
  } = graphql.useGetCourseQuery({
    variables: {
      code: form.getFieldValue("code")?.toString(),
      name: form.getFieldValue("name")?.toString(),
      year: form.getFieldValue("year")?.year(),
      semester: form.getFieldValue("semester")?.toString(),
      professor: form.getFieldValue("professor")?.toString(),
      type: form.getFieldValue("type")?.toString(),
      language: form.getFieldValue("language")?.toString(),
    },
  });

  useEffect(() => {
    if (courseError) {
      message.error("课程加载失败");
      console.log(courseError.message);
    }
  }, [courseError]);

  return (
    <Layout
      className="site-layout"
      style={{
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 30,
        minHeight: 380,
        background: "#fff",
      }}
    >
      <Col span={12}>
        <Form form={form} layout="inline">
          <Form.Item name="year" label="年份">
            <DatePicker picker="year" />
          </Form.Item>
          <Form.Item name="semester" label="学期">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "all", label: "全部学期" },
                { value: "spring", label: "春季学期" },
                { value: "autumn", label: "秋季学期" },
                { value: "summer", label: "夏季学期" },
              ]}
              defaultValue={"all"}
            />
          </Form.Item>
          <Form.Item name="code" label="课程号">
            <Input></Input>
          </Form.Item>
          <Form.Item name="name" label="课程名">
            <Input></Input>
          </Form.Item>
          <Form.Item name="professor" label="主讲教师">
            <Input></Input>
          </Form.Item>
          <Form.Item name="type" label="课程属性">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "all", label: "全部属性" },
                { value: "must", label: "核心必修" },
                { value: "required", label: "专业限选" },
                { value: "optional", label: "专业任选" },
              ]}
              defaultValue={"all"}
            />
          </Form.Item>
          <Form.Item name="language" label="授课语言">
            <Select
              style={{ width: 120 }}
              options={[
                { value: "all", label: "全部语言" },
                { value: "chinese", label: "中文" },
                { value: "english", label: "英文" },
              ]}
              defaultValue={"all"}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={courseRefetch}>
              查询
            </Button>
          </Form.Item>
        </Form>
        {courseData?.share_course.map((course) => (
          <CourseCard
            code={course.code}
            name={course.name}
            year={course.year}
            semester={course.semester}
            professor={course.professor}
            type={course.type}
            language={course.language}
          />
        ))}
      </Col>
      <Col span={12} hidden={course_id === null}>
        <h1>课程详情</h1>
      </Col>
    </Layout>
  );
};

export default CoursesPage;
