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
    <div className="flex flex-col pt-24 gap-12 justify-items-end">
    
      <audio
        src={url}
        autoPlay
        ref={audioRef}
        loop={isLooping}
        onPlay={() => setPlayingState(true)}
        onPause={() => setPlayingState(false)}
        onLoadedMetadata={setupProgressListener}
      />
      <img
        className="shadow-3xl shadow-pink-600/5"
        src="https://www.omnycontent.com/d/clips/651a251e-06e1-47e0-9336-ac5a00f41628/5383c6c4-fb3f-4773-b1d7-addc0130037c/5745b567-180a-49fe-bc61-afb200845c73/image.jpg?t=1677147791&size=Medium"
      ></img>
      <h2 className="text-slate-50 text-center mb-4 text-3xl">#153 - Adnan Syed: erro da justiça? | Parte 2</h2>
      <div className="w-full">
        <Slider max={2843} value={progress} onChange={handleSeek} trackStyle={{backgroundColor: '#db2777'}} railStyle={{backgroundColor: '#1b0d3b'}} handleStyle={{borderColor: '#db2777'}} />
        <div className="flex justify-between">
          <span className="text-slate-50">{new Date(progress * 1000).toISOString().substring(14, 19)}</span>
          <span className="text-slate-50">18:00</span>
        </div>
      </div>
      <div className="drop-shadow-md w-full justify-evenly flex gap-4">
        <button type='button' onClick={toggleLoop} >
          <img src='/shuffle.svg' alt='Repetir' />
        </button>
        <button type='button' className=" py-1 px-2 rounded-2xl" onClick={playPrevious}>
          <img src='/play-previous.svg' alt='Tocar anterior' />
        </button>
        <button className="bg-pink-600 shadow-3xl shadow-pink-600/20 p-1 h-16 flex w-16 flex items-center justify-center	rounded-full" type='button' onClick={togglePlay}>
          {isPlaying ? <img src='/pause.svg' alt='Pausar' /> : <img src='/play.svg' alt='Tocar' />}
        </button>
        <button type='button' className=" py-1 px-2 rounded-2xl" onClick={playNext}>
          <img src='/play-next.svg' alt='Tocar próxima' />
        </button>
        <button type='button' onClick={toggleLoop} >
          <img src='/repeat.svg' alt='Repetir' />
        </button>
      </div>
    </div>
  )

}