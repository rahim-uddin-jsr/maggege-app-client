import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import GoogleGithubAuth from "../GoogleGithubAuth/GoogleGithubAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const { loginWithEmail } = useContext(AuthContext);
  const [isHide, setIsHide] = useState(true);

  const onSubmit = (data) => {
    loginWithEmail(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login success!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="bg-gray-200 h-full min-h-screen">
      {" "}
      <div className="p-8 lg:w-1/2 mx-auto max-w-xl">
        {" "}
        <GoogleGithubAuth title={"Sign in with"} />
        <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
          {" "}
          <p className="text-center text-sm text-gray-500 font-light">
            {" "}
            Or sign in with credentials{" "}
          </p>{" "}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {" "}
            <div className="relative">
              <input
                {...register("email", { required: true })}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="email"
                placeholder="Email"
              />{" "}
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>
            {errors.email && (
              <span className="text-red-400">This field is required</span>
            )}
            <div className="relative mt-3">
              {" "}
              <input
                {...register("password", { required: true })}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type={isHide ? "password" : "text"}
                placeholder="Password"
              />{" "}
              <div
                onClick={() => {
                  setIsHide(!isHide);
                }}
                className="absolute right-3 inset-y-0 flex items-center"
              >
                {isHide ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </div>
              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />{" "}
                </svg>{" "}
              </div>{" "}
            </div>{" "}
            {errors.password && (
              <span className="text-red-400">This field is required</span>
            )}
            <div className="flex items-center justify-center mt-8">
              {" "}
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Sign in{" "}
              </button>{" "}
            </div>{" "}
            <h2>
              Do not have any account? please{" "}
              <Link to={"/register"} className="link text-indigo-400">
                sign up
              </Link>{" "}
            </h2>
          </form>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Login;
