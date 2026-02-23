import './WireframeGlobe.css';

export default function WireframeGlobe({ size = 400, className = '' }) {
    return (
        <div className={`wireframe-globe ${className}`} style={{ width: size, height: size }}>
            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                {/* Outer circle */}
                <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

                {/* Latitude lines */}
                {[-120, -60, 0, 60, 120].map((offset, i) => (
                    <ellipse
                        key={`lat-${i}`}
                        cx="200"
                        cy="200"
                        rx="180"
                        ry={Math.abs(180 * Math.cos((offset * Math.PI) / 360))}
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="0.6"
                        transform={`rotate(0 200 200)`}
                    />
                ))}

                {/* Longitude lines */}
                {[0, 30, 60, 90, 120, 150].map((angle, i) => (
                    <ellipse
                        key={`lon-${i}`}
                        cx="200"
                        cy="200"
                        rx={180 * Math.cos((angle * Math.PI) / 180)}
                        ry="180"
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="0.6"
                    />
                ))}

                {/* Equator (brighter) */}
                <ellipse cx="200" cy="200" rx="180" ry="50" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />

                {/* Center vertical */}
                <ellipse cx="200" cy="200" rx="50" ry="180" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="0.8" />

                {/* Accent cross */}
                <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />
                <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(168,85,247,0.1)" strokeWidth="0.5" />

                {/* Center dot */}
                <circle cx="200" cy="200" r="3" fill="rgba(168,85,247,0.6)" />

                {/* Radial gradient glow */}
                <defs>
                    <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(168,85,247,0.08)" />
                        <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                    </radialGradient>
                </defs>
                <circle cx="200" cy="200" r="180" fill="url(#globeGlow)" />
            </svg>
        </div>
    );
}
