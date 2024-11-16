// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CurrencyAdd.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrencyAddProps } from "../../interfaces/Currency_Add_Service";

function CurrencyAdd() {

    // initializations
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CurrencyAddProps>();
    const navigate = useNavigate();
    const Base_URL = 'https://mgmt-api.codegenio.com/api'
    const [token, setToken] = useState("");


    // get token from local storage
    useEffect(() => {
        const storedData = localStorage.getItem("token");
        if (storedData) {
            setToken(storedData);
        }
    }, []);

    // set data to backend
    const formSubmit = (data: any) => {
        if (token) {
            const userRequest = axios.post(Base_URL + '/admin/currency/add', {
                full_name: data.full_name,
                short_name: data.short_name
            }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            userRequest.then((response) => {
                console.log(response)
                if (response.data.success === true) {
                    alert(response.data.msg);
                    reset();
                    navigate("/currency-list");
                    localStorage.setItem("currency_id", response.data.data.id);
                    console.log(response.data.data.id)
                } else {
                    alert(response.data.errors.general)

                }
            })
        }
    };
    return (
        <div className="currency-container">
            {/* Add Currency Page */}
            <div className="currency-page">
                <div className="currency-header">
                    <h2>Add Currency</h2>
                </div>
                {/* Input Fields */}
                <div className="currency-input">
                    <form onSubmit={handleSubmit(formSubmit)}>
                        {/* Currency Full Name Input */}
                        <input
                            type="text"
                            placeholder="Enter Full Name Of Currency"
                            {...register('full_name', {
                                required: 'Currency Full-Name is required'
                            })}
                        />
                        {errors.full_name && <p className="error-message">{errors.full_name.message}</p>}

                        {/* Currency Short Name Input */}
                        <input
                            type="text"
                            placeholder="Enter Short Name Of Currency"
                            {...register('short_name', {
                                required: 'Currency Short-Name is required'
                            })}
                        />
                        {errors.short_name && <p className="error-message">{errors.short_name.message}</p>}

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default CurrencyAdd