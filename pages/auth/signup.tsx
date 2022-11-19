import React from "react";
import Link from "next/link";
import {motion} from 'framer-motion';
import { useFormik } from "formik";
import MobileLogo from "../../components/common/MobileDrawer/MobileLogo";
import InputField from "../../components/ui/InputField";
import { layoutVariants } from "../../animations";
import useSignup from "../../hooks/useSignup";

const SignUpPage = () => {
  const sendRequest = useSignup();
  const {values: {name, password, email}, touched, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    async onSubmit(values) {
      await sendRequest(values);
    }
  })
  return (
    <motion.div variants={layoutVariants} animate='visible' initial={false} exit='hidden' className="md:flex md:flex-row-reverse h-screen">
      <div className="md:flex-1 h-full py-5 md:py-10">
        <div className="w-[80%] flex flex-col h-full md:w-[80%] mx-auto">
          <div className="shrink-0">
            <MobileLogo collapsed={false} />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <h2 className="text-3xl text-gray-700 text-center md:text-4xl font-semibold">
                Create Account
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6 my-6">
                <InputField
                  error={Boolean(touched.name && errors.name)}
                  type="text"
                  name='name'
                  rootClassName="w-full"
                  message={errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={name}
                />
                <InputField
                  error={Boolean(touched.email && errors.email)}
                  type="email"
                  name="email"
                  rootClassName="w-full"
                  message={errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={email}
                />
                <InputField
                  error={Boolean(touched.password && errors.password)}
                  type="password"
                  name="password"
                  rootClassName="w-full"
                  message={errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={password}
                />
                <button
                  type="submit"
                  className="w-full block text-center py-2 bg-black text-white"
                >
                  Sign up
                </button>
              </form>
              <p className="text-gray-600 md:hidden text-center text-sm font-light">
                Already have an account?{" "}
                <Link href="/auth/signin">
                  <a className="pl-2 inline-block text-black font-medium">
                    Log in here
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex-1 py-5 md:py-0 hidden md:flex items-center justify-center md:h-full bg-gradient-to-br from-teal-600 to-teal-800">
        <div className="space-y-6 w-full max-w-xs text-center text-white">
          <h4 className="text-4xl font-semibold">Welcome Back</h4>
          <p className="font-light text-sm tracking-wide">
            To keep connected with us please login with your personal info
          </p>
          <Link href="/auth/signin">
            <a className="inline-block border border-white rounded-full px-10 py-2">
              Sign in
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
