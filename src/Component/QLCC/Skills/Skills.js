import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

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

	const updateSkill = async (values) => {
		axios({
			method: "put",
			url: "http://localhost:8080/api/v1/skills/" + values?.id,
			data: {
				SkillName: values?.SkillName,
			},
		})
			.then((res) => {})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		updateSkill(values);
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
				}}>
				<Table
					loading={skills.length > 0 ? false : true}
					style={{ width: 800 }}
					dataSource={skills}
					columns={columns}
				/>
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
					autoComplete='off'>
					<Form.Item
						label='ID'
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
						label='Skill Name'
						name='SkillName'
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
						<div>
							<Button type='primary' htmlType='submit'>
								Sửa
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
