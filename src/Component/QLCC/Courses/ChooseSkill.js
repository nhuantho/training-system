import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row } from "antd";
import axios from "axios";
import swal from "sweetalert";

const ChooseSkill = ({
	id,
	courseName,
	duration,
	hoursOfTheory,
	hoursOfPractice,
	trainerInfo,
	description,
	numberOfEnrollment,
	startDate,
	endDate,
	type,
}) => {
	const [skills, setSkills] = useState([]);
	const [skill, setSkill] = useState([]);

	useEffect(() => {
		getAllSkills();
	});
	const getAllSkills = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/skills",
		})
			.then((res) => {
				setSkills(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const addCourse = async () => {
		axios({
			method: "put",
			url: "https://localhost:44310/api/Courses/" + id,
			data: {
				id: id,
				courseName: courseName,
				duration: duration,
				hoursOfTheory: hoursOfTheory,
				hoursOfPractice: hoursOfPractice,
				trainerInfo: trainerInfo,
				description: description,
				listOfSkills: skill,
				numberOfEnrollment: numberOfEnrollment,
				startDate: startDate,
				endDate: endDate,
				type: type,
				listOfPreCourses: [],
			},
		})
			.then((res) => {
				swal({
					title: "Thành công",
					icon: "success",
					dangerMode: true,
				});
				console.log(res.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onChange = (checkedValues) => {
		console.log(checkedValues);
		setSkill(checkedValues);
	};

	return (
		<div>
			<h2>Chọn kỹ năng cho khóa học</h2>
			<Checkbox.Group
				style={{
					width: "100%",
				}}
				onChange={onChange}>
				<Row>
					{skills.map((s, index) => {
						return (
							<Col key={index} span={8}>
								<Checkbox value={s?.SkillName}>{s?.SkillName}</Checkbox>
							</Col>
						);
					})}
				</Row>
			</Checkbox.Group>
			<Button onClick={() => addCourse()}>Chọn kỹ năng</Button>
		</div>
	);
};
export default ChooseSkill;
