import React, {useState} from 'react';
import {connect} from 'umi';
import styles from './style.less';
import { Form, Input, Button, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginMessage = ({content}) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

const Login = props => {
    const {userInfo = {}, submitting, dispatch} = props;
    const {code,message} = userInfo;
    const handleSubmit = values => {
        dispatch({
            type: 'userAndlogin/login',
            payload: {...values},
        });
    };


    return (
        <div className={styles.main}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                {code === 10007 && message && !submitting && (
                    <LoginMessage content="账户或密码错误"/>
                )}
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary"
                            htmlType="submit"
                            loading={submitting}
                            className={styles.submit}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default connect(({userAndlogin, loading}) => ({
    userInfo: userAndlogin.userInfo,
    submitting: loading.effects['userAndlogin/login'],
}))(Login);
