import { useState, useEffect } from 'react';

function FakeProgressBar() {
  const [progress, setProgress] = useState(0);
  const [hideBar, setHideBar] = useState(false); // State to hide the bar

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setHideBar(true); // Hide when complete
          clearInterval(interval);
          return prevProgress; // Prevent going beyond 100% 
        } else {
          return Math.min(prevProgress + 50, 100);
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-screen h-1 rounded-full bg-gray-200 ${hideBar ? 'hidden' : ''}`}> 
      <div
        className="h-full bg-red-500 rounded-full transition-width duration-1000 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default FakeProgressBar;
