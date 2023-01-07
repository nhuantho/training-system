import React from "react";
import { Button, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useAppContext } from "../../App";

export default function Home() {
	const navigate = useNavigate();
	const { setUser } = useAppContext();

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
				Home
			</div>
		</div>
	);
}
