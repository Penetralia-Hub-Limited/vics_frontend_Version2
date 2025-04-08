import { Invoice } from "@/components/general/invoice";
import Logo from "@/assets/logo/icon_green.svg";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  const invoiceData = {
    invoiceID: slug,
  };

  return (
    <div className="flex flex-col gap-5">
      <Invoice icon={Logo} state={"KWARA state"} data={invoiceData} />
    </div>
  );
}
