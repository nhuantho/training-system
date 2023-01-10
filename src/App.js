import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/User/Login";
import CourseItem from "./Component/Home/Course/CourseItem";
import CourseDetail from "./Component/Home/Course/CourseDetail";
import Teacher from "./Component/Teacher/Teacher";
import Admin from "./Component/Admin/Admin";
import QLCC from "./Component/QLCC/QLCC";
import Information from "./Component/Home/Information/Information";
export const AppContext = createContext({
	user: {},
	setUser: () => {},
	course: {},
	setCourse: () => {},
	name: {},
	setName: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function App() {
	const [user, setUser] = useState(null);
	const [course, setCourse] = useState();
	const [name, setName] = useState(null);
	return (
		<div>
			<AppContext.Provider
				value={{
					user,
					setUser,
					course,
					setCourse,
					name,
					setName,
				}}>
				<Router>
					<div>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/khoahoc' element={<CourseItem />} />
							<Route path='/dangnhap' element={<Login />} />
							<Route path='/chitietkhoahoc' element={<CourseDetail />} />
							<Route path='/giangvien' element={<Teacher />} />
							<Route path='/admin' element={<Admin />} />
							<Route path='/qlcc' element={<QLCC />} />
							<Route path='/thongtin' element={<Information />} />
						</Routes>
					</div>
				</Router>
			</AppContext.Provider>
		</div>
	);
}
