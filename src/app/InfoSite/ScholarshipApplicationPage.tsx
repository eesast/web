// import React, { useEffect, useState, useRef } from "react";
// import {
//   Space,
//   Typography,
//   Timeline,
//   List,
//   Descriptions,
//   message,
//   Button,
//   Form,
//   Modal,
//   Select,
//   Input,
//   Table,
//   Progress,
//   InputRef,
// } from "antd";
// import axios, { AxiosError } from "axios";
// import isUrl from "is-url";
// import { generateThankLetter } from "../../api/utils/application";
// import type { ColumnProps, TableProps } from "antd/lib/table";
// import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import get from "lodash.get";
// import type { FilterDropdownProps } from "antd/lib/table/interface";
// import { FilterConfirmProps } from "antd/lib/table/interface";
// import * as graphql from "@/generated/graphql";
// import { PageProps } from "..";

// const param: FilterConfirmProps = {
//   closeDropdown: true,
// };
// const { Text } = Typography;
// const { Option } = Select;
// const { TextArea } = Input;
// const { confirm } = Modal;

// const grade = new Date().getFullYear() % 10;
// const classes = [(grade + 7) % 10, (grade + 8) % 10, (grade + 9) % 10].reduce<
//   string[]
// >(
//   (pre, year) => [
//     ...pre,
//     ...[1, 2, 3, 4, 5, 6, 7, 8].map((_class) => `无${year}${_class}`),
//   ],
//   [],
// );

// const exportSelectOptions = ["全部", ...classes].map((_class) => (
//   <Option key={_class} value={_class}>
//     {_class}
//   </Option>
// ));

// const ScholarshipApplicationPage: React.FC<PageProps> = ({ mode, user }) => {
//   const [info, setInfo] = useState({
//     honors: [""],
//     scholarship: {
//       start_A: new Date(),
//       start_B: new Date(),
//       end_A: new Date(),
//       end_B: new Date(),
//     },
//   });

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get("/application/info/honor");
//         setInfo({
//           honors: response.data.types,
//           scholarship: {
//             start_A: new Date(response.data.time.start_A),
//             start_B: new Date(response.data.time.start_B),
//             end_A: new Date(response.data.time.end_A),
//             end_B: new Date(response.data.time.end_B),
//           },
//         });
//       } catch (e) {
//         const err = e as AxiosError;
//         if (err.response?.status === 401) {
//           message.error("验证失败");
//         } else if (err.response?.status === 500) {
//           message.error("数据错误");
//         } else {
//           message.error("未知错误");
//         }
//       }
//     };
//     fetch();
//   }, []);

//   const honorSelectOptions = info.honors.map((i) => (
//     <Option key={i} value={i}>
//       {i}
//     </Option>
//   ));

//   const {
//     loading: listLoading,
//     error: listError,
//     data: listData,
//   } = graphql.useGetScholarshipListQuery();

//   useEffect(() => {
//     if (listError) {
//       message.error("奖学金列表加载失败");
//     }
//   }, [listError]);

//   const scholarshipNames = Array.from(
//     new Set(listData?.scholarships_aids.map((item) => item.name)),
//   );
//   const scholarshipSelectOptions = scholarshipNames.map((name) => (
//     <Option key={name} value={name}>
//       {name}
//     </Option>
//   ));

//   const {
//     loading: applicationLoading,
//     error: applicationError,
//     data: applicationData,
//     refetch: refetchApplications,
//   } = graphql.useGetScholarshipApplicationsQuery({
//     variables: {
//       _id: user.uuid!,
//       _gte: info.scholarship.start_A,
//     },
//     skip: user.role === "counselor",
//   });

//   useEffect(() => {
//     if (applicationError) {
//       message.error("奖学金申请加载失败");
//     }
//   }, [applicationError]);

//   const [applicationFormVisible, setApplicationFormVisible] = useState(false);
//   const [editingApplication, setEditingApplication] =
//     useState<
//       graphql.GetScholarshipApplicationsQuery["scholarship_application"][0]
//     >();

//   const [form] = Form.useForm();

//   const [
//     updateApplication,
//     { loading: applicationUpdating, error: updateApplicationError },
//   ] = graphql.useUpdateScholarshipApplicationMutation();

//   useEffect(() => {
//     if (updateApplicationError) {
//       message.error("申请更新失败");
//     }
//   }, [updateApplicationError]);

//   const [
//     addApplication,
//     { loading: applicationAdding, error: addApplicationError },
//   ] = graphql.useAddScholarshipApplicationMutation();

//   useEffect(() => {
//     if (addApplicationError) {
//       message.error("奖学金记录添加失败");
//     }
//   }, [addApplicationError]);

//   const handleApplicationEdit = async (mode: boolean) => {
//     try {
//       await form.validateFields();
//     } catch {
//       return;
//     }

//     const values = form.getFieldsValue();

//     if (mode)
//       await updateApplication({
//         variables: {
//           id: editingApplication!.id,
//           thank_letter: values.thank_letter,
//           form_url: values.form_url,
//         },
//       });
//     else {
//       const { data } = graphql.useGetIdByStudentNoQuery({
//         variables: {
//           student_no: values.student_number,
//         },
//       });

//       if (data?.users.length !== 1) {
//         message.error("数据错误：用户不存在或不唯一！");
//         return;
//       }

//       // if (data.user[0].name !== values.name) {
//       //   message.error("数据错误：姓名和学号不匹配！");
//       //   return;
//       // }

//       // _id in database
//       const id = data?.users[0]?.id;

//       if (
//         !scholarshipNames.includes(values.scholarship) ||
//         !info.honors.includes(values.honor)
//       ) {
//         message.error("数据错误：奖学金或荣誉不存在！");
//         return;
//       }

//       if (listLoading) {
//         message.warning("未加载完成");
//         return;
//       }
//       const codes = listData?.scholarships_aids.map((i) => {
//         if (i.name === values.scholarship) return i.code;
//         else return "";
//       });
//       if (!codes!.includes(values.code)) {
//         message.error("数据错误：奖学金代码错误！");
//         return;
//       }

//       await addApplication({
//         variables: {
//           student_id: id!,
//           scholarship: values.scholarship,
//           honor: values.honor,
//           amount: values.amount,
//           code: values.code,
//         },
//       });
//     }

//     setApplicationFormVisible(false);
//     setEditingApplication(undefined);
//     form.resetFields();
//     refetchApplications();
//     refetchApplicationsForCounselors();
//     message.success("操作成功！");
//   };

//   const [deleteApplication, { error: deleteApplicationError }] =
//     graphql.useDeleteScholarshipApplicationMutation();

//   useEffect(() => {
//     if (deleteApplicationError) {
//       message.error("申请删除失败");
//     }
//   }, [deleteApplicationError]);

//   const handleApplicationDelete = async (id: string) => {
//     confirm({
//       title: "确定要删除此申请吗？",
//       icon: <ExclamationCircleOutlined />,
//       content: "此操作不可恢复。",
//       onOk: async () => {
//         await deleteApplication({ variables: { id } });
//         await refetchApplicationsForCounselors();
//       },
//     });
//   };

//   const {
//     loading: applicationsForCounselorsLoading,
//     error: applicationsForCounselorsError,
//     data: applicationsForCounselors,
//     refetch: refetchApplicationsForCounselors,
//   } = graphql.useGetScholarshipApplicationsForCounselorsQuery({
//     variables: { _gte: "2020-09-29" },
//     skip: user.role !== "counselor",
//   });

//   useEffect(() => {
//     if (applicationsForCounselorsError) {
//       message.error("申请加载失败");
//     }
//   }, [applicationsForCounselorsError]);

//   const searchInput = useRef<InputRef>(null);

//   const getColumnSearchProps: (
//     dataIndex:
//       | keyof graphql.GetScholarshipApplicationsForCounselorsQuery["scholarship_application"][0]
//       | (
//           | keyof graphql.GetScholarshipApplicationsForCounselorsQuery["scholarship_application"][0]
//           | "name"
//           | "class"
//         )[],
//     name: string,
//   ) => Partial<
//     ColumnProps<
//       graphql.GetScholarshipApplicationsForCounselorsQuery["scholarship_application"][0]
//     >
//   > = (dataIndex, name) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div
//         css={`
//           padding: 8px;
//         `}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`搜索${name}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm)}
//           css={`
//             width: 188px;
//             margin-bottom: 8px;
//             display: block;
//           `}
//         />
//         <Button
//           type="primary"
//           onClick={() => handleSearch(selectedKeys, confirm)}
//           icon={<SearchOutlined />}
//           size="small"
//           css={`
//             width: 90px;
//             margin-right: 8px;
//           `}
//         >
//           搜索
//         </Button>
//         <Button
//           onClick={() => handleReset(clearFilters)}
//           size="small"
//           css={`
//             width: 90px;
//           `}
//         >
//           重置
//         </Button>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         type="search"
//         style={{ color: filtered ? "#027dcd" : undefined }}
//       />
//     ),
//     onFilter: (value, record) =>
//       get(record, dataIndex)
//         .toString()
//         .toLowerCase()
//         .includes(value.toString().toLowerCase()),
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current && searchInput.current.select());
//       }
//     },
//   });

//   const scholarshipColumnsForCounselor: TableProps<
//     graphql.GetScholarshipApplicationsForCounselorsQuery["scholarship_application"][0]
//   >["columns"] = [
//     {
//       title: "学号",
//       dataIndex: ["student", "id"],
//       key: "student_id",
//       ...getColumnSearchProps(["student", "id"], "学号"),
//     },
//     {
//       title: "姓名",
//       dataIndex: ["student", "name"],
//       key: "name",
//       ...getColumnSearchProps(["student", "name"], "姓名"),
//     },
//     {
//       title: "班级",
//       dataIndex: ["student", "class"],
//       key: "class",
//       ...getColumnSearchProps(["student", "class"], "班级"),
//     },
//     {
//       title: "荣誉",
//       dataIndex: "honor",
//       key: "honor",
//       filters: info.honors.map((honor) => ({
//         text: honor,
//         value: honor,
//       })),
//       onFilter: (value, record) => record.honor === value,
//     },
//     {
//       title: "奖学金",
//       dataIndex: "scholarship",
//       key: "scholarship",
//       filters: scholarshipNames.map((scholarship) => ({
//         text: scholarship,
//         value: scholarship,
//       })),
//       onFilter: (value, record) => record.scholarship === value,
//     },
//     {
//       title: "代码",
//       dataIndex: "code",
//       key: "code",
//     },
//     {
//       title: "金额",
//       dataIndex: "amount",
//       key: "amount",
//     },
//     {
//       title: "操作",
//       key: "action",
//       render: (text, record) => (
//         <Button danger onClick={() => handleApplicationDelete(record.id)}>
//           删除
//         </Button>
//       ),
//     },
//   ];

//   const [, setSearchText] = useState<React.Key>("");

//   const handleSearch = (
//     selectedKeys: FilterDropdownProps["selectedKeys"],
//     confirm: FilterDropdownProps["confirm"],
//   ) => {
//     confirm(param);
//     setSearchText(selectedKeys[0]);
//   };

//   const handleReset = (clearFilters: FilterDropdownProps["clearFilters"]) => {
//     clearFilters?.();
//     setSearchText("");
//   };

//   const [exportFormVisible, setExportFormVisible] = useState(false);
//   const [exportScholarship, setExportScholarship] = useState("");
//   const [exportClasses, setExportClasses] = useState<string[]>([]);
//   const [exportLoading, setExportLoading] = useState(false);

//   const handleApplicationExport = async (
//     example?: graphql.GetScholarshipApplicationsForCounselorsQuery["scholarship_application"][0][],
//   ) => {
//     if (!example && exportClasses.length === 0) {
//       message.info("请选择筛选条件");
//       return;
//     }

//     setExportLoading(true);

//     const Xlsx = await import("xlsx");

//     const applications = (
//       example
//         ? example
//         : applicationsForCounselors!.scholarship_application.filter(
//             (application) =>
//               (exportScholarship
//                 ? application.scholarship === exportScholarship
//                 : true) &&
//               (exportClasses.includes("全部")
//                 ? true
//                 : exportClasses.some((_class) =>
//                     application.student.class?.includes(_class),
//                   )),
//           )
//     ).map((i) => [
//       i.id,
//       i.student.id,
//       i.student.name,
//       i.student.class,
//       i.honor,
//       i.scholarship,
//       i.code,
//       i.amount,
//     ]);

//     if (applications.length === 0) {
//       message.info("未找到符合条件的奖学金");
//       setExportLoading(false);
//       return;
//     }

//     const head = [
//       "申请 ID",
//       "学号",
//       "姓名",
//       "班级",
//       "荣誉",
//       "奖学金",
//       "代码",
//       "金额",
//     ];

//     applications.unshift(head);

//     const worksheet = Xlsx.utils.aoa_to_sheet(applications);
//     const workbook = Xlsx.utils.book_new();
//     Xlsx.utils.book_append_sheet(workbook, worksheet, "奖学金");
//     Xlsx.writeFile(
//       workbook,
//       exportScholarship ? `奖学金-${exportScholarship}.xlsx` : `奖学金.xlsx`,
//     );

//     if (!example) {
//       message.success("奖学金导出成功");
//     }
//     setExportLoading(false);
//   };

//   const handleExampleDownload = () => {
//     const student = {
//       id: 2016000000,
//       name: "测试学生",
//       department: "电子系",
//       class: "无60",
//     };
//     const example = [
//       {
//         id: "8ac0f001-8d9f-4de7-96c5-9fbfb638ad5f",
//         student,
//         honor: "好读书奖",
//         code: "J3032030",
//         scholarship: "好读书奖学金",
//         amount: 3000,
//       },
//       {
//         id: "8bc0f001-8d9f-4de7-96c5-9fbfb638ad5f",
//         student,
//         honor: "好读书奖",
//         code: "J3032080",
//         scholarship: "好读书奖学金",
//         amount: 8000,
//       },
//       {
//         id: "8cc0f001-8d9f-4de7-96c5-9fbfb638ad5f",
//         student,
//         honor: "学业优秀奖",
//         code: "J2022050",
//         scholarship: "清华之友——华为奖学金",
//         amount: 5000,
//       },
//     ];
//     handleApplicationExport(example as any);
//   };

//   const [importFormVisible, setImportFormVisible] = useState(false);
//   const [importLoading, setImportLoading] = useState(false);
//   const [fileList, setFileList] = useState<FileList | null>(null);
//   const [parseProgress, setParseProgress] = useState(0);

//   const handleApplicationImport = async () => {
//     if (!fileList || fileList.length !== 1) {
//       message.info("请选择文件");
//       return;
//     }
//     const file = fileList[0];

//     setImportLoading(true);

//     const Xlsx = await import("xlsx");

//     try {
//       const reader = new FileReader();
//       const data = await new Promise<ArrayBuffer>((resolve, reject) => {
//         reader.onerror = () => {
//           reader.abort();
//           reject();
//         };

//         reader.onload = () => {
//           resolve(reader.result as ArrayBuffer);
//         };

//         reader.readAsBinaryString(file);
//       });
//       const workbook = Xlsx.read(data, { type: "binary" });
//       const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];

//       const applications = (
//         Xlsx.utils.sheet_to_json(firstWorksheet, {
//           header: 1,
//         }) as (string | number)[][]
//       ).filter((i) => i.length !== 0);
//       const head = applications.shift();
//       if (!head || head.length < 7) {
//         throw new Error("Parse error");
//       }

//       applications.map((application) => {
//         const code = application[6].toString().trim();
//         const name = application[5].toString().trim();
//         const honor = application[4].toString().trim();

//         if (
//           !scholarshipNames.includes(name) ||
//           !info.honors.includes(honor as any)
//         ) {
//           throw new Error("Parse error");
//         }
//         if (listLoading) {
//           throw new Error("List loading");
//         }
//         const codes = listData?.scholarships_aids.map((i) => {
//           if (i.name === name) return i.code;
//           else return "";
//         });
//         if (!codes!.includes(code as any)) {
//           throw new Error("Parse error");
//         }

//         return "";
//       });

//       let count = 0;
//       await Promise.all(
//         applications.map(async (application) => {
//           try {
//             const student_id = application[1].toString();
//             const code = application[6].toString().trim();
//             const scholarship = application[5].toString().trim();
//             const amount = parseInt(application[7].toString().trim(), 10);
//             const honor = application[4].toString().trim();

//             const { data } = graphql.useGetIdByStudentNoQuery({
//               variables: {
//                 student_no: student_id,
//               },
//             });

//             // _id in database
//             const id = data?.users[0]?.id;

//             const { errors } = await addApplication({
//               variables: {
//                 student_id: id!,
//                 scholarship,
//                 honor,
//                 amount,
//                 code,
//               },
//             });

//             count++;
//             setParseProgress(Math.round((count / applications.length) * 100));

//             if (errors) {
//               throw errors;
//             }
//           } catch (err) {
//             throw err;
//           }
//         }),
//       );
//       refetchApplicationsForCounselors();
//     } catch (err) {
//       message.error("文件解析失败：" + err);
//     } finally {
//       setFileList(null);
//       setImportLoading(false);
//     }
//   };

//   const [thankLetterGenerating, setThankLetterGenerating] = useState(false);

//   return (
//     <Space
//       direction="vertical"
//       css={`
//         width: 100%;
//       `}
//     >
//       <Typography.Title level={2}>关键时间点</Typography.Title>
//       <Timeline>
//         <Timeline.Item
//           color={
//             new Date() >= info.scholarship.start_A &&
//             new Date() <= info.scholarship.end_A
//               ? "green"
//               : "red"
//           }
//         >
//           <p>第一阶段：奖学金申请</p>
//           <p>
//             {info.scholarship.start_A.toLocaleString()} ~{" "}
//             {info.scholarship.end_A.toLocaleString()}
//           </p>
//         </Timeline.Item>
//         <Timeline.Item
//           color={
//             new Date() >= info.scholarship.start_B &&
//             new Date() <= info.scholarship.end_B
//               ? "green"
//               : "red"
//           }
//         >
//           <p>第二阶段：奖学金申请结果公示</p>
//           <p>
//             {info.scholarship.start_B.toLocaleString()} ~{" "}
//             {info.scholarship.end_B.toLocaleString()}
//           </p>
//         </Timeline.Item>
//       </Timeline>
//       <Typography.Title level={2}>奖学金</Typography.Title>
//       {user.role !== "counselor" && (
//         <>
//           <List
//             loading={applicationLoading}
//             dataSource={applicationData?.scholarship_application}
//             renderItem={(item) => {
//               return (
//                 <Descriptions
//                   key={item.id}
//                   bordered
//                   size="small"
//                   css={`
//                     margin: 24px auto;
//                   `}
//                 >
//                   <Descriptions.Item label="奖学金" span={1}>
//                     {item.scholarship}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="金额" span={1}>
//                     {item.amount}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="荣誉" span={1}>
//                     {item.honor}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="专用申请表" span={3}>
//                     {item.form_url && isUrl(item.form_url) ? (
//                       <a
//                         href={item.form_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {item.form_url}
//                       </a>
//                     ) : (
//                       item.form_url ?? "无"
//                     )}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="感谢信正文" span={3}>
//                     <Text
//                       css={`
//                         word-rap: break-word;
//                         white-space: pre-wrap;
//                       `}
//                     >
//                       {item.thank_letter ?? "无"}
//                     </Text>
//                   </Descriptions.Item>
//                   <Descriptions.Item label="操作" span={3}>
//                     <Button
//                       css={`
//                         margin: 5px;
//                       `}
//                       onClick={() => {
//                         setEditingApplication(item);
//                         form.setFieldsValue(item);
//                         setApplicationFormVisible(true);
//                       }}
//                     >
//                       上传材料
//                     </Button>
//                     <Button
//                       css={`
//                         margin: 5px;
//                       `}
//                       loading={thankLetterGenerating}
//                       disabled={!item.thank_letter}
//                       onClick={() => {
//                         setThankLetterGenerating(true);
//                         try {
//                           let salutation: string | null = "";
//                           listData?.scholarships_aids.forEach((i) => {
//                             if (i.code === item.code)
//                               return (salutation = i.salutation!);
//                           });
//                           generateThankLetter(item, salutation);
//                         } catch {
//                           message.error("感谢信预览失败");
//                         } finally {
//                           setThankLetterGenerating(false);
//                         }
//                       }}
//                     >
//                       预览感谢信
//                     </Button>
//                   </Descriptions.Item>
//                 </Descriptions>
//               );
//             }}
//           />
//           <Modal
//             open={applicationFormVisible}
//             title="编辑申请"
//             centered
//             destroyOnClose
//             okText="提交"
//             onCancel={() => {
//               setApplicationFormVisible(false);
//               setEditingApplication(undefined);
//               form.resetFields();
//             }}
//             onOk={() => handleApplicationEdit(true)}
//             maskClosable={false}
//             confirmLoading={applicationUpdating}
//           >
//             <Form
//               form={form}
//               name="application"
//               onFinish={() => handleApplicationEdit(true)}
//               initialValues={editingApplication}
//             >
//               <Form.Item name="honor" label="荣誉">
//                 <Select disabled>{honorSelectOptions}</Select>
//               </Form.Item>
//               <Form.Item name="scholarship" label="奖学金">
//                 <Select disabled>{scholarshipSelectOptions}</Select>
//               </Form.Item>
//               <Form.Item name="code" label="奖学金代码">
//                 <Input disabled />
//               </Form.Item>
//               <Form.Item name="amount" label="金额">
//                 <Input disabled type="number" />
//               </Form.Item>
//               <Form.Item name="form_url" label="专用申请表">
//                 <Input placeholder="使用清华云盘上传文件并在此粘贴下载链接（带有 ?dl=1 后缀）" />
//               </Form.Item>
//               <Form.Item name="thank_letter" label="感谢信正文">
//                 <TextArea
//                   css={`
//                     resize: none;
//                   `}
//                   autoSize={{ minRows: 5 }}
//                   placeholder="仅需输入感谢信正文，抬头和称呼等内容以及格式由系统预览自动生成。预览结果不包含姓名，需自行打印手写签字。"
//                 />
//               </Form.Item>
//             </Form>
//           </Modal>
//         </>
//       )}
//       {user.role === "counselor" && (
//         <>
//           <Space direction="horizontal">
//             <Button
//               disabled={applicationsForCounselorsLoading}
//               onClick={() => setExportFormVisible(true)}
//             >
//               导出奖学金
//             </Button>
//             <Button
//               disabled={applicationsForCounselorsLoading}
//               onClick={handleExampleDownload}
//             >
//               下载导入样例
//             </Button>
//             <Button
//               disabled={applicationsForCounselorsLoading}
//               onClick={() => setImportFormVisible(true)}
//             >
//               导入奖学金
//             </Button>
//             <div style={{ flex: 1 }} />
//             <Button
//               disabled={applicationsForCounselorsLoading}
//               onClick={() => setApplicationFormVisible(true)}
//             >
//               添加奖学金记录
//             </Button>
//           </Space>
//           <Table
//             loading={applicationsForCounselorsLoading}
//             dataSource={applicationsForCounselors?.scholarship_application}
//             columns={scholarshipColumnsForCounselor}
//             rowKey="id"
//             expandable={{
//               expandedRowRender: record => (
//               <Descriptions key={record.id} size="small">
//                 <Descriptions.Item label="专用申请表" span={3}>
//                   {record.form_url && isUrl(record.form_url) ? (
//                     <a
//                       href={record.form_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {record.form_url}
//                     </a>
//                   ) : (
//                     record.form_url ?? "无"
//                   )}
//                 </Descriptions.Item>
//                 <Descriptions.Item label="感谢信正文" span={3}>
//                   <Text
//                     css={`
//                       word-rap: break-word;
//                       white-space: pre-wrap;
//                     `}
//                   >
//                     {record.thank_letter ?? "无"}
//                   </Text>
//                 </Descriptions.Item>
//                 <Descriptions.Item label="操作" span={3}>
//                   <Button
//                     loading={thankLetterGenerating}
//                     disabled={!record.thank_letter}
//                     onClick={() => {
//                       setThankLetterGenerating(true);
//                       try {
//                         let salutation: string | null = "";
//                         listData?.scholarships_aids.forEach((i) => {
//                           if (i.code === record.code)
//                             return (salutation = i.salutation!);
//                         });
//                         generateThankLetter(record, salutation);
//                       } catch {
//                         message.error("感谢信预览失败");
//                       } finally {
//                         setThankLetterGenerating(false);
//                       }
//                     }}
//                   >
//                     预览感谢信
//                   </Button>
//                 </Descriptions.Item>
//               </Descriptions>
//             )}}
//           />
//           <Modal
//             open={exportFormVisible}
//             title="导出奖学金"
//             centered
//             onOk={() => handleApplicationExport()}
//             onCancel={() => setExportFormVisible(false)}
//             maskClosable={false}
//             confirmLoading={exportLoading}
//           >
//             <Form layout="vertical">
//               <Form.Item required label="奖学金">
//                 <Select<string>
//                   placeholder="奖学金名称"
//                   onChange={(value) => setExportScholarship(value)}
//                   defaultValue=""
//                 >
//                   {scholarshipSelectOptions}
//                 </Select>
//               </Form.Item>
//               <Form.Item required label="班级">
//                 <Select<string[]>
//                   mode="tags"
//                   placeholder="选择需要导出的班级（可多选）"
//                   onChange={(value) => setExportClasses(value)}
//                 >
//                   {exportSelectOptions}
//                 </Select>
//               </Form.Item>
//               <Typography.Text>
//                 若班级不在下拉菜单内，请手动输入班级名，并回车，结果即会包含该班级的奖学金记录。
//               </Typography.Text>
//             </Form>
//           </Modal>
//           <Modal
//             open={importFormVisible}
//             title="导入奖学金"
//             centered
//             onOk={handleApplicationImport}
//             onCancel={() => setImportFormVisible(false)}
//             maskClosable={false}
//             confirmLoading={importLoading}
//             okText="导入"
//           >
//             <Typography.Paragraph>
//               上传 Excel 文件以添加奖学金。Excel
//               的格式应与样例文件相同，奖学金的名称、代码及金额均应正确。
//             </Typography.Paragraph>
//             <div
//               css={`
//                 display: flex;
//                 flex-direction: row;
//                 align-items: center;
//                 justify-content: space-between;
//               `}
//             >
//               <input
//                 id="upload-file"
//                 accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//                 type="file"
//                 name="file"
//                 onChange={(e) => setFileList(e.target.files)}
//               />
//               <label htmlFor="upload-file"></label>
//               {parseProgress > 0 && (
//                 <Progress
//                   type="circle"
//                   percent={parseProgress}
//                   status="active"
//                 />
//               )}
//             </div>
//           </Modal>
//           <Modal
//             open={applicationFormVisible}
//             title="添加奖学金记录"
//             centered
//             destroyOnClose
//             okText="提交"
//             onCancel={() => {
//               setApplicationFormVisible(false);
//               setEditingApplication(undefined);
//               form.resetFields();
//             }}
//             onOk={() => handleApplicationEdit(false)}
//             maskClosable={false}
//             confirmLoading={applicationAdding}
//           >
//             <Form
//               form={form}
//               name="application"
//               onFinish={() => handleApplicationEdit(false)}
//             >
//               <Form.Item
//                 name="name"
//                 label="姓名"
//                 rules={[{ required: true, message: "请输入姓名" }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="student_number"
//                 label="学号"
//                 rules={[{ required: true, message: "请输入学号" }]}
//               >
//                 <Input type="number" />
//               </Form.Item>
//               <Form.Item
//                 name="honor"
//                 label="荣誉"
//                 rules={[{ required: true, message: "请输入荣誉类型" }]}
//               >
//                 <Select>{honorSelectOptions}</Select>
//               </Form.Item>
//               <Form.Item
//                 name="scholarship"
//                 label="奖学金"
//                 rules={[{ required: true, message: "请输入奖学金名称" }]}
//               >
//                 <Select>{scholarshipSelectOptions}</Select>
//               </Form.Item>
//               <Form.Item
//                 name="code"
//                 label="代码"
//                 rules={[{ required: true, message: "请输入奖学金代码" }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="amount"
//                 label="金额"
//                 rules={[{ required: true, message: "请输入奖学金金额" }]}
//               >
//                 <Input type="number" />
//               </Form.Item>
//               <Form.Item name="form_url" label="专用申请表">
//                 <Input disabled placeholder="学生填写：专用申请表下载链接" />
//               </Form.Item>
//               <Form.Item name="thank_letter" label="感谢信正文">
//                 <TextArea
//                   css={`
//                     resize: none;
//                   `}
//                   autoSize={{ minRows: 5 }}
//                   disabled
//                   placeholder="学生填写：感谢信正文"
//                 />
//               </Form.Item>
//             </Form>
//           </Modal>
//         </>
//       )}
//     </Space>
//   );
// };

// export default ScholarshipApplicationPage;
