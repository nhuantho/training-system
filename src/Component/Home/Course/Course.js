import { LineHeightOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseItem from "./CourseItem";

export default function Course() {
	const [course, setCourse] = useState([]);

	useEffect(() => {
		getAllCourses();
	});
	const getAllCourses = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/courses",
		})
			.then((res) => {
				setCourse(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	return (
		<div
			className='wrapper'
			style={{
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",
			}}>
			{course.map((c, index) => {
				return (
					<CourseItem
						key={index}
						id={c?._id}
						CourseName={c?.CourseName}
						Duration={c?.Duration}
						HoursOfTheory={c?.HoursOfTheory}
						HoursOfPractice={c?.HoursOfPractice}
						Type={c?.Type}
						Description={c?.Description}
					/>
				);
			})}
		</div>
	);
}
