// Lazy load iframes (YouTube, Spotify, etc.) and create click-to-play thumbnails
document.addEventListener('DOMContentLoaded', function() {
    const lazyFrames = document.querySelectorAll('iframe[data-src], iframe:not([src])');
    
    lazyFrames.forEach(iframe => {
        const src = iframe.getAttribute('data-src') || iframe.getAttribute('src');
        
        // Skip if no valid src
        if (!src || src === 'https' || src.length < 10) {
            return;
        }
        
        // Extract YouTube video ID for thumbnail
        const videoId = src.match(/(?:youtube\.com\/embed\/|v=)([^&\n?#]+)/);
        if (videoId) {
            createThumbnailButton(iframe, videoId[1], src);
        }
    });
    
    function createThumbnailButton(iframe, videoId, fullSrc) {
        const container = iframe.parentElement;
        container.style.position = 'relative';
        
        // Create a wrapper for thumbnail and play button to keep them contained
        const thumbnailWrapper = document.createElement('div');
        thumbnailWrapper.style.cssText = 'position: relative; width: 100%; padding-bottom: 56.25%; overflow: hidden;';
        
        // Create thumbnail image
        const thumbnail = document.createElement('img');
        thumbnail.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        thumbnail.alt = 'Video thumbnail';
        thumbnail.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: block; cursor: pointer;';
        
        // Create play button overlay
        const playButton = document.createElement('div');
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: rgba(255, 0, 0, 0.8);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 0;
            transition: background 0.3s;
            z-index: 10;
        `;
        
        // Play icon (triangle)
        const triangle = document.createElement('div');
        triangle.style.cssText = `
            width: 0;
            height: 0;
            border-left: 25px solid white;
            border-top: 15px solid transparent;
            border-bottom: 15px solid transparent;
            margin-left: 5px;
        `;
        playButton.appendChild(triangle);
        
        // Hover effect
        playButton.onmouseover = () => playButton.style.background = 'rgba(255, 0, 0, 1)';
        playButton.onmouseout = () => playButton.style.background = 'rgba(255, 0, 0, 0.8)';
        
        // Click to play
        const clickHandler = () => {
            iframe.setAttribute('src', fullSrc);
            iframe.style.display = 'block';
            thumbnailWrapper.style.display = 'none';
            iframe.removeAttribute('data-src');
        };
        
        thumbnail.onclick = clickHandler;
        playButton.onclick = clickHandler;
        
        // Append thumbnail and button to wrapper
        thumbnailWrapper.appendChild(thumbnail);
        thumbnailWrapper.appendChild(playButton);
        
        // Insert wrapper before iframe
        container.insertBefore(thumbnailWrapper, iframe);
        
        // Hide iframe initially
        iframe.style.display = 'none';
    }
    
    // Lazy load remaining iframes with valid src/data-src
    const validFrames = document.querySelectorAll('iframe[data-src]');
    
    if ('IntersectionObserver' in window) {
        const frameObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    const src = iframe.getAttribute('data-src');
                    if (src && src.length > 10) {
                        iframe.src = src;
                        iframe.removeAttribute('data-src');
                        frameObserver.unobserve(iframe);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        validFrames.forEach(frame => {
            frameObserver.observe(frame);
        });
    } else {
        // Fallback
        validFrames.forEach(frame => {
            const src = frame.getAttribute('data-src');
            if (src && src.length > 10) {
                frame.src = src;
                frame.removeAttribute('data-src');
            }
        });
    }
});
