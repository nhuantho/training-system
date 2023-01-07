import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const columns = [
	{
		title: "ID",
		dataIndex: "_id",
		key: "_id",
	},
	{
		title: "Skill Name",
		dataIndex: "SkillName",
		key: "SkillName",
	},
];

export default function Skills() {
	const [skills, setSkills] = useState([]);

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

	return (
		<div style={{ textAlign: "center" }}>
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Table
					loading={skills.length > 0 ? false : true}
					style={{ width: 800 }}
					dataSource={skills}
					columns={columns}
				/>
			</div>
		</div>
	);
}
