import React, { useEffect, useState } from 'react'

interface IAudio {
  playing: boolean;
  toggle: () => void;
}

export const useAudio = (url: string): IAudio => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying((prev) => !prev);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return {playing, toggle};
};
