import React from "react";
import { useFormik } from "formik";
import Head from "next/head";
import Container from "../../components/ui/Container";
import DashboardHeader from "../../components/common/DashboardHeader";
import DashboardTitle from "../../components/common/DashboardTitle";
import InputField from "../../components/ui/InputField";
import * as yup from 'yup';
import useUser from '../../hooks/useUser';
import useUpdateUser from "../../hooks/useUpdateUser";



const SettingPage = () => {
    const {user} = useUser();
    const updateUser = useUpdateUser();
    const {values: {name}, handleBlur, handleSubmit, handleChange, touched, errors} = useFormik({
        initialValues: {
            name: user ? user.name : '',
            
        },
        onSubmit: async (values) => {
            await updateUser(values);
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required')
        })
    })

    const {values: {password, confirmPassword}, errors: passwordErr, handleBlur: handlePwdBlur, handleChange: handlePwdChange, handleSubmit: handlePwdSubmit, touched: touchedPwd} = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        onSubmit: async ({password, confirmPassword}, {setFieldError}) => {
            if(password !== confirmPassword) {
                setFieldError('confirmPassword', 'Password do not match');
                return;
            }
            await updateUser({password});

        },
        validationSchema: yup.object({
            password: yup.string().min(5, 'The password should have at least five characters').required('Password is required'),
            confirmPassword: yup.string().required('Please confirm your password')
        })
    })

  return (
    <Container className="flex flex-col h-full">
      <Head>
        <title>Settings</title>
        <meta name='author' content='Chisom Promise' />
        <meta name='description' content='Update your Profile Settings and change your password' />
      </Head>
      <DashboardHeader title="Settings" />
      <DashboardTitle icon="logout" title="Update Profile" />
      <div className="flex-1 my-4">
        <div className="w-full py-4 px-5">
          <div className="space-y-3">
            <h4>Personal Information</h4>
            <form onSubmit={handleSubmit}>
              <InputField name='name' error={Boolean(touched.name && errors.name)} message={errors.name} value={name} className="bg-transparent" onChange={handleChange} onBlur={handleBlur}  />
              <div className="flex justify-end mt-3">
                    <button type='submit' className="bg-primary p-2 text-sm font-medium shadow-sm rounded-md text-white">
                        Update Name
                    </button>
              </div>
            </form>
          </div>
          <div className="space-y-3 mt-6">
            <h4>Change Password</h4>
            <form className="space-y-5" onSubmit={handlePwdSubmit}>
            <InputField type='password' name='password' label='New Password' className="bg-transparent" error={Boolean(touchedPwd.password && passwordErr.password)} message={passwordErr.password} onChange={handlePwdChange} onBlur={handlePwdBlur} value={password} />
            <InputField type='password' name='confirmPassword' label='Confirm Password' className="bg-transparent" error={Boolean(touchedPwd.confirmPassword && passwordErr.confirmPassword)} message={passwordErr.confirmPassword} onChange={handlePwdChange} onBlur={handlePwdBlur} value={confirmPassword} />
            <div className="flex justify-end">
                    <button type='submit' className="bg-primary p-2 text-sm font-medium shadow-sm rounded-md text-white">
                        Update Password
                    </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

SettingPage.isAuth = true;

export default SettingPage;
