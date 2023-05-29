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

    await audioPlayer.current.pause()
    setIsPlaying(false)
  }

  function handleVolume(e){
    let volume = Number(e.target.value/100);
    audioPlayer.current.volume = volume
  }

  return (
    <main className='grid place-items-center'>
      <audio ref={audioPlayer} src={frecuencia}></audio>
      <h1 className='text-5xl font-bold text-[#fffed5]'>Player</h1>
      <div className={`bg-[#1c1c1c] h-24 mt-6 rounded-xl flex justify-between items-center px-7 gap-24 sm:w-3/6 ${error && "border border-red-700"}`}>
        <select id='playerSelect' className={`text-[#212121] rounded-md bg-[#ffc83a] font-semibold`} onChange={handleFrecuencia}>
          <option value={""}>Ciudad</option>
          <option value="https://22823.live.streamtheworld.com/RNA_BARRANQUILLA.mp3">Barranquilla</option>
          <option value="https://22823.live.streamtheworld.com/RNA_CARTAGENA.mp3">Cartagena</option>
        </select>
        <input type='range' className="w-full h-2 accent-[#ffc83a] rounded-lg appearance-none cursor-grab bg-[#fffed5] hidden sm:block" onChange={handleVolume} />
        <button className={`bg-[#ffc83a] p-3 rounded-full text-[#212121] font-semibold`} disabled={isLoading} onClick={togglePlayPause}> {isLoading ? <Waveform size={20} color='#212121' /> : isPlaying ? <FaPause /> : <FaPlay />} </button>
      </div>
      <span>
        {error && `Algo ha salido mal, intente escoger una ciudad valida o reproduzca nuevamente ${error}`}
      </span>
    </main>
  )
}

export default App
