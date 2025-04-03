import FormComp from "@/components/auth/form";
import { loginFieldItems } from "@/common/constant";

export default function Page() {
  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <FormComp
        title={"Login"}
        description={"Enter your email address to login"}
        fields={loginFieldItems}
      />
    </div>
  );
}
