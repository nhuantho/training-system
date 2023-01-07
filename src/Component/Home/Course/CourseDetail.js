import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../App";

export default function CourseDetail() {
	const { course } = useAppContext();
	const [courseDetail, setCourseDetail] = useState();

	useEffect(() => {
		getCourseById();
	});
	const getCourseById = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/courses/" + course?.id,
		})
			.then((res) => {
				setCourseDetail(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};
	return (
		<div className='content'>
			<div style={{ marginTop: 50 }}>
				<p>{courseDetail?._id}</p>
				<p>{courseDetail?.Description}</p>
			</div>
		</div>
	);
}
