"use client";

import { useState } from "react";
import FormLayout from "@/components/auth/form";
import InputWithLabel from "@/components/auth/input-comp";
import AuthService from "@/services/AuthService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const authService = new AuthService(dispatch);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    await authService.resetPassword(email);
  };

  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <FormLayout
        isLoading
        title={"Forgot Password"}
        description={"Enter your email address to retrieve your password"}
        onSubmit={handleSubmit}
        isSuccess={false}
      >
        <InputWithLabel
          items={{
            id: "email",
            label: "Email",
            placeholder: "Enter Email",
            type: "email",
            htmlfor: "email",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormLayout>
    </div>
  );
}
