import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useAppContext } from "../../App";
import Course from "./Course/Course";
export default function Home() {
	const navigate = useNavigate();
	const { user } = useAppContext();

	return (
		<div style={{ textAlign: "center", backgroundColor: "antiquewhite" }}>
			<div
				style={{
					minHeight: "100vh",
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
