import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';
import './style.css';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [redirect, setRedirect] = useState('');

    const [emailValidation, setEmailValidation] = useState('');
    const [passwordValidation, setPasswordValidation] = useState('');
    const [firstNameValidation, setFirstNameValidation] = useState('');
    const [lastNameValidation, setLastNameValidation] = useState('');
    const [address1Validation, setAddress1Validation] = useState('');
    const [cityValidation, setCityValidation] = useState('');
    const [stateValidation, setStateValidation] = useState('');
    const [zipCodeValidation, setZipCodeValidation] = useState('');

    const validateEmail = () => {
        const emailExp = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        if (email === '' || !emailExp.test(email)) {
            setEmailValidation('Email format is incorrect.');
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        const check = {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            symbol: false,
        };
        const invalidSymbol = [];
        if (password.length >= 8) {
            check.length = true;
        }
        for (let i = 0; i < password.length; i++) {
            const letterCode = password.charCodeAt(i);
            if (letterCode >= 65 && letterCode <= 89) {
                check.uppercase = true;
                continue;
            }

            if (letterCode >= 97 && letterCode <= 122) {
                check.lowercase = true;
                continue;
            }

            if (letterCode >= 48 && letterCode <= 57) {
                check.number = true;
                continue;
            }

            if (letterCode >= 32 && letterCode <= 47) {
                check.symbol = true;
                continue;
            }

            if (letterCode >= 58 && letterCode <= 64) {
                check.symbol = true;
                continue;
            }

            if (letterCode >= 91 && letterCode <= 96) {
                check.symbol = true;
                continue;
            }

            if (letterCode >= 123 && letterCode <= 126) {
                check.symbol = true;
                continue;
            }
            invalidSymbol.push(password.charAt(i));
        }
        let passwordString =
            'Password needs to contain at least 8 characters, uppercase, lowercase, a number, and a symbol.';
        if (invalidSymbol.length > 0) {
            passwordString += `\nInvalid character: ${invalidSymbol.join(' ')}`;
        }
        console.log(check);
        if (
            !check.length ||
            !check.uppercase ||
            !check.lowercase ||
            !check.number ||
            !check.symbol
        ) {
            setPasswordValidation(passwordString);
            return false;
        }
        return true;
    };

    const validateFirstName = () => {
        if (firstName === '') {
            setFirstNameValidation('Please enter a first name');
            return false;
        }
        return true;
    };

    const validateLastName = () => {
        if (lastName === '') {
            setLastNameValidation('Please enter a last name');
            return false;
        }
        return true;
    };

    const validateAddress1 = () => {
        if (address1 === '') {
            setAddress1Validation('Please enter an address');
            return false;
        }
        return true;
    };

    const validateCity = () => {
        if (city === '') {
            setCityValidation('Please enter a city');
            return false;
        }
        return true;
    };

    const validateState = () => {
        if (state === '') {
            setStateValidation('Please enter a state');
            return false;
        }
        return true;
    };

    const validateZipCode = () => {
        const zipCodeExp = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$');
        if (zipCode === '' || !zipCodeExp.test(zipCode)) {
            setZipCodeValidation('Please enter a valid zip code');
            return false;
        }
        return true;
    };

    const createUser = (event) => {
        event.preventDefault();
        setEmailValidation('');
        setPasswordValidation('');
        setFirstNameValidation('');
        setLastNameValidation('');
        setAddress1Validation('');
        setCityValidation('');
        setStateValidation('');
        setZipCodeValidation('');

        if (
            !validateEmail() ||
            !validatePassword() ||
            !validateFirstName() ||
            !validateLastName() ||
            !validateAddress1() ||
            !validateCity() ||
            !validateState() ||
            !validateZipCode()
        ) {
            return;
        }

        API.signup({
            email,
            password,
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            zipCode,
        }).then((response) => {
            if (response.status === 200) {
                API.login(email, password).then(() => setRedirect(true));
            }
        });
    };

    if (redirect) {
        return <Redirect to="/Members" />;
    }

    return (
        <div className="signUpDiv">
            <h1 className="signUpTitle">Create an account</h1>
            <form id="signUpForm" onSubmit={createUser}>
                <table className="signUpTable">
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="email" className="signUpLabel">
                                    Email:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{emailValidation}</td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="password"
                                    className="signUpLabel"
                                >
                                    Password:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder=""
                                    className="signUpInput"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{passwordValidation}</td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="firstName"
                                    className="signUpLabel"
                                >
                                    First Name:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="firstName"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={firstName}
                                    onChange={(event) => {
                                        setFirstName(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">
                                {firstNameValidation}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="lastName"
                                    className="signUpLabel"
                                >
                                    Last Name:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="lastName"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={lastName}
                                    onChange={(event) => {
                                        setLastName(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{lastNameValidation}</td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="address1"
                                    className="signUpLabel"
                                >
                                    Address Line 1:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="address1"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={address1}
                                    onChange={(event) => {
                                        setAddress1(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{address1Validation}</td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="address2"
                                    className="signUpLabel"
                                >
                                    Address Line 2:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="address2"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={address2}
                                    onChange={(event) => {
                                        setAddress2(event.target.value);
                                    }}
                                />
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="city" className="signUpLabel">
                                    City:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="city"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={city}
                                    onChange={(event) => {
                                        setCity(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{cityValidation}</td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="state" className="signUpLabel">
                                    State:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="state"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={state}
                                    onChange={(event) => {
                                        setState(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{stateValidation}</td>
                        </tr>
                        <tr>
                            <td>
                                <label
                                    htmlFor="zipCode"
                                    className="signUpLabel"
                                >
                                    Zip Code:
                                </label>
                            </td>
                            <td>
                                <input
                                    name="zipCode"
                                    type="text"
                                    placeholder=""
                                    className="signUpInput"
                                    value={zipCode}
                                    onChange={(event) => {
                                        setZipCode(event.target.value);
                                    }}
                                />
                            </td>
                            <td className="validation">{zipCodeValidation}</td>
                        </tr>
                        <tr rowSpan="2">
                            <td>
                                <input
                                    type="submit"
                                    value="Create Account"
                                    className="btn btn-default"
                                    id="createBtn"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default SignUp;
