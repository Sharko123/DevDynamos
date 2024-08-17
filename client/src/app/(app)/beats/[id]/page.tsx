import BeatPlayer from "@/components/BeatPlayer";
import React from "react";

// This is a separate page it only contains one beat no infinite scroll
export default function Page({ params }: { params: { id: string } }) {
  return <BeatPlayer beatId={params.id} isActive src="/1.mp3" />;
}
