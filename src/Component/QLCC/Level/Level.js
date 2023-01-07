import { Button, Form, Select, Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

const columns = [
	{
		title: "Username",
		dataIndex: "Username",
		key: "Username",
	},
	{
		title: "Trainee Name",
		dataIndex: "TraineeName",
		key: "TraineeName",
	},
	{
		title: "Skill Set",
		dataIndex: "SkillSet",
		key: "SkillSet",
	},
	{
		title: "Level",
		dataIndex: "Level",
		key: "Level",
	},
];

export default function Level() {
	const [level, setLevel] = useState([]);

	const getTraineesByLevel = async (values) => {
		axios({
			method: "post",
			url: "http://localhost:8080/api/v1/trainees/Level",
			data: {
				Level: values?.Level,
			},
		})
			.then((res) => {
				setLevel(res?.data);
				console.log(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		console.log("Success:", values);
		getTraineesByLevel(values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
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
						name='Level'
						label='Level'
						hasFeedback
						rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
						<Select placeholder='Chọn level'>
							<Select.Option value='intern'>Intern</Select.Option>
							<Select.Option value='fresher'>Fresher</Select.Option>
							<Select.Option value='junior'>Junior</Select.Option>
							<Select.Option value='middle'>Middle</Select.Option>
							<Select.Option value='senior'>Senior</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button type='primary' htmlType='submit'>
							Xem thông tin
						</Button>
					</Form.Item>
				</Form>
				<Table
					loading={level.length > 0 ? false : true}
					style={{ width: 800 }}
					dataSource={level}
					columns={columns}
				/>
			</div>
		</div>
	);
}
