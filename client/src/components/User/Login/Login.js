import React, { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";        
import classes from './Login.module.css';
import Button from '../Button/Button';
import Axios from 'axios'
import { userAPI } from '../../../Apl';
import { useDispatch} from "react-redux"
import { UserActions } from '../../../store/UserAthu';

const Login = (props) => {
 const dispatch= useDispatch()
    const navigate = useNavigate()
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [Errmessage,setErrmessage]=useState('')

  useEffect(() => {setEmailIsValid(enteredEmail.includes('@'))}, [enteredEmail])
  useEffect(() => {setPasswordIsValid(enteredPassword.trim().length > 5) }, [enteredPassword])
  useEffect(() => {setFormIsValid(emailIsValid && passwordIsValid )}, [emailIsValid,passwordIsValid ])

  const emailChangeHandler = (event) => {setEnteredEmail(event.target.value); };
  const passwordChangeHandler = (event) => { setEnteredPassword(event.target.value); };


  const submitHandler = (event) => {
    event.preventDefault();
    Axios.post(`${userAPI}login`, { enteredEmail ,enteredPassword},{withCredentials:true}).then((response) => {
        const result = response.data.userSignUpp          
        if (result.Status) {
          dispatch(UserActions.userAddDetails({name:result.name, token:result.token}))
            navigate('/')
        } else {
            setErrmessage(result.message)
        }
    })}

  return (
    <div className='container'>
    <div className={classes.login} >
    <h5 className={classes.filogin} >Login</h5>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : '' }`} >
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" value={enteredEmail} onChange={emailChangeHandler} />
        </div>
        <div  className={`${classes.control} ${passwordIsValid === false ? classes.invalid : '' }`} >
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={enteredPassword} onChange={passwordChangeHandler} />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
        <a onClick={()=>{navigate('/signup')}} >Sign up ?</a>
        { Errmessage.length>0 && <a style={{ color: 'red' }}  >{Errmessage}</a>}

      </form>
      </div>
      </div>
  );
};

export default Login;
