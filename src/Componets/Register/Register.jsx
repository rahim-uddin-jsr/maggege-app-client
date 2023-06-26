import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import sendUsersDataInBackend from "../../hooks/sendUsersDataInBackend";
import GoogleGithubAuth from "../GoogleGithubAuth/GoogleGithubAuth";
import OnProcessing from "../OnProcessing/OnProcessing";
// import useSendUsersDataInBackend from "../../hooks/useSendUsersDataInBackend";
// import GoogleGithubAuth from "../../shared/GoogleGithubAuth/GoogleGithubAuth";
const Register = () => {
  const { createUser, updateUserProfile, user } = useContext(AuthContext);
  const [isHide, setIsHide] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordsMatch = password === confirmPassword;
  const img_token = import.meta.env.VITE_IMG_UPLOAD_TOKEN;

  const img_api_url = `https://api.imgbb.com/1/upload?key=${img_token}`;
  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.photo[0]);
    createUser(data.email, data.password)
      .then(() => {
        fetch(img_api_url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgRes) => {
            const photoURL = imgRes?.data?.display_url;
            if (imgRes.success) {
              const updatedInfo = {
                displayName: data.name,
                photoURL,
              };
              updateUserProfile(updatedInfo)
                .then(() => {
                  data.photo = photoURL;
                  data.role = "student";
                  const { name, photo, phone, gender, email, role } = data;
                  const userNewData = {
                    uid: user?.uid,
                    name,
                    photo,
                    phone,
                    gender,
                    email,
                    role,
                  };
                  console.log(userNewData);
                  sendUsersDataInBackend(userNewData).then((res) => {
                    if (res.data.insertedId) {
                      setLoading(false);
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration success!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate("/");
                    }
                  });
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-200 relative h-full min-h-screen">
      {isLoading && <OnProcessing />}
      <div className="p-8 lg:w-1/2 mx-auto max-w-xl">
        <GoogleGithubAuth title={"Sign up with"} />
        <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24 ">
          <p className="text-center text-sm text-gray-500 font-light">
            {" "}
            Or sign up with credentials{" "}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            {/* name */}
            <div className="relative">
              <input
                {...register("name", { required: true })}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="text"
                placeholder="Full Name"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            </div>
            {errors.name && (
              <span className="text-red-400">This field is required</span>
            )}
            <h2 className="text-left mb-1 mt-3">Profile picture</h2>
            <div className="flex ">
              <input
                {...register("photo", { required: true })}
                type="file"
                className="file-input file-input-bordered  w-full"
              />
              <div className="absolute left-0 inset-y-0 flex items-center"></div>
            </div>
            {/* user profile  */}
            {errors.photo && (
              <span className="text-red-400">This field is required</span>
            )}
            {/* phone number */}
            <div className="relative mt-3">
              <input
                {...register("phone")}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="text"
                placeholder="Phone number"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
            </div>
            {/* gender  */}
            <select
              defaultValue={"gender"}
              className="select select-bordered w-full mt-3"
              {...register("gender")}
            >
              <option value="gender">Select you gender?</option>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="other">other</option>
            </select>
            {/* email  */}
            <div className="relative mt-3">
              <input
                {...register("email", { required: true })}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="text"
                placeholder="Email"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <span className="text-red-400">This field is required</span>
            )}
            {/* password  */}
            <div className="relative mt-3">
              <input
                placeholder="Password"
                type={isHide ? "password" : "text"}
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{6,}$/,
                })}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
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
            </div>
            {errors?.password?.type === "pattern" && (
              <p role="alert">
                make sure password at least 6 digit, and at least 1
                uppercase,lowercase,number,spacial character
              </p>
            )}
            {errors.password && errors.password.type === "required" ? (
              <span className="text-red-400">This field is required</span>
            ) : (
              ""
            )}
            {/* confirm password */}
            <div className="relative mt-3">
              <input
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm Password"
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type={isHide ? "password" : "text"}
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
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
            </div>

            {errors?.confirmPassword?.type === "required" && (
              <span className="text-red-400">This field is required</span>
            )}
            {!password && !confirmPassword ? "" : ""}
            {passwordsMatch && password && (
              <p className="text-green-500">Passwords match.</p>
            )}
            {!passwordsMatch && (
              <p className="text-red-500">Passwords do not match.</p>
            )}

            <div className="flex items-center justify-center mt-8">
              {" "}
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                {" "}
                Create Account{" "}
              </button>{" "}
            </div>
            <h2>
              Already have an account? please{" "}
              <Link to={"/login"} className="link text-indigo-400">
                sign in
              </Link>{" "}
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
