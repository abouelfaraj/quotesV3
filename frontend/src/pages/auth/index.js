import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/authContext'; // Import your AuthContext
import client from '../../context/axiosConfig';
// Import CSS or SCSS here
import '../../assets/sass/pages/login/classic/login-6.scss';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    username: yup.string().when('isRegistration', {
        is: true,
        then: yup.string().required('Username is required')
    }),
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string().when('isRegistration', {
        is: true,
        then: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    })
});

function LoginOrRegister() {
    const history = useHistory();
    const { currentUser, setCurrentUser } = useAuth();
    const [isRegistration, setIsRegistration] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (dt) => {
        try {
            const url = isRegistration ? '/api/register' : '/api/login';
            const response = await client.post(url, dt);
    
            const user = response.data;
            if (!user) {
                throw new Error("Invalid response structure");
            }

            localStorage.setItem('currentUser', JSON.stringify(user));
            setCurrentUser(user);
    
            Swal.fire({
                title: isRegistration ? 'Registration Successful!' : 'Login Successful!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: { confirmButton: 'btn btn-primary' }
            }).then(() => {
                history.push('/feeds');
            });
        } catch (error) {
            console.error("Error during login/registration:", error);
            Swal.fire({
                title: 'Error!',
                text: isRegistration ? 'Registration failed. Please try again.' : 'Login failed. Please check your credentials and try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: { confirmButton: 'btn btn-primary' }
            });
        }
    };    

    useEffect(() => {
        if (currentUser) {
            history.push('/feeds');
        }
    }, [currentUser, history]);

    return (
        <>
            <main>
                <div className="d-flex flex-column flex-root">
                    <div className="login login-6 login-signin-on login-signin-on d-flex flex-column-fluid" id="kt_login">
                        <div className="d-flex flex-column flex-lg-row flex-row-fluid text-center">
                            <div className="d-flex w-100 flex-center p-15">
                                <div className="login-wrapper">
                                    <div className="text-dark-75">
                                        <h3 className="mb-8 mt-22 font-weight-bold">JOIN OUR GREAT COMMUNITY</h3>
                                        <p className="mb-15 text-muted font-weight-bold">The ultimate Feeds of quotes.</p>
                                        <Button onClick={() => setIsRegistration(true)} className="btn btn-outline-primary btn-success btn-pill py-4 px-9 font-weight-bold">
                                            Get An Account
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="login-divider">
                                <div></div>
                            </div>
                            <div className="d-flex w-100 flex-center p-15 position-relative overflow-hidden">
                                <div className="login-wrapper">
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        {isRegistration ? (
                                            <>
                                                <div className="text-center mb-10 mb-lg-20">
                                                    <h3>Sign Up</h3>
                                                    <p className="text-muted font-weight-bold">Enter your details to create your account</p>
                                                </div>
                                                <Form.Group className="mb-3" controlId="formBasicFullname">
                                                    <Form.Label>Username</Form.Label>
                                                    <Controller
                                                        name="username"
                                                        control={control}
                                                        render={({ field }) => <Form.Control {...field} placeholder="Username" />}
                                                    />
                                                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        render={({ field }) => <Form.Control {...field} type="email" placeholder="Email" />}
                                                    />
                                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Controller
                                                        name="password"
                                                        control={control}
                                                        render={({ field }) => <Form.Control {...field} type="password" placeholder="Password" />}
                                                    />
                                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Controller
                                                        name="confirmPassword"
                                                        control={control}
                                                        render={({ field }) => <Form.Control {...field} type="password" placeholder="Confirm Password" />}
                                                    />
                                                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Check type="checkbox" label="I Agree to the terms and conditions" />
                                                </Form.Group>
                                                <div className="d-flex flex-wrap flex-center">
                                                    <Button variant="primary" type="submit" className="btn btn-success btn-pill font-weight-bold px-9 py-4 my-3 mx-2">Register</Button>
                                                    <Button onClick={() => setIsRegistration(false)} variant="outline-primary" className="btn btn-outline-primary btn-pill font-weight-bold px-9 py-4 my-3 mx-2">Cancel</Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-center mb-10 mb-lg-20">
                                                    <h2 className="font-weight-bold">Sign In</h2>
                                                    <p className="text-muted font-weight-bold">Enter your username and password</p>
                                                </div>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email address</Form.Label>
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        render={({ field }) => <Form.Control {...field} type="email" placeholder="Enter email" />}
                                                    />
                                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Controller
                                                        name="password" G
                                                        control={control}
                                                        render={({ field }) => <Form.Control {...field} type="password" placeholder="Password" />}
                                                    />
                                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                    <Form.Check type="checkbox" label="Check me out" />
                                                </Form.Group>
                                                <Button variant="primary" type="submit" className="btn btn-success btn-pill font-weight-bold px-9 py-4 my-3 mx-2">Login</Button>
                                            </>
                                        )}
                                    </Form>
                                    <div className="login-forgot">
                                        <div className="text-center mb-10 mb-lg-20">
                                            <h3>Forgotten Password?</h3>
                                            <p className="text-muted font-weight-bold">Enter your email to reset your password</p>
                                        </div>
                                        <Form id="kt_login_forgot_form">
                                            <Form.Group className="form-group py-2 m-0 border-bottom">
                                                <Form.Control type="text" placeholder="Email" name="email" autoComplete="off" />
                                            </Form.Group>
                                            <div className="form-group d-flex flex-wrap flex-center mt-10">
                                                <Button id="kt_login_forgot_submit" className="btn btn-primary btn-pill font-weight-bold px-9 py-4 my-3 mx-2">Submit</Button>
                                                <Button id="kt_login_forgot_cancel" className="btn btn-outline-primary btn-pill font-weight-bold px-9 py-4 my-3 mx-2">Cancel</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login Status</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{modalMessage}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </main>
        </>
    );
}

export default LoginOrRegister;
