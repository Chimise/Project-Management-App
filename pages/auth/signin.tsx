import React from "react";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import MobileLogo from "../../components/common/MobileDrawer/MobileLogo";
import InputField from "../../components/ui/InputField";
import { layoutVariants } from "../../animations";
import { logInSchema } from "../../utils/validate";
import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const sendRequest = useLogin();
  const {
    values: { email, password },
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values) {
      await sendRequest(values);
    },
    validationSchema: logInSchema,
  });
  return (
    <motion.div
      variants={layoutVariants}
      initial={false}
      animate="visible"
      exit="hidden"
      className="md:flex h-screen"
    >
      <Head>
        <title>Sign In</title>
        <meta name='author' content='Chisom Promise' />
        <meta name='description' content="Sign in to taskr and continue to manage and track your projects" />
      </Head>
      <div className="md:flex-1 h-full py-5 md:py-10">
        <div className="w-[80%] flex flex-col h-full md:w-[80%] mx-auto">
          <div className="shrink-0">
            <Link href="/">
              <a>
                <MobileLogo collapsed={false} />
              </a>
            </Link>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <h2 className="text-3xl text-gray-700 text-center md:text-4xl font-semibold">
                Sign In
              </h2>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6 my-6"
              >
                <InputField
                  value={email}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  rootClassName="w-full"
                  error={Boolean(touched.email && errors.email)}
                  message={errors.email}
                />
                <InputField
                  error={Boolean(touched.password && errors.password)}
                  value={password}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  rootClassName="w-full"
                  message={errors.password}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full block text-center py-2 bg-black text-white"
                >
                  Sign In
                </button>
              </form>
              <p className="text-gray-600 md:hidden text-center text-sm font-light">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup">
                  <a className="pl-2 inline-block text-black font-medium">
                    Sign Up
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex-1 py-5 md:py-0 hidden md:flex items-center justify-center md:h-full bg-gradient-to-br from-teal-600 to-teal-800">
        <div className="space-y-6 w-full max-w-xs text-center text-white">
          <h4 className="text-4xl font-semibold">Hello, Friend!</h4>
          <p className="font-light text-sm tracking-wide">
            Enter your personal details and start a journey with us
          </p>
          <Link href="/auth/signup">
            <a className="inline-block border uppercase border-white rounded-full px-10 py-2">
              Sign up
            </a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
