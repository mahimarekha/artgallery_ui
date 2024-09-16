import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom"
import CommonService from '../../service/commonService';
import { LOGIN_URL } from '../../service/API_URL';
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const LoginArea = () => {

  let dispatch = useDispatch();
  const history = useHistory()

  let status = useSelector((state) => state.user.status);
  let user = useSelector((state) => state.user.user);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({

    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  // Login
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;


    if (!formData.email) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors["email"] = "Email is invalid";
    }

    if (!formData.password) {
      formIsValid = false;
      errors["password"] = "Password is required";
    } else if (formData.password.length < 6) {
      formIsValid = false;
      errors["password"] = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValidated(true);
  
    if (validateForm()) {
      CommonService.postRequest(LOGIN_URL.LOGIN, formData).then((res) => {
        localStorage.setItem('userDetail', JSON.stringify(res.user));
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('token', res.tokens.access.token);
        localStorage.setItem('refreshtoken', res.tokens.refresh.token)
        setShowSuccess(true);
        setFormData({
          email: '',
          password: ''
        });
        setValidated(false);
        Swal.fire({
          icon: 'success',
          title: 'Login Sucessfull',
          text: 'Welcome ' + res.user.name
        })
       if( res.user.role === 'admin'){
        history.push("/vendor/event");
       }else  if( res.user.role === 'artist'){
        history.push("/vendor/artist-registration-detail");
       }
       
      }).catch((err) => {
console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.response.data.message
        })
      });
      // Handle form submission (e.g., send data to the server)


    }
  };
  const login = () => {
    if (status) {
      Swal.fire({
        icon: 'question',
        title: 'Mr. ' + user.name,
        html:
          'You are already loged in <br />' +
          'You can go to <b>' +
          'Dashboard</b> ' +
          'or our <b>Shop</b> page',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/my-account')
        } else {
          // not clicked
        }
      });
    } else {
      dispatch({ type: "user/login" })
      let name = user.name || 'Customer'
      console.log(typeof (user.name));
      Swal.fire({
        icon: 'success',
        title: 'Login Sucessfull',
        text: 'Welcome ' + name
      })
      history.push("/my-account");
    }

    CommonService.postRequest(LOGIN_URL.LOGIN, {
      "email": "kilarurekha@gmail.com",
      "password": "Rekhakilaru@7"
    }).then((re) => {

    }).error((err) => {

    });
  }

  return (
    <>
      <section id="login_area" className="ptb-100" >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
              <div className="account_form">
                <h3>Login</h3>
                <Form
                  noValidate validated={validated} onSubmit={handleSubmit}  >


                  <Form.Group controlId="formEmail"  style={{"padding":"10px"}}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!formErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword" style={{"padding":"10px"}}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!formErrors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br></br>
                  <Button variant="primary" type="submit" className='text-center'>
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LoginArea
