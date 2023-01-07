import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
		key: "Hours Of Practice",
	},
	{
		title: "Số Lượng",
		dataIndex: "trainerInfo",
		key: "trainerInfo",
	},
];

export default function Courses() {
	const [courses, setCourses] = useState([]);

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
			</div>
		</div>
	);
}
