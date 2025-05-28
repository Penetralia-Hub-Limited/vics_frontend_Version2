"use client";

import { useParams } from "next/navigation";
import { CardstableData } from "@/common/constant";
import CardPrint from "@/components/general/card-print";

// Create Document Component
export default function Card() {
  const params = useParams<{ card: string }>();

  const cardData = CardstableData.find((item) => item.id === params.card);

  return (
    <div className={"flex items-center justify-center"}>
      <CardPrint back={{ ...cardData }} front={{ ...cardData }} />
    </div>
  );
}
