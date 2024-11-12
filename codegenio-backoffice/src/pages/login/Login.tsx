
import "./Login.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    // initializations 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [formData] = useState<IData[]>([]);
    const navigate = useNavigate();
    const Base_URL = 'https://mgmt-api.codegenio.com/api'

    const formSubmit = (data: any) => {
        const userRequest = axios.post(Base_URL + '/public/login', {
            email: data.email,
            password: data.password

        })
        userRequest.then(function (response) {
            console.log(response)

            if (response.data.success === true) {
                reset()
                alert(response.data.msg);
                navigate("/clientlist");
                localStorage.setItem("token", response.data.data.token);
                formData.push(
                    {
                        email: response.data.data.email,
                        password: ""
                    }
                )
                localStorage.setItem("Data", JSON.stringify(formData))

            } else {
                alert(response.data.errors.general);
            }
        })

    };
    

    return (
        <div className="main">
            {/* header */}
            <div className="header">
                <div className="logo"><img src="https://codegenio.com/images/logo.svg" alt="logo" /></div>
                <div className="nav">
                    <i className="fa-solid fa-globe"></i>
                    <Link to="/">SignUp</Link>
                    <button type="button">Request Demo</button>
                </div>
            </div>
            {/* login page */}
            <div className="login-page">
                {/* top */}
                <div className="top">
                    <h2>Agent Login</h2>
                    <p>Hey, Enter your details to get signin to your account</p>
                </div>
                {/* input field */}
                <div className="input">
                    <form onSubmit={handleSubmit(formSubmit)}>
                        <input
                            type="text"
                            placeholder="Enter Email "
                            {...register('email', {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}

                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 3,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}

                        <Link to="/input-fields" className="link"><p>Having trouble signing in?</p></Link>
                        <button type="submit">Login</button>
                    </form>
                </div>
                {/* bottom */}
                {/* sigin with google etc */}
                <div className="bottom">
                    <p>--or sign in with--</p>
                    <div className="icons">
                        <button type="button"><i className="fa-brands fa-google"></i>Google</button>
                        <button type="button"><i className="fa-brands fa-apple"></i>Apple ID</button>
                        <button type="button"><i className="fa-brands fa-facebook-f"></i>Facebook</button>
                    </div>
                    <span>Don't have an account? <Link to="/">Request Now</Link></span>
                </div>

            </div>
            <footer>© 2024 Codegenio. All rights reserved.</footer>

        </div>
    )
}
export default Login
export interface IData {
    
    email: string;
    password: string;
}