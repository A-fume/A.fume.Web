import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../actions/user_actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Form, Input, Button, Radio } from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const currentYear = new Date().getFullYear();

function RegisterPage(props) {
    const [Gender, setGender] = useState('여자');

    const dispatch = useDispatch();

    const checkEmail = (email) => {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${process.env.REACT_APP_PROXY_API}user/validate/email?email=${email}`
                )
                .then((response) => {
                    resolve(true);
                })
                .catch((err) => {
                    if (err.response.status === 409) {
                        resolve(false);
                        return;
                    }
                    reject(err);
                });
        });
    };
    return (
        <Formik
            initialValues={{
                email: '',
                nickname: '',
                password: '',
                gender: '여자',
                phone: '',
                birth: '',
                role: 1,
                image: '',
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('유효하지 않는 Email 형식입니다.')
                    .required('이메일은 아이디로 사용됩니다.')
                    .test(
                        'check-email',
                        'email 중복 체크',
                        async (value, context) => await checkEmail(value)
                    ),
                nickname: Yup.string().required('닉네임을 입력해주세요.'),
                password: Yup.string()
                    .min(6, '비밀번호는 최소 6글자 이상어야 합니다.')
                    .required('비밀번호를 입력해주세요'),
                confirmPassword: Yup.string()
                    .oneOf(
                        [Yup.ref('password'), null],
                        '비밀번호가 일치하지 않습니다.'
                    )
                    .required('비밀번호 확인을 해주세요.'),
                phone: Yup.string()
                    .matches(
                        /^\d{3}-\d{3,4}-\d{4}$/,
                        '010-0000-0000 형태로 입려해주세요'
                    )
                    .required('핸드폰 번호를 입력해주세요.'),
                birth: Yup.number()
                    .min(1900, `1900-${currentYear} 사이 년도를 입력해주세요.`)
                    .max(
                        currentYear,
                        `1900-${currentYear} 사이 년도를 입력해주세요.`
                    )
                    .required('태어난 년도를 입력 해주세요.'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let dataToSubmit = {
                        email: values.email,
                        nickname: values.nickname,
                        password: values.password,
                        gender: Gender,
                        phone: values.phone,
                        birth: parseInt(values.birth),
                        role: 1,
                    };

                    dispatch(registerUser(dataToSubmit))
                        .then((response) => {
                            if (response.payload.status === 200) {
                                props.history.push('/login');
                            } else {
                                alert(response.payload.message);
                            }
                        })
                        .catch((err) => {
                            alert(err.response.data.message);
                        });

                    setSubmitting(false);
                }, 500);
            }}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                } = props;
                return (
                    <div className="app">
                        <h2>Sign up</h2>
                        <Form
                            style={{ minWidth: '375px' }}
                            {...formItemLayout}
                            onSubmit={handleSubmit}
                        >
                            <Form.Item
                                required
                                label="Email"
                                hasFeedback
                                validateStatus={
                                    errors.email && touched.email
                                        ? 'error'
                                        : 'success'
                                }
                            >
                                <Input
                                    id="email"
                                    placeholder="Enter your Email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={(e) => {
                                        checkEmail(values.email);
                                        return handleBlur(e);
                                    }}
                                    className={
                                        errors.email && touched.email
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">
                                        {errors.email}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="NickName">
                                <Input
                                    id="nickname"
                                    placeholder="Enter your nickname"
                                    type="text"
                                    value={values.nickname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.nickname && touched.nickname
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                                {errors.nickname && touched.nickname && (
                                    <div className="input-feedback">
                                        {errors.nickname}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item
                                required
                                label="Password"
                                hasFeedback
                                validateStatus={
                                    errors.password && touched.password
                                        ? 'error'
                                        : 'success'
                                }
                            >
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.password && touched.password
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">
                                        {errors.password}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="Confirm" hasFeedback>
                                <Input
                                    id="confirmPassword"
                                    placeholder="Enter your confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <div className="input-feedback">
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                            </Form.Item>

                            <Form.Item required label="Gender">
                                <Radio.Group
                                    id="gender"
                                    value={Gender}
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                    }}
                                    options={[
                                        { label: '남자', value: '남자' },
                                        { label: '여자', value: '여자' },
                                    ]}
                                    optionType="button"
                                    buttonStyle="solid"
                                />

                                {errors.gender && touched.gender && (
                                    <div className="input-feedback">
                                        {errors.gender}
                                    </div>
                                )}
                            </Form.Item>
                            <Form.Item required label="Phone">
                                <Input
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    type="text"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.phone && touched.phone
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                                {errors.phone && touched.phone && (
                                    <div className="input-feedback">
                                        {errors.phone}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item required label="birth">
                                <Input
                                    id="birth"
                                    placeholder="Enter your year of birth"
                                    type="text"
                                    value={values.birth}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        errors.birth && touched.birth
                                            ? 'text-input error'
                                            : 'text-input'
                                    }
                                />
                                {errors.birth && touched.birth && (
                                    <div className="input-feedback">
                                        {errors.birth}
                                    </div>
                                )}
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    onClick={handleSubmit}
                                    type="primary"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default RegisterPage;
