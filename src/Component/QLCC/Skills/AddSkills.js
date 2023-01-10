import { Button, Form } from "antd";
import axios from "axios";
import Input from "rc-input";
import React from "react";
import swal from "sweetalert";

export default function AddSkills() {
	const updateSkill = async (values) => {
		axios({
			method: "post",
			url: "https://localhost:44310/api/Skills",
			data: {
				skillName: values?.SkillName,
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
					autoComplete='off'
					style={{ width: 600 }}>
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
								Thêm
							</Button>
						</div>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
