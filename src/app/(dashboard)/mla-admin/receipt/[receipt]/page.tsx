import Logo from "../../../../../../public/assets/logo/icon_green.svg";
import { Receipt } from "@/components/general/receipt";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  const receiptData = {
    receiptID: slug,
  };

  return (
    <div className="flex flex-col gap-5">
      <Receipt icon={Logo} state={"KWARA state"} data={receiptData} />
    </div>
  );
}
