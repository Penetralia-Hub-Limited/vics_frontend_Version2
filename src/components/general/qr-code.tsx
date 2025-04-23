import { FC } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeWithLogoProps {
  value: string;
  logoUrl: string;
  size?: number;
}

const QRCodeWithLogo: FC<QRCodeWithLogoProps> = ({
  value,
  logoUrl,
  size = 150,
}) => {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      imageSettings={{
        src: logoUrl,
        height: 30,
        width: 30,
        opacity: 1,
        excavate: true,
      }}
      level={"H"}
    />
  );
};

export default QRCodeWithLogo;
