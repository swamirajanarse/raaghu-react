import React, { Suspense } from "react";

import Login from "./Login/Login";

const App = () => {
	return (
		<Login
			onForgotPassword={function (
				isForgotPasswordClicked?: boolean | undefined
			): void {
				throw new Error("Function not implemented.");
			}}
		></Login>
)
}

export default App;