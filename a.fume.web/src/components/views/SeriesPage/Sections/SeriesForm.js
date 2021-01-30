import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import '../../Common/Form/Form.css';

let mounted = false;
function SeriesForm(props) {
    const { Series, onSubmit } = props;

    const { Title } = Typography;
    useEffect(() => {
        mounted = true;
        return () => {
            mounted = false;
        };
    }, []);
    return (
        <div className="form-container">
            <Formik
                enableReinitialize
                initialValues={Series}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('name is required'),
                    englishName: Yup.string()
                        .matches(
                            /[a-zA-Z][a-zA-Z0-9]*/,
                            '영어와 숫자만 허용됩니다.'
                        )
                        .required('englishName is required'),
                    description: Yup.string().required(
                        'description is required'
                    ),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    let dataToSubmit = {
                        name: values.name,
                        englishName: values.englishName,
                        description: values.description,
                    };
                    onSubmit(dataToSubmit).then(() => {
                        mounted && setSubmitting(false);
                    });
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
                        handleReset,
                        setFieldValue,
                    } = props;
                    return (
                        <div className="app">
                            <Link to={`/series/edit/${Series.seriesIdx}`}>
                                <Title level={2}>Series Info</Title>
                            </Link>
                            <form
                                onSubmit={handleSubmit}
                                onReset={handleReset}
                                style={{ height: 'auto', width: 'auto' }}
                            >
                                <div>
                                    {Series && Series.seriesIdx > 0 && (
                                        <div>idx: {Series.seriesIdx}</div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        onChange={(event) => {
                                            setFieldValue(
                                                'file',
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                        className="form-control"
                                    />
                                </div>
                                <label htmlFor="name">이름</label>
                                <Form.Item required>
                                    <Input
                                        id="name"
                                        placeholder="Enter name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.name && touched.name
                                                ? 'text-input error'
                                                : 'text-input'
                                        }
                                    />
                                    {errors.name && touched.name && (
                                        <div className="input-feedback">
                                            {errors.name}
                                        </div>
                                    )}
                                </Form.Item>

                                <label htmlFor="english">영어 이름</label>
                                <Form.Item required>
                                    <Input
                                        id="englishName"
                                        placeholder="Enter Series English Name"
                                        type="text"
                                        value={values.englishName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.englishName &&
                                            touched.englishName
                                                ? 'text-input error'
                                                : 'text-input'
                                        }
                                    />
                                    {errors.englishName &&
                                        touched.englishName && (
                                            <div className="input-feedback">
                                                {errors.englishName}
                                            </div>
                                        )}
                                </Form.Item>

                                <label htmlFor="english">설명</label>
                                <Form.Item required>
                                    <Input
                                        id="description"
                                        placeholder="계열 설명을 입력해주세요."
                                        type="text"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.description &&
                                            touched.description
                                                ? 'text-input error'
                                                : 'text-input'
                                        }
                                    />
                                    {errors.description &&
                                        touched.description && (
                                            <div className="input-feedback">
                                                {errors.description}
                                            </div>
                                        )}
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="reset"
                                        htmlType="reset"
                                        className="reset-button"
                                        disabled={isSubmitting}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="submit-button"
                                        disabled={isSubmitting}
                                        onSubmit={handleSubmit}
                                    >
                                        Save
                                    </Button>
                                </Form.Item>
                                {Series.createdAt && (
                                    <div>
                                        최초 생성된 날짜 {Series.createdAt}
                                    </div>
                                )}
                                {Series.updatedAt && (
                                    <div>
                                        마지막 수정된 날짜 {Series.updatedAt}
                                    </div>
                                )}
                            </form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}

export default SeriesForm;
