"use client";

import { useState } from "react";
import Link from "next/link";
import FormLayout from "@/components/auth/form";
import InputWithLabel from "@/components/auth/input-comp";
import CheckboxItem from "@/components/general/check-box";

export default function Page() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [input, setInput] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log("Input values: ", input);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <FormLayout
        title="Login"
        description="Enter your email address to login"
        onSubmit={handleSubmit}
      >
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

        <div className={"flex flex-row items-center justify-between"}>
          <CheckboxItem
            label={"Show Password"}
            id={"showPassword"}
            isChecked={showPassword}
            onChange={setShowPassword}
          />

          <Link href={"/forgot-password"}>
            <p className={"text-sm text-primary-500 hover:text-primary-500/90"}>
              Forgot password?
            </p>
          </Link>
        </div>
      </FormLayout>
    </div>
  );
}
