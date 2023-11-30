import { useState } from 'react';

const InteractiveTools = ({ onToolSelect }) => {

  const [selectedTool, setSelectedTool] = useState(null);

const selectTool = (toolType) => {
  setSelectedTool(toolType);
};


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center p-4 space-y-2 ">
      <button className="btn middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true" onClick={() => onToolSelect('textbox')}>Text Box</button>
      <button className="btn middle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true" onClick={() => onToolSelect('checkbox')}>Checkbox</button>
      <button className="mbtn iddle none center rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true" onClick={() => onToolSelect('button')}>Button</button>
      {/* Add more tools as needed */}
    </div>
  );
};

export default InteractiveTools;