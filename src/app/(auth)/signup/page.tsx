import FormComp from "@/components/auth/form";
import { signUpFieldItems } from "@/common/data";

export default function Page() {
  return (
    <div className={"flex flex-col w-full items-center justify-center"}>
      <FormComp
        title={"Sign Up"}
        description={"Enter your details to sign up"}
        fields={signUpFieldItems}
      />
    </div>
  );
}
