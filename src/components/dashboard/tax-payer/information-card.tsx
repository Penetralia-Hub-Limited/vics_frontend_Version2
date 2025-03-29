import { FC } from "react";
import AvatarProfile from "@/components/general/avatar-profile";
import { TaxPayerInfo } from "@/common/types";

interface TaxPayerCardProps {
  taxPayerInfo: TaxPayerInfo;
}

export const TaxPayerInformationCard: FC<TaxPayerCardProps> = ({
  taxPayerInfo,
}) => {
  const { fullName, email, phone, address, profileImage } = taxPayerInfo;
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div>
      <div className={"flex flex-col md:flex-row"}>
        <div className="flex-shrink-0 p-6 flex items-center justify-center md:border-r border-gray-100">
          <AvatarProfile
            classname={"w-[10rem] h-[10rem] md:h-[18rem] md:w-[18rem]"}
            profileImage={profileImage}
            initials={initials}
          />
        </div>
        <div className="flex-grow p-6">
          <h2 className="text-xl font-semibold mb-6 pb-4">
            Tax Payer&apos;s Information
          </h2>
          <div className="space-y-4">
            <InfoField label="Full Name" value={fullName} />
            <InfoField label="Email" value={email} />
            <InfoField label="Phone" value={phone} />
            <InfoField label="Address" value={address} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col gap-3 border-b border-neutral-500 pb-3">
      <p className="text-sm text-neutral-700">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};
