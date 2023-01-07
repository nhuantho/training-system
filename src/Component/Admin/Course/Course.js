import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const columns = [
	{
		title: "ID",
		dataIndex: "_id",
		key: "id",
	},
	{
		title: "Course Name",
		dataIndex: "CourseName",
		key: "CourseName",
	},
	{
		title: "Duration",
		dataIndex: "Duration",
		key: "Duration",
	},
	{
		title: "Hours Of Theory",
		dataIndex: "HoursOfTheory",
		key: "HoursOfTheory",
	},
	{
		title: "Hours Of Practice",
		dataIndex: "HoursOfPractice",
		key: "HoursOfPractice",
	},
	{
		title: "Trainer Info",
		dataIndex: "TrainerInfo",
		key: "TrainerInfo",
	},
	{
		title: "Number Of Enrollment",
		dataIndex: "NumberOfEnrollment",
		key: "NumberOfEnrollment",
	},
	{
		title: "Start Date",
		dataIndex: "StartDate",
		key: "StartDate",
	},
	{
		title: "End Date",
		dataIndex: "EndDate",
		key: "EndDate",
	},
];

export default function Course() {
	const [courses, setCourses] = useState([]);
	const [course, setCourse] = useState(null);

	useEffect(() => {
		getAllCourse();
	});
	const getAllCourse = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/courses",
		})
			.then((res) => {
				setCourses(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const getCourseById = async (values) => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/courses/" + values?.id,
		})
			.then((res) => {
				setCourse(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const removeCourseById = async (string) => {
		axios({
			method: "delete",
			url: "http://localhost:8080/api/v1/courses/" + string,
		})
			.then((res) => {})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		getCourseById(values);
	};
	const onFinishFailed = (errorInfo) => {
		swal({
			title: "Chưa nhập đủ thông tin",
			icon: "warning",
			dangerMode: true,
		});
	};

	return (
		<div style={{ textAlign: "center" }}>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Table
					loading={courses.length > 0 ? false : true}
					style={{ width: 800 }}
					dataSource={courses}
					columns={columns}
				/>
				<h2 style={{ marginTop: 50 }}>Tìm kiếm thông tin khóa học</h2>
				<Form
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
					style={{ width: 600 }}>
					<Form.Item
						label='Nhập mã khóa học'
						name='id'
						rules={[
							{
								required: true,
								message: "Vui lòng không bỏ trống",
							},
						]}>
						<Input />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button type='primary' htmlType='submit'>
							Tìm kiếm
						</Button>
					</Form.Item>
				</Form>
				<div>
					{course === null ? (
						<div></div>
					) : (
						<div>
							<p>Mã: {course?._id}</p>
							<p>CourseName: {course?.CourseName}</p>
							<p>Duration: {course?.Duration}</p>
							<p>Duration: {course?.Duration}</p>
							<p>HoursOfPractice: {course?.HoursOfPractice}</p>
							<p>TrainerInfo: {course?.TrainerInfo}</p>
							<p>NumberOfEnrollment: {course?.NumberOfEnrollment}</p>
							{/* <h1>Đổi mật khẩu</h1> */}
							{/* <Input.Password onChange={onchange} />
							<Button onClick={() => updateAccount()}>
								Bạn có muốn đổi mật khẩu
							</Button> */}
							<Button onClick={() => removeCourseById(course?._id)}>
								Bạn có muốn xóa khóa học
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
