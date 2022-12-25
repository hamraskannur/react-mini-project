import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import { userAPI } from '../../../Apl'
import classes from './Signup.module.css';
import Button from '../Button/Button';


function Signup() {
    const navigate = useNavigate()
    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [enteredname, setEnteredname] = useState('');
    const [nameIsValid, setnameIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);
    const [Errmessage,setErrmessage]=useState("")
    useEffect(() => { setEmailIsValid(enteredEmail.includes('@')) }, [enteredEmail])
    useEffect(() => { setPasswordIsValid(enteredPassword.trim().length > 5) }, [enteredPassword])
    useEffect(() => { setnameIsValid(enteredname.trim().length > 0) }, [enteredname])
    useEffect(() => { setFormIsValid(emailIsValid && passwordIsValid && nameIsValid) }, [emailIsValid, passwordIsValid, nameIsValid])

    const emailChangeHandler = (event) => { setEnteredEmail(event.target.value); };
    const passwordChangeHandler = (event) => { setEnteredPassword(event.target.value); };
    const nameChangeHandler = (event) => { setEnteredname(event.target.value); };

    const submitHandler = (event) => {
        event.preventDefault();
        Axios.post(`${userAPI}register`, { enteredEmail, enteredPassword, enteredname }).then((response) => {
            const result = response.data.userSignUpp
            if (result.Status) {
                navigate('/login')
            } else {
                setErrmessage(result.message)
            }
        })
    };


    return (
        <div>
            <div className={classes.Signup} >
                        <h5 className={classes.fiSignup}>Signup</h5>
                <form onSubmit={submitHandler}>
                 
                    <div className={`${classes.control} ${nameIsValid === false ? classes.invalid : classes.valid}`} >
                        <label htmlFor="name">name</label>
                        <input type="text" id="name" value={enteredname} onChange={nameChangeHandler} />
                    </div>
                    <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : classes.valid}`} >
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} />
                    </div>
                    <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : classes.valid}`} >
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} />
                    </div>

                    <div className={classes.actions}>
                        <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                            Login
                        </Button>
                    </div>
                    <a onClick={() => { navigate('/login') }}>Already have an account?</a>
                  { Errmessage.length>0 && <a style={{ color: 'red' }}  >{Errmessage}</a>}

                </form>
            </div>

        </div>
    )
}

export default Signup
