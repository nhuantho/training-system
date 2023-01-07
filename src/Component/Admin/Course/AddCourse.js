import React from "react";

import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import swal from "sweetalert";
export default function AddCourse() {
  const addCourses = async (values) => {
    axios({
      method: "get",
      url: "http://localhost:8080/api/v1/courses",
      data: {
        CourstName: values?.username,
        Duration: values?.duration,
        HoursOfTheory: values?.HoursOfTheory,
        Description: values?.Description,
        TrainerInfo: values?.TrainerInfo,
        ListOfPreCourses: values?.ListOfPreCourses,
        Type: values?.Type,
        NumberOfEnrollment: values?.NumberOfEnrollment,
        StartDate: values?.StartDate,
        EndDate: values?.EndDate,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Đây là lỗi", err);
      });
  };
  const onFinish = (values) => {
    console.log("Success:", typeof values?.Duration);
    addCourses(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    swal({
      title: "Chưa nhập đủ thông tin",
      icon: "warning",
      dangerMode: true,
    });
  };
  return (
    <div>
      <div style={{ fontSize: 25, marginTop: 50, marginLeft: 50 }}>
        {" "}
        them san pham{" "}
      </div>
      <div
        style={{
          width: 1500,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          label="Name"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          name="basic"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="username" label="CourseName">
            <Input placeholder="Nhập Course Name" />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <Input placeholder="Nhập  Duration" />
          </Form.Item>
          <Form.Item name="HoursOfTheory" label="HoursOfTheory">
            <Input placeholder="Nhập HoursOfTheory" />
          </Form.Item>
          <Form.Item name="HoursOfPractice" label="HoursOfPractice">
            <Input placeholder="Nhập HoursOfPractice" />
          </Form.Item>
          <Form.Item name="Description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="TrainerInfo" label="TrainerInfo    ">
            <Input placeholder="Nhập TrainerInfo" />
          </Form.Item>
          <Form.Item name="ListOfPreCourses" label="ListOfPreCourses">
            <Input placeholder="Nhập ListOfPreCourses" />
          </Form.Item>
          <Form.Item name="Type" label="Type">
            <Input placeholder="Nhập Type" />
          </Form.Item>
          <Form.Item name="NumberOfEnrollment" label="NumberOfEnrollment">
            <Input placeholder="Nhập NumberOfEnrollment    " />
          </Form.Item>
          <Form.Item name="StartDate" label="StartDate">
            <Input placeholder="Nhập StartDate" />
          </Form.Item>
          <Form.Item name="EndDate" label="EndDate">
            <Input placeholder="Nhập EndDate" />
          </Form.Item>
          <Form.Item>
            <Button style={{ marginLeft: 200 }} type="primary" htmlType="add">
              add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
