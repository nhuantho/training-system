import React, { useState, useEffect } from "react";
import { useAppContext } from "../../App";
import axios from "axios";
import { Form } from "antd";
export default function Admin() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Hours Of Theory",
      dataIndex: "hoursOfTheory",
      key: "hoursOfTheory",
    },
    {
      title: "Hours Of Practice",
      dataIndex: "hoursOfPractice",
      key: "Hours Of Practice",
    },
    {
      title: "Số Lượng",
      dataIndex: "trainerInfo",
      key: "trainerInfo",
    },
  ];
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
      <div
        style={{
          fontSize: "20px",
          border: "1px solid",
          height: 30,
          width: 200,
          margin: "20px 0 0 300px",
        }}
      >
        Thêm Khóa Hóa Học
        <Form />
      </div>
    </div>
  );
}
