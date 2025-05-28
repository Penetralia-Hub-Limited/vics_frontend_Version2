import { FC } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeWithLogoProps {
  value: string;
  logoUrl?: string | null;
  size?: number;
}

const QRCodeWithLogo: FC<QRCodeWithLogoProps> = ({
  value,
  logoUrl,
  size = 150,
}) => {
  return (
    <div className="bg-white p-3">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        imageSettings={{
          src: logoUrl ?? "/assets/logo/vics-logo.png",
          height: 20,
          width: 20,
          opacity: 1,
          excavate: true,
        }}
        level={"H"}
      />
    </div>
  );
};

export default QRCodeWithLogo;
