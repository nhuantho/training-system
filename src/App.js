import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";

export const AppContext = createContext({
	user: {},
	setUser: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function App() {
	const [user, setUser] = useState();
	return (
		<div>
			<AppContext.Provider
				value={{
					user,
					setUser,
				}}>
				<Router>
					<div>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/dangnhap' element={<Login />} />
							<Route path='/dangky' element={<Register />} />
						</Routes>
					</div>
				</Router>
			</AppContext.Provider>
		</div>
	);
}
