import React from "react";
import {
  Loader2,
  Eye,
  CheckCircle2,
  Lock,
  Clock
} from "lucide-react";

type Estado = "nuevo" | "en revisión" | "respondido" | "cerrado";
type Props = { estado: Estado };

const badgeStyles: Record<Estado, string> = {
  nuevo:        "bg-gradient-to-r from-blue-100 via-blue-50 to-white text-blue-700 border border-blue-200 shadow-blue-100",
  "en revisión":"bg-gradient-to-r from-yellow-100 via-yellow-50 to-white text-yellow-700 border border-yellow-200 shadow-yellow-100",
  respondido:   "bg-gradient-to-r from-green-100 via-green-50 to-white text-green-700 border border-green-200 shadow-green-100",
  cerrado:      "bg-gradient-to-r from-gray-100 via-gray-50 to-white text-gray-700 border border-gray-200 shadow-gray-100",
};

const badgeIcons: Record<Estado, JSX.Element> = {
  nuevo:        <Clock className="w-4 h-4 mr-1 text-blue-400" />,
  "en revisión":<Eye className="w-4 h-4 mr-1 text-yellow-400" />,
  respondido:   <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />,
  cerrado:      <Lock className="w-4 h-4 mr-1 text-gray-400" />,
};

export default function EstadoBadge({ estado }: Props) {
  const style = badgeStyles[estado];
  return (
    <span
      className={`inline-flex items-center min-w-[108px] px-3 py-1 rounded-xl shadow-md text-xs font-bold tracking-wide border ${style} transition-all duration-200 select-none`}
      style={{ textTransform: "capitalize", letterSpacing: ".02em", boxShadow: "0 2px 10px #0001" }}
      title={estado}
    >
      {badgeIcons[estado]}
      {estado}
    </span>
  );
}
