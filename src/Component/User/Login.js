import React from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useAppContext } from "../../App";

export default function Login() {
	const navigate = useNavigate();
	const { setUser } = useAppContext();

	const checkTTNguoiDungByTK = async (values) => {
		axios({
			method: "post",
			url: "http://localhost:8080/api/v1/auth/signin",
			data: {
				Username: values?.username,
				Password: values?.password,
			},
		})
			.then((res) => {
				if (
					res?.data === "Wrong password!" ||
					res?.data === "Username Not Found!"
				) {
					swal({
						title: "Tài khoản mật khẩu không tồn tại!",
						icon: "warning",
						dangerMode: true,
					});
				} else {
					if (res?.data === "Login successfully with role: giangvien") {
						navigate("/giangvien");
					} else if (res?.data === "Login successfully with role: admin") {
						navigate("/admin");
					} else if (res?.data === "Login successfully with role: qlcc") {
						navigate("/qlcc");
					} else if (res?.data === "Login successfully with role: hocvien") {
						navigate("/");
					}
					setUser(res?.data);
				}
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
							<div>
								<div>
									<Button
										icon={<LoginOutlined />}
										type='primary'
										htmlType='submit'>
										Đăng nhập
									</Button>
								</div>
								<p style={{ marginTop: 20 }}>
									Chưa có tài khoản? <a href='/dangky'>Đăng ký</a>
								</p>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
