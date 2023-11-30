const Canvas = ({ imageSrc, selectedTool, onCanvasClick }) => {
    return (
        <div className="flex-1 cursor-pointer" onClick={onCanvasClick}>
            {imageSrc ? <img src={imageSrc} alt="Converted PDF" className="max-w-full h-auto" /> : <div>No image uploaded</div>}
        </div>
    );
};

export default Canvas;

