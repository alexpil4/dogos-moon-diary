import { useState, useEffect } from 'react';
import { LinearProgress, styled } from '@mui/material';

const YellowLinearProgress = styled(LinearProgress)(() => ({
  height: 6,
  borderRadius: 5,
  backgroundColor: '#55627A',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#FCE861',
  },
}));

type Props = {
  targetValue: number;
  // ms
  animationDuration: number;
};

export default function AnimatedProgressBar({ targetValue, animationDuration }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) {
        // Start time init
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / animationDuration) * targetValue, targetValue);

      setProgress(newProgress);

      if (elapsed < animationDuration && newProgress < targetValue) {
        requestAnimationFrame(animate);
      }
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [targetValue, animationDuration]);

  return <YellowLinearProgress variant="determinate" value={progress} />;
}
