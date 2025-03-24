import FormComp from "@/components/auth/form";
import { loginFieldItems } from "@/common/constant";

export default function Page() {
  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <FormComp
        title={"Forgot Password"}
        description={"Enter your email address to retrieve your password"}
        fields={loginFieldItems}
      />
    </div>
  );
}
