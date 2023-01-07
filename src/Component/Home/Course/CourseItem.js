import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../App";

export default function CourseItem(props) {
	const navigate = useNavigate();
	const { setCourse } = useAppContext();

	const onClickCTKH = () => {
		setCourse({ id: props?.id });
		navigate("/chitietkhoahoc");
	};

	return (
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
					Tên khóa học : {props?.CourseName}
				</p>
				<p>Thời gian học : {props?.Duration}</p>

				<p>Hình thức học: {props?.Type}</p>
				<div style={{ textOverflow: "ellipsis" }}>
					Mô tả : s{props?.Description}
				</div>
			</div>
		</div>
	);
}
