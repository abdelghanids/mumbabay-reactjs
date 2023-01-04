import React, { useEffect, useReducer  } from "react";
import "./Subscribe.css";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

import AOS from "aos";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "aos/dist/aos.css";


export default function Subscribe(){

  const emailReducer = (state, action) => {
    if (action.type === "USER_INPUT") {
      return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.type === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: null };
  };
  

     const [emailState, dispatchEmail] = useReducer(emailReducer, {
      value: "",
      isValid: null,
    })
    

  const submitEmail = (event) => {

    event.preventDefault()
    if(emailState.isValid === true){

      let msg = `${emailState.value} : Subscribe avec success .`
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      dispatchEmail({ type: "EMPTY_INPUT" });

    }


  }

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

  };


  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  useEffect(() => {

    console.log({emailState})
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    <section id="subscribe">
      <div className="container subscribe" data-aos="fade-up">
        {/* amination scroll */}
        <h2>Subscribe now!</h2>
        <form onSubmit={submitEmail}>
          <div className="form-control">
            <input type="text" value={emailState.value}             
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            className={`${emailState.isValid === false ? "error" : ""}`}
            style={{color:"black"}}
            placeholder="Enter Your Email..." />
            <button type="submit">Subscribe</button>
          </div>
        </form>
        <div className="social-icons">
          <div className="social-icon">
            <TiSocialGooglePlus />
          </div>
          <div className="social-icon">
            <FaFacebookF />
          </div>
          <div className="social-icon">
            <FaTwitter />
          </div>
          <div className="social-icon">
            <FaInstagram />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}