import { Button, Result, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../App";

const column1 = [
	{
		title: "Exercise Description",
		dataIndex: "ExerciseDescription",
		key: "ExerciseDescription",
	},
	{
		title: "Type",
		dataIndex: "Type",
		key: "Type",
	},
	{
		title: "Mark",
		dataIndex: "Mark",
		key: "Mark",
	},
];

export default function Information() {
	const [skills, setSkills] = useState([]);
	const { name } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		getAllSkills();
	});
	const getAllSkills = async () => {
		axios({
			method: "get",
			url:
				"https://localhost:44310/api/TraineeCourseManagements/name/" +
				name?.traineeName,
		})
			.then((res) => {
				setSkills(res?.data);
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
				}}>
				{skills.length === 0 ? (
					<Result title='Bạn chưa kiểm tra bài thi nào!' />
				) : (
					<div>
						{skills?.contents.map((c, index) => {
							return (
								<div key={index}>
									<h2>Bài kiểm tra: {c?.ContentName}</h2>
									<Table
										style={{ width: 800 }}
										dataSource={c?.Exercises}
										columns={column1}
									/>
								</div>
							);
						})}
						<h2>Thi cuối kì</h2>
						<p>Type: {skills?.finalExam?.Type}</p>
						<p>Mark1st: {skills?.finalExam?.Mark1st}</p>
						<h2>Tổng điểm: {skills?.totalScore}</h2>
						<h1>Trạng thái: {skills?.status}</h1>
						<Button onClick={() => navigate(-1)}>Quay lại</Button>
					</div>
				)}
			</div>
		</div>
	);
}
