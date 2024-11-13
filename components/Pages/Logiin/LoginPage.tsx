"use client";

import React, { useState } from 'react'
import "./Components/login.css"
import { TextBoxComponent } from '@/components/CommonComponents/Fields/TextBox/TextBoxComponent'
import Image from 'next/image'
import { ButtonComponents } from '@/components/CommonComponents/Fields/Button/ButtonComponents'
import { useRouter } from 'next/navigation';
import { loginDataI } from './Components/LoginStateI';
const LoginPage = () => {
    const navigate = useRouter();
    const [formData, setFormData] = useState<loginDataI>({
        email: "",
        password: ""
    });
    const handleLoginInputChange = (key: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }
    const handleNavigate = () => {
        navigate.push(`/citation`)
    }
    return (
        <>
            <div className="_login_form_container_body">
                <div className="_login_form_container_fluid">
                    <div className="_logo_conatiner">
                        <Image
                            src={""}
                            alt=''
                        />
                        <h3>CJN</h3>
                    </div>

                    <div className="_sign_in_title_container">
                        <h1>Sign in</h1>
                    </div>
                    <div className="_email_address_container">
                        <TextBoxComponent
                            fieldName=''
                            value={formData?.email}
                            placeholder='Email address'
                            onChangeValue={(e)=>handleLoginInputChange("email",e)}
                        />
                    </div>
                    <div className="_password_container">
                        <TextBoxComponent
                            placeholder='Password'
                            value={formData?.password}
                            onChangeValue={(e)=>handleLoginInputChange("password",e)}
                        />
                    </div>

                    <div className="_button_container">
                        <div></div>
                        <div className="_button">
                            <ButtonComponents
                                color='#3672b3'
                                name='Next'
                                textColor='#fff'
                                handleClick={handleNavigate}
                                disabled={false}
                                showBackgroundColor={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage