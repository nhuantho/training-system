import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const columns = [
	{
		title: "ID",
		dataIndex: "_id",
		key: "id",
	},
	{
		title: "Username",
		dataIndex: "Username",
		key: "Username",
	},
	{
		title: "Role",
		dataIndex: "Role",
		key: "Role",
	},
];

export default function Student() {
	const [courses, setCourses] = useState([]);
	const [student, setStudent] = useState(null);
	const [password, setPassword] = useState(null);

	useEffect(() => {
		getAllCourse();
	});
	const getAllCourse = async () => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/accounts",
		})
			.then((res) => {
				setCourses(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const getAccountById = async (values) => {
		axios({
			method: "get",
			url: "http://localhost:8080/api/v1/accounts/" + values?.id,
		})
			.then((res) => {
				setStudent(res?.data);
				console.log(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const removeAccountById = async (string) => {
		axios({
			method: "delete",
			url: "http://localhost:8080/api/v1/accounts/" + string,
		})
			.then((res) => {})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const updateAccount = async () => {
		axios({
			method: "put",
			url: "http://localhost:8080/api/v1/accounts/" + student?._id,
			data: {
				Username: student?.Username,
				Password: password,
				Role: "hocvien",
			},
		})
			.then((res) => {})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const onFinish = (values) => {
		getAccountById(values);
	};
	const onFinishFailed = (errorInfo) => {
		swal({
			title: "Chưa nhập đủ thông tin",
			icon: "warning",
			dangerMode: true,
		});
	};

	const onchange = (e) => {
		setPassword(e.target.value);
		console.log(e.target.value);
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
					padding: 50,
				}}>
				<Table
					loading={courses.length > 0 ? false : true}
					style={{ width: 800 }}
					dataSource={courses}
					columns={columns}
				/>

				<h2 style={{ marginTop: 50 }}>Tìm kiếm thông tin học viên</h2>
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
						label='Nhập mã học viên'
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
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button type='primary' htmlType='submit'>
							Tìm kiếm
						</Button>
					</Form.Item>
				</Form>
				<div>
					{student === null ? (
						<div></div>
					) : (
						<div>
							<p>Mã: {student?._id}</p>
							<p>Tài khoản: {student?.Username}</p>
							<p>Role: {student?.Role}</p>
							<h1>Đổi mật khẩu</h1>
							<Input.Password onChange={onchange} />
							<Button onClick={() => updateAccount()}>
								Bạn có muốn đổi mật khẩu
							</Button>
							<Button onClick={() => removeAccountById(student?._id)}>
								Bạn có muốn xóa học viên?
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
