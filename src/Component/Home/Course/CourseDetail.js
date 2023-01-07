import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../App";
import "./Course.css";
export default function CourseDetail() {
  const { course } = useAppContext();
  const [courseDetail, setCourseDetail] = useState();

  useEffect(() => {
    getCourseById();
  });
  const getCourseById = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/v1/courses/" + course?.id,
    })
      .then((res) => {
        setCourseDetail(res?.data);
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  return (
    <div className="content">
      <div style={{ marginTop: 50 }}>
        <table style={{}}>
          <tr>
            <th>nội dung</th>
            <th>thông tin</th>
          </tr>
          <tr>
            <th>Tên khóa học: </th>
            <th> {courseDetail?.CourseName}</th>
          </tr>
          <tr>
            <th>Thời gian học:</th>
            <th> {courseDetail?.Duration}</th>
          </tr>
          <tr>
            <th>Giờ học lý thuyết: </th>
            <th>{courseDetail?.HoursOfTheory}</th>
          </tr>
          <tr>
            <th>Giờ học thực hành:</th>
            <th> {courseDetail?.HoursOfPractice}</th>
          </tr>
          <tr>
            <th>Giản viên: </th>
            <th>{courseDetail?.TrainerInfo}</th>
          </tr>
          <tr>
            <th>Kỹ năng: </th>
            <th>{courseDetail?.ListOfSkills}</th>
          </tr>
          <tr>
            <th>Mô tả: </th>
            <th> {courseDetail?.Description}</th>
          </tr>
          <tr>
            <th>Hình thức: </th>
            <th> {courseDetail?.Type}</th>
          </tr>
          <tr>
            <th>Sô đăng ký:</th>
            <th> {courseDetail?.NumberOfEnrollment}</th>
          </tr>
          <tr>
            <th>Ngày bắt đầu: </th>
            <th>{courseDetail?.StartDate}</th>
          </tr>
          <tr>
            <th>Ngày kết thúc:</th>
            <th> {courseDetail?.EndDate}</th>
          </tr>
        </table>
      </div>
    </div>
  );
}
