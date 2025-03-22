import Form from "@/components/auth/form";
import { forgetPasswordFieldItems } from "@/common/data";

export default function Page() {
  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <Form
        title={"Forgot Password"}
        description={"Enter your email address to retrieve your password"}
        fields={forgetPasswordFieldItems}
      />
    </div>
  );
}
