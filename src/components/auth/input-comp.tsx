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
      <Label htmlFor={items.htmlfor}>{items.label}</Label>
      <Input
        id={items.id}
        type={items.type}
        placeholder={items.placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputWithLabel;
