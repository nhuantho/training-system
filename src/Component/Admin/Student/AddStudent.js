import React from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import axios from "axios";

export default function AddStudent() {
	const checkTTNguoiDungByTK = async (values) => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/auth/" + values?.username,
		})
			.then((res) => {
				if (res?.data === null) {
					addAccount(values);
				} else {
					swal({
						title: "Đã tồn tại",
						icon: "warning",
						dangerMode: true,
					});
				}
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const addAccount = async (values) => {
		axios({
			method: "post",
			url: "http://localhost:8080/api/v1/accounts",
			data: {
				Username: values?.username,
				Password: values?.password,
				Role: "hocvien",
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
		checkTTNguoiDungByTK(values);
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
							label='Tài khoản'
							name='username'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input />
						</Form.Item>

						<Form.Item
							label='Mật khẩu'
							name='password'
							rules={[
								{
									required: true,
									message: "Vui lòng không bỏ trống",
								},
							]}>
							<Input.Password />
						</Form.Item>

						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}>
							<Button icon={<LoginOutlined />} type='primary' htmlType='submit'>
								Thêm học viên
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
