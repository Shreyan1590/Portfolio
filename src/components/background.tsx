
"use client";

import { useState, useEffect } from 'react';

const StarryBackground = () => {
    const [stars, setStars] = useState<React.ReactNode[]>([]);
    const [shootingStars, setShootingStars] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = Array.from({ length: 100 }).map((_, i) => {
                const size = Math.floor(Math.random() * 3) + 1;
                const style = {
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                };
                return <div key={`star-${i}`} className="star" style={style}></div>;
            });
            setStars(newStars);
        };

        const generateShootingStars = () => {
            const newShootingStars = Array.from({ length: 5 }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 60 + 20}%`, // Start somewhere in the middle 80%
                    top: `-10%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                };
                return <div key={`shooting-star-${i}`} className="shooting-star" style={style}></div>
            });
            setShootingStars(newShootingStars);
        };

        generateStars();
        generateShootingStars();
    }, []);

    return (
        <>
            <style jsx>{`
                .starry-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    z-index: -1;
                }
                .star {
                    position: absolute;
                    background-color: hsl(var(--primary-foreground) / 0.6);
                    border-radius: 50%;
                    animation: twinkle linear infinite;
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(0.8); }
                    25% { opacity: 1; transform: scale(1.2); }
                    50% { opacity: 0.5; transform: scale(1); }
                    75% { opacity: 1; transform: scale(1.1); }
                }

                .shooting-star {
                    position: absolute;
                    height: 2px;
                    width: 150px;
                    background: linear-gradient(-45deg, hsl(var(--primary)), rgba(0, 0, 255, 0));
                    border-radius: 999px;
                    filter: drop-shadow(0 0 6px hsl(var(--primary)));
                    animation: shooting linear infinite;
                }

                @keyframes shooting {
                  0% {
                    transform: translateX(100vw) translateY(-50vh) rotate(225deg);
                    opacity: 1;
                  }
                  100% {
                    transform: translateX(-50vw) translateY(100vh) rotate(225deg);
                    opacity: 0;
                  }
                }
            `}</style>
            <div className="starry-background">
                {stars}
                {shootingStars}
            </div>
        </>
    );
};


export function Background() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isClient ? <StarryBackground /> : null;
}
