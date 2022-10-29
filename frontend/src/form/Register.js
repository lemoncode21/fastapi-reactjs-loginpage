/* eslint-disable default-case */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register(props) {
  const options = [
    { value: "", label: "Select Your gender !" },
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
  ];

  const navigate = useNavigate();

  // Register Form
  const [formRegister, setFormRegister] = useState({
    name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    birth: "",
    sex: "",
    profile: "",
  });
  //    default value datepicker
  const [birthDate, setBirthDate] = useState(null);

  // convert format date to string
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [day, month, year].join("-");
  };

  const onChangeForm = (label, event) => {
    switch (label) {
      case "name":
        setFormRegister({ ...formRegister, name: event.target.value });
        break;
      case "username":
        setFormRegister({ ...formRegister, username: event.target.value });
        break;
      case "email":
        // email validation
        const email_validation = /\S+@\S+\.\S+/;
        if (email_validation.test(event.target.value)) {
          setFormRegister({ ...formRegister, email: event.target.value });
        }
        break;
      case "phone_number":
        setFormRegister({ ...formRegister, phone_number: event.target.value });
        break;
      case "password":
        setFormRegister({ ...formRegister, password: event.target.value });
        break;
      case "sex":
        setFormRegister({ ...formRegister, sex: event.target.value });
        break;
      case "birth":
        setBirthDate(event);
        setFormRegister({ ...formRegister, birth: formatDate(event) });
        break;
    }
  };

  //   Submit handler

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formRegister);
    // Post to register API
    await axios
      .post("http://localhost:8888/auth/register", formRegister)
      .then((response) => {
        // move to sign in page
        navigate("/?signin");

        // add successfully notif
        toast.success(response.data.detail);
        // reload page
        setTimeout(() => {
          window.location.reload();
        }, 1000);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // add error notif
        toast.error(error.response.data.detail);
      });
  };

  return (
    <React.Fragment>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Create An Account
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Welcome to lemoncode21!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("name", event);
            }}
          />
          <DatePicker
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            dateFormat="dd-MM-yyyy"
            placeholderText="Birth date"
            selected={birthDate}
            onChange={(event) => {
              onChangeForm("birth", event);
            }}
          />
          <select
            value={formRegister.sex}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("sex", event);
            }}
          >
            {options.map((data) => {
              if (data.value === "") {
                return (
                  <option key={data.label} value={data.value} disabled>
                    {data.label}
                  </option>
                );
              } else {
                return (
                  <option key={data.label} value={data.value}>
                    {data.label}
                  </option>
                );
              }
            })}
          </select>
          <input
            type="text"
            placeholder="Username"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("username", event);
            }}
          />
          <input
            type="number"
            placeholder="Phone number"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("phone_number", event);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("email", event);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
            onChange={(event) => {
              onChangeForm("password", event);
            }}
          />
        </div>
        <div className="text-center mt-6">
          <button
            type="submit"
            className="py-3 w-64 text-xl text-white bg-yellow-400 rounded-2xl hover:bg-yellow-300 active:bg-yellow-500 outline-none"
          >
            Create Account
          </button>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/?signin"
              onClick={() => {
                props.setPage("login");
              }}
            >
              <span className="underline cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
}
