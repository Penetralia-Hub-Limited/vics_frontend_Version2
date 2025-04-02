import VehiclePreview from "../preview";

export default async function Page({
  params,
}: {
  params: Promise<{ vehicleId: number }>;
}) {
  return <VehiclePreview params={params} />;
}
