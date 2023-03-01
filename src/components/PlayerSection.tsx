'use client'
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { Player } from './Player';

export function PlayerSection() {
  return (
    <PlayerContextProvider>
      <Player />
    </PlayerContextProvider>
  )

}