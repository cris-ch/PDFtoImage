import PropTypes from 'prop-types';

const ImageDisplay = ({ imageSrc }) => {
    if (!imageSrc) return null;

    return (
        <div className="flex-1">
            <img src={imageSrc} alt="Converted PDF" className="max-w-full h-auto" />
        </div>
    );
};

ImageDisplay.propTypes = {
    imageSrc: PropTypes.string.isRequired,
};

export default ImageDisplay;
