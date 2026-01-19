import React from "react";
import ExplainCode from "./ExplainCode";

interface CompareComponentsProps {
  badComponent: React.ReactNode;
  goodComponent: React.ReactNode;
  badCodeExplanation: string;
  goodCodeExplanation: string;
  badTitle?: string;
  goodTitle?: string;
}

const CompareComponents: React.FC<CompareComponentsProps> = ({
  badComponent,
  goodComponent,
  badCodeExplanation,
  goodCodeExplanation,
  badTitle = "❌ Cách SAI",
  goodTitle = "✅ Cách ĐÚNG",
}) => {
  return (
    <div className="flex flex-wrap gap-5">
      {/* Bad Component Section */}
      <div className="flex-1 p-4 bg-red-950 border border-red-800 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-red-400">{badTitle}</h3>
        <div className="mb-3">{badComponent}</div>
        <ExplainCode code={badCodeExplanation} />
      </div>

      {/* Good Component Section */}
      <div className="flex-1 p-4 bg-green-950 border border-green-800 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-green-400">{goodTitle}</h3>
        <div className="mb-3">{goodComponent}</div>
        <ExplainCode code={goodCodeExplanation} />
      </div>
    </div>
  );
};

export default CompareComponents;
