import './App.css'
import { useRef, useState } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";
import { Waveform } from '@uiball/loaders'

function App() {

  const [frecuencia, setFrecuencia] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const audioPlayer = useRef();

  function handleFrecuencia(e) {
    setFrecuencia(e.target.value)
    setIsPlaying(false)
  }

  async function togglePlayPause() {
    if (!isPlaying) {
      try {
        setIsLoading(true)
        setError(null)
        await audioPlayer.current.load();
        await audioPlayer.current.play();
        setIsPlaying(true)
        setIsLoading(false)


      } catch (err) {
        setIsLoading(false)
        setError(err.message);
        setIsPlaying(false)
        audioPlayer.current.pause()
      }

      return
    }

    audioPlayer.current.pause()
    setIsPlaying(false)
  }

  function handleVolume(e){
    let volume = Number(e.target.value/100);
    audioPlayer.current.volume = volume
  }

  return (
    <main className='grid place-items-center'>
      <h1 className='text-5xl font-bold'>Player</h1>
      <div className={`bg-[#6D9886] h-24 mt-6 rounded-xl flex justify-between items-center px-7 gap-4 sm:w-3/6 ${error && "border border-red-700"}`}>
        <select id='playerSelect' className={`text-[#212121] rounded-md bg-[#D9CAB3] font-semibold`} onChange={handleFrecuencia}>
          <option value={""}>Ciudad</option>
          <option value="https://22823.live.streamtheworld.com/RNA_BARRANQUILLA.mp3">Barranquilla</option>
          <option value="https://22823.live.streamtheworld.com/RNA_CARTAGENA.mp3">Cartagena</option>
        </select>
        <input type='range' className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-grab dark:bg-black/50" onChange={handleVolume} />
        <button className='bg-[#D9CAB3] p-3 rounded-full text-[#212121] font-semibold' onClick={togglePlayPause}> {isLoading ? <Waveform size={20} color='#212121' /> : isPlaying ? <FaPause /> : <FaPlay />} </button>
        <audio ref={audioPlayer} src={frecuencia}></audio>
      </div>
      <span>
        {error && "Algo ha salido mal, intente escoger una ciudad valida o reproduzca nuevamente."}
      </span>
    </main>
  )
}

export default App
