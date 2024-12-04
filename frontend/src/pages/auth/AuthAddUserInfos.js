import React from 'react';
import { Row, Col, Form } from 'react-bootstrap'; // Import Row and Col from react-bootstrap
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import client from '../../context/axiosConfig';
import { useAuth } from '../../context/authContext';

const schema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'), // Validation for Last name
});

function AuthAddUserInfo({ onComplete }) {
    const { currentUser, setCurrentUser } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            first_name: '',
            last_name: '',
        }
    });

    const SubmitUserAuthInfos = async (data) => {
        try {
            const response = await client.post(
                '/api/UserAuthInfo',
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                }
            );
            if (response) {
                const updatedUser = { ...currentUser, user: { ...currentUser.user, first_name: data.first_name, last_name: data.last_name } };
                setCurrentUser(updatedUser);
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                onComplete();
            }
        } catch (error) {
            console.error('Error Response:', error.response);
        }
    };

    return (
        <div className="card card-custom gutter-b bg-light">
            <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder">Great! still 2 steps to complete your profile</h3>
                <span className="float-right">
                   1/2
                </span>
            </div>
            <div className="card-body pt-0">
                <Form onSubmit={handleSubmit(SubmitUserAuthInfos)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formfirst_name">
                                <Form.Label>First name</Form.Label>
                                <Controller
                                    name="first_name"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter First name"
                                            isInvalid={!!errors.first_name}
                                            {...field}
                                        />
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">{errors.first_name?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formlast_name">
                                <Form.Label>Last name</Form.Label>
                                <Controller
                                    name="last_name"
                                    control={control}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Last name"
                                            isInvalid={!!errors.last_name}
                                            {...field}
                                        />
                                    )}
                                />
                                <Form.Control.Feedback type="invalid">{errors.last_name?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <button 
                    type="submit" 
                    className="btn btn-success mt-3 float-right">
                        next</button>
                </Form>
            </div>
        </div>
    );
}

export default AuthAddUserInfo;