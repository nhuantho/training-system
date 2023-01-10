import React, { useState } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import Course from "./Course/Course";
import axios from "axios";
export default function Home() {
	const navigate = useNavigate();
	const { user, setUser, setCourse, setName } = useAppContext();
	const [courseName, setCourseName] = useState("");
	const [check, setCheck] = useState(true);
	const [courses, setCourses] = useState();

	const onchange = (e) => {
		setCourseName(e.target.value);
		console.log(e.target.value);
	};

	const onClick = () => {
		getAllCourses();
		setCheck(false);
	};

	const onClickCTKH = () => {
		setCourse({ id: courses?.id });
		navigate("/chitietkhoahoc");
	};

	const onClickCTKH1 = () => {
		getTrainees();
		navigate("/thongtin");
	};

	const getAllCourses = async () => {
		axios({
			method: "get",
			url: "https://localhost:44310/api/Courses/name/" + courseName,
		})
			.then((res) => {
				setCourses(res?.data);
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	const getTrainees = async () => {
		axios({
			method: "get",
			url: "https://localhost:44310/api/Trainees/username/" + user?.Username,
		})
			.then((res) => {
				setCourses(res?.data);
				setName({ traineeName: res?.data?.traineeName });
			})
			.catch((err) => {
				console.log("Đây là lỗi", err);
			});
	};

	return (
		<div style={{ textAlign: "center", backgroundColor: "antiquewhite" }}>
			<div style={{ marginLeft: 900, paddingTop: 20 }}>
				{user === null ? (
					<Button onClick={() => navigate("/dangnhap")}>Đăng nhập</Button>
				) : (
					<div>
						<Button onClick={onClickCTKH1}>Xem thông tin cá nhân</Button>
						<Button onClick={() => setUser(null)}>Đăng xuất</Button>
					</div>
				)}
			</div>

			<div style={{ width: 600 }}>
				<Input onChange={onchange} />
				<Button onClick={onClick}>Tìm kiếm</Button>
			</div>

			<div
				style={{
					minHeight: "95vh",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<h2 style={{ marginTop: 100 }}>Danh Sách Các Khóa Học </h2>
				{check ? (
					<Course />
				) : (
					<div>
						<Button onClick={() => setCheck(true)}>Quay lại</Button>
						<div style={{ margin: " 30px 20px" }}>
							<div
								onClick={() => onClickCTKH()}
								style={{
									width: 500,
									height: 200,
									wordWrap: " beark-word",
									border: "1px solid  #ccc",
									wordBreak: "break-word",

									overflow: "hidden",
									padding: "8px 16px ",
									cursor: "pointer",
									backgroundColor: "#fff",
								}}>
								<p style={{ fontSize: 25, marginTop: 20 }}>
									Tên khóa học : {courses?.courseName}
								</p>
								<p>Thời gian học : {courses?.duration}</p>

								<p>Hình thức học: {courses?.type}</p>
								<div style={{ textOverflow: "ellipsis" }}>
									Mô tả : s{courses?.description}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
