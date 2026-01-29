/**
 * VerticalCard Component
 * 
 * Optimized for 9:16 vertical content (mobile-first aspect ratio)
 * Works perfectly on desktop without looking awkward
 * 
 * Props:
 * - src: Image or video source path
 * - isVideo: Boolean to determine if content is video
 * - alt: Alt text for accessibility
 */
const VerticalCard = ({ src, isVideo = false, alt = 'Media content' }) => {
    return (
        <div className="vertical-card-container flex items-center justify-center w-full h-full">
            <div
                className="aspect-[9/16] w-full shadow-2xl rounded-lg overflow-hidden"
                style={{ maxHeight: '85vh' }}
            >
                {isVideo ? (
                    <video
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover rounded-lg"
                    />
                )}
            </div>
        </div>
    );
};

export default VerticalCard;
