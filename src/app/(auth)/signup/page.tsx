import FormComp from "@/components/auth/form";
import { signUpFieldItems } from "@/common/constant";

export default function Page() {
  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <FormComp
        title={"Sign Up"}
        description={"Enter your email address to register your account"}
        fields={signUpFieldItems}
      />
    </div>
  );
}
