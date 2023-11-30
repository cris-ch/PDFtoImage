const Canvas = ({ imageSrc, elements, onCanvasClick }) => {
    return (
      <div className="flex-1 relative" onClick={onCanvasClick}>
        {imageSrc && <img src={imageSrc} alt="Converted PDF" className="max-w-full h-auto" />}
        {elements.map((element, index) => (
          <div
            key={index}
            className="absolute"
            style={{ left: `${element.x}px`, top: `${element.y}px` }}
          >
            {element.type === 'textbox' && (
              <input
                type="text"
                placeholder="Text Box"
                className="w-full h-full"
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {element.type === 'checkbox' && (
              <input
                type="checkbox"
                className="form-checkbox w-6 h-6" // Tailwind classes for styling
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {/* Add more conditions here for other element types */}
          </div>
        ))}
      </div>
    );
  };
  
  export default Canvas;
  