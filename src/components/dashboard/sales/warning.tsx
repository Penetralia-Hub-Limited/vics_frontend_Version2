import { FC } from "react";

interface IWarning {
  info: string;
}

const Warning: FC<IWarning> = ({ info }) => {
  return (
    <div>
      <p className={"text-sm font-light text-danger"}>
        <span className="underline">Warning:</span> {info}
      </p>
    </div>
  );
};

export default Warning;
