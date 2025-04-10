import { FC, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IFieldItems } from "@/common/types";

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  items: IFieldItems;
}

const InputWithLabel: FC<InputWithLabelProps> = ({ items, ...rest }) => {
  return (
    <div className={"grid w-full items-center gap-3"}>
      <Label className={"capitalize text-sm"} htmlFor={items.htmlfor}>
        {items.label}
      </Label>
      <Input
        autoComplete={items.id}
        id={items.id}
        type={items.type}
        placeholder={items.placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputWithLabel;
