import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import CourseItem from "./Component/Home/Course/CourseItem";
import CourseDetail from "./Component/Home/Course/CourseDetail";
export const AppContext = createContext({
	user: {},
	setUser: () => {},
	course: {},
	setCourse: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function App() {
	const [user, setUser] = useState();
	const [course, setCourse] = useState();
	return (
		<div>
			<div
				className='header'
				style={{
					top: 0,

					width: "100%",
					height: "50px",
					position: "fixed",
					backgroundColor: "violet",
				}}>
				header
			</div>
			<AppContext.Provider
				value={{
					user,
					setUser,
					course,
					setCourse,
				}}>
				<Router>
					<div>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/khoahoc' element={<CourseItem />} />
							<Route path='/dangnhap' element={<Login />} />
							<Route path='/dangky' element={<Register />} />
							<Route path='/dangky' element={<Register />} />
							<Route path='/chitietkhoahoc' element={<CourseDetail />} />
						</Routes>
					</div>
				</Router>
			</AppContext.Provider>
		</div>
	);
}
