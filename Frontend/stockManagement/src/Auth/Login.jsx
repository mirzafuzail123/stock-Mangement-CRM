import React from 'react'
import { useState } from 'react'
import AgencyLogo from '../assets/AgencyLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../UI Elemets/InputField'
import { LoginUserFunc } from '../BackendApiCalls/AuthApi'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../Partials/CustomAlert"

export default function Login() {

    const navigate = useNavigate()
    const [SubmitLoader, setSubmitLoader] = useState(false)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setSubmitLoader(true)
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        LoginUserFunc(data).then(() => {
            navigate("/")
        }).catch(() => {
            CustomAlert("Invalid credentials", "error")
        }).finally(() => {
            setSubmitLoader(false)
        })

    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img src={AgencyLogo} className='xs:h-10 xs:w-32 lg:h-14 lg:w-40' alt="" />
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <InputField
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="John"
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <InputField
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        required={true}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full text-white ${SubmitLoader ? "bg-red-300" : " bg-primary   hover:bg-secondary"} font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                                    {SubmitLoader ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : "Sign in"}
                                </button>
                                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
