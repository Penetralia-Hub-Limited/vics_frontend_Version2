"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormLayout from "@/components/auth/form";
import InputWithLabel from "@/components/auth/input-comp";
import CheckboxItem from "@/components/general/check-box";
import { AppDispatch } from "@/store/store";
import { LoginCredentials } from "@/store/auth/auth-user-types";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "@/store/auth/auth-user-types";
import { Role } from "@/common/enum";
import AuthService from "@/services/AuthService";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authService = new AuthService(dispatch);
  const { isLoading, isLoggedIn, data } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );

  // navigate to different dashboards
  useEffect(() => {
    if (isLoggedIn && data?.user) {
      if (data.user.role === Role.SUPERADMIN) {
        router.push("/super-admin/dashboard");
      }
      if (data.user.role === Role.SMR) {
        router.push("/smr-admin/dashboard");
      }
      if (data.user.role === Role.STOREADMIN) {
        router.push("/store-manager-admin/dashboard");
      }
      if (data.user.role === Role.MLA) {
        router.push("/mla-admin/dashboard");
      }
    }
  }, [isLoggedIn, data, router]);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [input, setInput] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    await authService.login(input);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <FormLayout
        isSuccess={isLoggedIn}
        isLoading={isLoading}
        title="Account Login"
        description="Login with your email address and password"
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
