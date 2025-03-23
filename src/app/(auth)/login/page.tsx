import FormComp from "@/components/auth/form";
import { loginFieldItems } from "@/common/data";

export default function Page() {
  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <FormComp
        title={"Account Log"}
        description={"Login with your Email address and password"}
        fields={loginFieldItems}
      />
    </div>
  );
}
