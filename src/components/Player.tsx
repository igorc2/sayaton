'use client'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { usePlayer } from '@/contexts/PlayerContext';
import { useEffect, useRef, useState } from 'react'


export function Player() {

  const audioRef = useRef<HTMLAudioElement>(null);
  const { isPlaying, togglePlay, setPlayingState, playNext, playPrevious, hasPrevious, hasNext, isLooping, toggleLoop} = usePlayer();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
		if (!audioRef.current) {
			return;
		}

		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	function setupProgressListener() {
    if(!audioRef || !audioRef.current) {
      return
    }
		audioRef.current.currentTime = 0;

		audioRef.current?.addEventListener('timeupdate', () => {
			setProgress(Math.floor(audioRef?.current?.currentTime || 0));
		});
	}

	function handleSeek(amount: number | number[]): void {
    if(!audioRef || !audioRef.current) {
      return
    }

    const progress = Array.isArray(amount) ? amount[0] : amount
		audioRef.current.currentTime = progress;
		setProgress(progress);
	}


  const url = 'https://traffic.omny.fm/d/clips/651a251e-06e1-47e0-9336-ac5a00f41628/5383c6c4-fb3f-4773-b1d7-addc0130037c/5745b567-180a-49fe-bc61-afb200845c73/audio.mp3'

  return (
    <>
    
      <audio
        src={url}
        autoPlay
        ref={audioRef}
        loop={isLooping}
        onPlay={() => setPlayingState(true)}
        onPause={() => setPlayingState(false)}
        onLoadedMetadata={setupProgressListener}
      />
      <div className="w-full">
        <Slider max={100} value={progress} onChange={handleSeek} trackStyle={{backgroundColor: '#04d361'}} railStyle={{backgroundColor: '#9f75ff'}} handleStyle={{borderColor: '#04d361', borderWidth: 4}} />
      </div>
      <div className="drop-shadow-md bg-orange-900 rounded-l-lg w-full -mr-16 p-4 flex gap-4 align-middle">
        <button type='button' className="bg-orange-800 py-1 px-2 rounded-2xl" onClick={playPrevious}>
          <img src='/play-previous.svg' alt='Tocar anterior' />
        </button>
        <button className="bg-orange-800 p-1 h-10 w-10 flex align-center justify-center	rounded-2xl" type='button' onClick={togglePlay}>
          {isPlaying ? <img src='/pause.svg' alt='Pausar' /> : <img src='/play.svg' alt='Tocar' />}
        </button>
        <button type='button' className="bg-orange-800 py-1 px-2 rounded-2xl" onClick={playNext}>
          <img src='/play-next.svg' alt='Tocar próxima' />
        </button>
        {/* <button type='button' onClick={toggleLoop} >
          <img src='/repeat.svg' alt='Repetir' />
        </button> */}
      </div>
    </>
  )

}