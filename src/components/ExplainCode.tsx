interface ExplainCodeProps {
  code: string;
}
const ExplainCode: React.FC<ExplainCodeProps> = ({ code }) => {
  return (
    <pre className="text-xs bg-gray-800 text-gray-300 p-3 rounded-lg mt-3 overflow-x-auto">
      {code}
    </pre>
  );
};

export default ExplainCode;
