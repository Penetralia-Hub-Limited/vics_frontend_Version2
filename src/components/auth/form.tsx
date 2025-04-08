import { FC } from "react";
import InputWithLabel from "./input-comp";
import { IFieldItems } from "@/common/types";
import { Button } from "../ui/button";
import Form from "next/form";

interface IForm {
  title: string;
  description: string;
  fields: IFieldItems[];
}

const FormComp: FC<IForm> = ({ title, description, fields }) => {
  return (
    <div className={"bg-white rounded-lg py-10 px-5 md:px-12 w-[50%]"}>
      <div className={"flex flex-col gap-3 w-full items-center justify-center"}>
        <p className={"text-lg font-bold"}>{title}</p>
        <p className={""}>{description}</p>
      </div>

      <Form action={""} className={"flex flex-col gap-5 py-12 w-full"}>
        {fields.map((data, index) => {
          return (
            <div key={index}>
              <InputWithLabel items={data} />
            </div>
          );
        })}
        <Button variant={"default"} type={"submit"}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormComp;
