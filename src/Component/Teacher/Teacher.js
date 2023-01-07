import React, { useState, useEffect } from "react";
import { useAppContext } from "../../App";
import axios from "axios";
export default function Teacher() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getAllCourses();
  }, []);
  const getAllCourses = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/v1/courses",
    })
      .then((res) => {
        setCourses(res?.data);
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  console.log(courses);
  return (
    <div>
      <div style={{ fontSize: "2rem", marginTop: 60 }}>Xem danh sach</div>
      <table style={{ height: "100%", width: 700, marginLeft: 40 }}>
        {courses.map((c, index) => {
          return (
            <tr
              style={{
                display: "flex",
                border: "1px solid",
                justifyContent: "space-between",
                height: 120,
              }}
            >
              <div key={index} style={{ marginLeft: 20, fontSize: "20px" }}>
                <p> Tên học phần: {c?.CourseName}</p>
                <p>Thời gian: {c?.Duration}</p>
                <p>GIảng viên: {c?.TrainerInfo}</p>
              </div>
              <div style={{ marginRight: 30 }}>xoa</div>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
