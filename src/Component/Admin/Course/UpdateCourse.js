import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import axios from "axios";

export default function UpdateCourse({ id }) {
	const UpdateCourse = async (values) => {
		axios({
			method: "put",
			url: "http://localhost:8080/api/v1/courses/" + id,
			data: {
				CourseName: values?.CourseName,
				Duration: values?.Duration,
				HoursOfTheory: values?.HoursOfTheory,
				HoursOfPractice: values?.HoursOfPractice,
				TrainerInfo: values?.TrainerInfo,
				Description: values?.Description,
				ListOfSkills: [values?.ListOfSkills],
				Type: values?.Type,
				NumberOfEnrollment: values?.NumberOfEnrollment,
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
		UpdateCourse(values);
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
				<div style={{ width: 600 }}>
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
							label='Course Name'
							name='CourseName'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Duration'
							name='Duration'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<InputNumber />
						</Form.Item>

						<Form.Item
							label='Hours Of Theory'
							name='HoursOfTheory'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<InputNumber />
						</Form.Item>

						<Form.Item
							label='Hours Of Practice'
							name='HoursOfPractice'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<InputNumber />
						</Form.Item>

						<Form.Item
							label='Trainer Info'
							name='TrainerInfo'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Description'
							name='Description'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='List Of Skills'
							name='ListOfSkills'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Type'
							name='Type'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							label='Number Of Enrollment'
							name='NumberOfEnrollment'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<InputNumber />
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}>
							<Button icon={<LoginOutlined />} type='primary' htmlType='submit'>
								Sửa khóa học
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
