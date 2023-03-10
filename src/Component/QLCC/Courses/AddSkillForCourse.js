import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import ChooseSkill from "./ChooseSkill";

const columns = [
	{
		title: "ID",
		dataIndex: "id",
		key: "id",
	},
	{
		title: "Course Name",
		dataIndex: "courseName",
		key: "courseName",
	},
	{
		title: "Duration",
		dataIndex: "duration",
		key: "duration",
	},
	{
		title: "Hours Of Theory",
		dataIndex: "hoursOfTheory",
		key: "hoursOfTheory",
	},
	{
		title: "Hours Of Practice",
		dataIndex: "hoursOfPractice",
		key: "hoursOfPractice",
	},
	{
		title: "Trainer Info",
		dataIndex: "trainerInfo",
		key: "trainerInfo",
	},
	{
		title: "Number Of Enrollment",
		dataIndex: "numberOfEnrollment",
		key: "numberOfEnrollment",
	},
	{
		title: "List Of Skills",
		dataIndex: "listOfSkills",
		key: "listOfSkills",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
	},
];

export default function AddSkillForCourse() {
	const [courses, setCourses] = useState([]);
	const [course, setCourse] = useState(null);

	useEffect(() => {
		getAllCourse();
	});
	const getAllCourse = async () => {
		axios({
			method: "get",
			url: "https://localhost:44310/api/Courses",
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
							<p>HoursOfTheory: {course?.HoursOfTheory}</p>
							<p>HoursOfPractice: {course?.HoursOfPractice}</p>
							<p>TrainerInfo: {course?.TrainerInfo}</p>
							<p>NumberOfEnrollment: {course?.NumberOfEnrollment}</p>
							<p>ListOfSkills: {course?.ListOfSkills}</p>
							<ChooseSkill
								id={course?._id}
								courseName={course?.CourseName}
								duration={course?.Duration}
								hoursOfTheory={course?.HoursOfTheory}
								hoursOfPractice={course?.HoursOfPractice}
								trainerInfo={course?.TrainerInfo}
								numberOfEnrollment={course?.NumberOfEnrollment}
								description={course?.Description}
								type={course?.Type}
								startDate={course?.StartDate}
								endDate={course?.EndDate}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
