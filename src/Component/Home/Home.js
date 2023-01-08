import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App";
import Course from "./Course/Course";
export default function Home() {
	const navigate = useNavigate();
	const { user, setUser } = useAppContext();

	return (
		<div style={{ textAlign: "center", backgroundColor: "antiquewhite" }}>
			<div style={{ marginLeft: 900, paddingTop: 20 }}>
				{user === null ? (
					<Button onClick={() => navigate("/dangnhap")}>Đăng nhập</Button>
				) : (
					<Button onClick={() => setUser(null)}>Đăng xuất</Button>
				)}
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
				<Course />
			</div>
		</div>
	);
}
