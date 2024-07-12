import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import app from "../utils/firebase";

const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 

const Login = () => {
    const [loggedin, setLoggedIn] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [agree, setAgree] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider); 
            const user = result.user;
            dispatch(addUser(user));
            navigate("/");
        } catch (error) {
            console.error("Error logging in with Google:", error.message);
            setErrorMessage("Login with Google failed");
        }
    };

    const handleEmailPasswordAuth = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        if (loggedin) {
            try {
                const result = await signInWithEmailAndPassword(auth, email, password);
                const user = result.user;
                dispatch(addUser(user));
                navigate("/");
            } catch (error) {
                console.error("Error logging in:", error.message);
                setErrorMessage("Login failed");
            }
        } else {
            try {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                const user = result.user;
                dispatch(addUser(user));
                navigate("/");
            } catch (error) {
                console.error("Error signing up:", error.message);
                setErrorMessage("Signup failed");
            }
        }
    };

    return (
        <div className="mt-8 font-poppins p-10 mb-5 md:w-[35%] md:border-gray-300 md:border-2 md:rounded-lg md:m-auto md:mt-10 md:mb-7 md:p-10">
            <div>
                <h1 className="font-[550] text-2xl">
                    {loggedin ? "Login to your account." : "Register a new account."}
                </h1>
                <p className="text-[#878787] mt-2">
                    {loggedin
                        ? "Please sign in to your account"
                        : "Please fill in the details to create an account"}
                </p>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <form onSubmit={handleEmailPasswordAuth}>
                <div className="mt-6">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="rounded-md border-gray-300 border-2 p-3 block mt-2 w-full"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {!loggedin && (
                        <>
                            <div className="mt-3">
                                <label>User Name</label>
                            </div>
                            <input
                                className="rounded-md border-gray-300 border-2 p-3 block mt-2 w-full"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </>
                    )}

                    <div className="mt-3 relative">
                        <label>Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className="rounded-md border-gray-300 border-2 p-3 block mt-2 w-full pr-10"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute right-3 top-12 cursor-pointer"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </div>
                    </div>

                    {!loggedin && (
                        <div className="mt-6 flex items-center">
                            <input
                                type="checkbox"
                                className="h-5 w-5 text-[#FE8C00] cursor-pointer"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                            />
                            <label className="ml-2 text-gray-700">
                                I Agree with{" "}
                                <span className="text-[#FE8C00] cursor-pointer">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-[#FE8C00] cursor-pointer">
                                    Privacy Policy
                                </span>
                            </label>
                        </div>
                    )}
                </div>
                <p className="text-[#FE8C00] float-right mt-4">
                    {loggedin && "Forgot Password ?"}
                </p>
                <button
                    type="submit"
                    className="rounded-[2rem] bg-[#FE8C00] p-4 text-white mt-16 w-full text-sm"
                    disabled={!loggedin && !agree}
                >
                    {loggedin ? "Sign in" : "Register"}
                </button>
            </form>

            <div className="flex gap-2 items-center ml-3 md:ml-7">
                <p className="border-gray-300 border-t-[1.5px] text-white mt-10 w-[5rem] md:w-[6rem]">
                    dsfs
                </p>
                <p className="mt-3 text-gray-500 text-xs">Or sign in with</p>
                <p className="border-gray-300 border-t-[1.5px] text-white mt-10 w-[5rem] md:w-[6rem]">
                    dsfs
                </p>
            </div>

            <div onClick={handleGoogle}>
                <img
                    className="bg-transparent w-[13%] rounded-[3rem] border-gray-400 border-2 cursor-pointer m-auto mt-2"
                    src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-tmg5cp5v.png"
                    alt="Google sign in"
                />
            </div>

            <p className="text-sm text-center mt-6">
                {loggedin ? "Don't have an account?" : "Have an account?"}
                <span
                    onClick={() => setLoggedIn(!loggedin)}
                    className="text-[#FE8C00] ml-2 cursor-pointer"
                >
                    {loggedin ? "Register" : "Sign In"}
                </span>
            </p>
        </div>
    );
};

export default Login;
