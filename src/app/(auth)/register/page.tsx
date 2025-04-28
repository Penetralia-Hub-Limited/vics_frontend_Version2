"use client";

import { useState } from "react";
import Link from "next/link";
import FormLayout from "@/components/auth/form";
import InputWithLabel from "@/components/auth/input-comp";
import CheckboxItem from "@/components/general/check-box";
import { RegisterCredentials } from "@/store/auth/auth-user-types";
import { useSelector } from "react-redux";
import { AuthState } from "@/store/auth/auth-user-types";
// import { selectStateIDFromStateName } from "@/store/states/state-selector";
import { cn } from "@/lib/utils";

export default function Page() {
  const { isLoading, isLoggedIn } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [input, setInput] = useState<RegisterCredentials>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    othername: "",
    phone: "",
    address: "",
    state: "",
  });

  // const state_id = useSelector((state) =>
  //   selectStateIDFromStateName(state, input.state)
  // );

  const handleSubmit = async () => {};

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <FormLayout
        isSuccess={isLoggedIn}
        isLoading={isLoading}
        title="Register Account"
        description="Enter your details to create an account"
        onSubmit={handleSubmit}
        footer={<FooterElement />}
      >
        <div className={cn("pt-5 grid grid-cols-1 md:grid-cols-2 gap-4")}>
          <InputWithLabel
            items={{
              id: "firstname",
              label: "First Name",
              placeholder: "FirstName",
              type: "text",
              htmlfor: "firstname",
            }}
            value={input.firstname}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                firstname: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "lastname",
              label: "Last Name",
              placeholder: "LastName",
              type: "text",
              htmlfor: "lastname",
            }}
            value={input.lastname}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                lastname: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "othername",
              label: "Other Names",
              placeholder: "Other Name",
              type: "text",
              htmlfor: "othername",
            }}
            value={input.othername}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                othername: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "address",
              label: "Address",
              placeholder: "Address",
              type: "text",
              htmlfor: "address",
            }}
            value={input.address}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "phone",
              label: "Phone",
              placeholder: "Phone",
              type: "text",
              htmlfor: "phone",
            }}
            value={input.phone}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "email",
              label: "Email",
              placeholder: "Email",
              type: "email",
              htmlfor: "email",
            }}
            value={input.email}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />

          <InputWithLabel
            items={{
              id: "password",
              label: "Password",
              placeholder: "Password",
              type: `${showPassword ? "text" : "password"}`,
              htmlfor: "password",
            }}
            value={input.password}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          <InputWithLabel
            items={{
              id: "confirmPassword",
              label: "Confirm Password",
              placeholder: "Confirm Password",
              type: `${showPassword ? "text" : "password"}`,
              htmlfor: "confirmPassword",
            }}
            value={input.password}
            onChange={(e) =>
              setInput((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <div className={"flex flex-row items-center justify-between"}>
          <CheckboxItem
            label={"Show Password"}
            id={"showPassword"}
            isChecked={showPassword}
            onChange={setShowPassword}
          />
        </div>
      </FormLayout>
    </div>
  );
}

const FooterElement = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <p className="text-sm">Already Registered?</p>
      <Link href={"/login"}>
        <p
          className={
            "font-bold text-sm text-primary-500 hover:text-primary-500/90"
          }
        >
          Login
        </p>
      </Link>
    </div>
  );
};
