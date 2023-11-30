const Canvas = ({ imageSrc, elements, onCanvasClick }) => {
    return (
        <div className="flex-1 relative" onClick={onCanvasClick}>
            {imageSrc && <img src={imageSrc} alt="Converted PDF" className="max-w-full h-auto" />}
            {elements.map((element, index) => (
                element.type === 'textbox' && (
                    <div
                        key={index}
                        className="absolute"
                        style={{ left: `${element.x}px`, top: `${element.y}px` }} 
                    >
                        <input
                            type="text"
                            placeholder="Text Box"
                            className="w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )
            ))}

        </div>
    );
};

export default Canvas;