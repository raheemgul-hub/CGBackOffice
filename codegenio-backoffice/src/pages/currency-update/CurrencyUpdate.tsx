
import { useForm } from "react-hook-form";

import "../project-save/ProjectSave.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CurrencyAddProps } from "../../interfaces/Currency_Add_Service";



function CurrencyUpdate() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CurrencyAddProps>();
    const navigate = useNavigate();
    const Base_URL = 'https://mgmt-api.codegenio.com/api'

    const [token, setToken] = useState("");
    const { id, } = useParams<{ id: string }>();



    // get token from local storage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const onSubmit = (data: any) => {
        const userRequest = axios.post(Base_URL + '/admin/currency/update', {
            id: id,
            full_name: data.full_name,
            short_name: data.short_name,
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        userRequest.then((response) => {
            console.log("updatecurrency", response)
            if (response.data.success === true) {
                alert(response.data.msg);
                reset();
                navigate("/currencylist");
            } else {
                alert(response.data.errors.general)

            }
        })

    };
    return (
        <div className="mainn">
           
            {/* login page */}
            <div className="login-page">
                <div className="top">
                    <h2>Update Currency</h2>
                </div>
                {/* input fields */}
                <div className="input">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* currency fullName input */}
                        <input
                            type="text"
                            placeholder="Enter Full Name Of Currency "
                            {...register('full_name', {
                                required: ' Currency Full-Name is required'
                            })}
                        />
                        {errors.full_name && <p className="error">{errors.full_name.message}</p>}

                        {/* currency short name input*/}
                        <input
                            type="text"
                            placeholder="Enter Short Name Of Currency "
                            {...register('short_name', {
                                required: ' Currency Short-Name is required'
                            })}
                        />
                        {errors.short_name && <p className="error">{errors.short_name.message}</p>}




                        <button type="submit">Submit</button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default CurrencyUpdate;
