const Canvas = ({ imageSrc, elements, onCanvasClick, onElementChange }) => {
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
                            value={element.content || ''}
                            onChange={(e) => onElementChange(index, { ...element, content: e.target.value })}
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                    {element.type === 'checkbox' && (
                        <input
                            type="checkbox"
                            className="form-checkbox w-6 h-6"
                            checked={element.checked || false}
                            onChange={(e) => onElementChange(index, { ...element, checked: e.target.checked })}
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Canvas;
