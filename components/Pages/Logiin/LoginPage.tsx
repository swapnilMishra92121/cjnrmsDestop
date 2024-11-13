"use client";

import React, { useState } from 'react'
import "./Components/login.css"
import { TextBoxComponent } from '@/components/CommonComponents/Fields/TextBox/TextBoxComponent'
import Image from 'next/image'
import { ButtonComponents } from '@/components/CommonComponents/Fields/Button/ButtonComponents'
import { useRouter } from 'next/navigation';
import { loginDataI } from './Components/LoginStateI';
import { validateEmail, validatePassword } from '@/utils/Helper';
const LoginPage = () => {
    const navigate = useRouter();
    const [formData, setFormData] = useState<loginDataI>({
        email: "",
        password: ""
    });
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const handleLoginInputChange = (key: string, value: string) => {
        if (validateEmail(formData?.email)) {
            setEmailError(false);  
        }
        if (validatePassword(formData?.password)) {
            setPasswordError(false);
        }
        setFormData((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }
    const handleNavigate = () => {
        if (!validateEmail(formData?.email)) {
            setEmailError(true);
            return;
        }
        if (!validatePassword(formData?.password)) {
            setPasswordError(true);
            return;
        }
        
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
                            onChangeValue={(e) => handleLoginInputChange("email", e)}
                        />
                        {emailError && <p style={{ fontSize: "10px", fontStyle: "italic",color:"red" }}>
                            Enter Valid Email
                        </p>}
                    </div>
                    <div className="_password_container">
                        <TextBoxComponent
                            placeholder='Password'
                            value={formData?.password}
                            onChangeValue={(e) => handleLoginInputChange("password", e)}
                        />
                        {
                            passwordError &&
                            <p style={{ fontSize: "10px", fontStyle: "italic",color:"red" }}>
                                Password must be at least 8 characters long, contain at least one letter, one number, and one special character.
                            </p>
                        }
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