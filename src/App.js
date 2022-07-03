import React from "react"
import "./index.css"
import BasicDayInfo from "./BasicDayInfo";
import DayInfo from "./DayInfo";
import HourInfo from "./HourInfo";
import Swal from 'sweetalert2'

export default function App(){
    const [data, setData] = React.useState({daily:{weathercode: "", temperature_2m_min:"", temperature_2m_max: "", sunrise: "", sunset: "", precipitation_sum: "", precipitation_hours: "", time: "", windspeed_10m_max: ""}, hourly:{cloudcover: "", dewpoint_2m: "", relativehumidity_2m: "", surface_pressure: "", time: ""}})
    const [clicked, setClicked] = React.useState(0)
    const [mode, setMode] = React.useState(0);
    const [inp, setInp] = React.useState("")
    const [cords, setCords] = React.useState({latt: "", longt: ""})

    React.useEffect(() => {
        if(cords.latt){
            const urly = "https://api.open-meteo.com/v1/forecast?latitude="+cords.latt+"&longitude="+cords.longt+"&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,surface_pressure,precipitation,weathercode,cloudcover,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max&timezone=Europe%2FBerlin"
            fetch(urly)
            .then(response => response.json())
            .then(data => setData(data));
        }
        setClicked(0)
    },[cords])

    function buttonTownToCords(event){

        if(event.key === 'Enter') {
            const url = "https://geocode.xyz/"+inp+"?json=1"
        
            fetch(url).then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("CHYBA PŘEKLADU");
              })
              .then((data) => {
                !data.latt ? Swal.fire({icon: 'error', title: 'Město neexistuje'}) : setCords({latt: data.latt, longt: data.longt})
              })
              .catch(() => {
                Swal.fire({icon: 'error', title: 'Chyba API - zkus to znovu'})
              })
        }
    }

    function generateDays(){
        let days = []
        for (let i = 0; i < 7; i++) {
            days.push(<BasicDayInfo 
                maxTemperature = {data.daily.temperature_2m_max[i]}
                minTemperature = {data.daily.temperature_2m_min[i]}
                weathercode= {data.daily.weathercode[i]}
                date={data.daily.time[i]}
                id={i}
                key={i}
                click = {clickHandle}
                clicked = {clicked}
            />)
        }
        return days
    }

    function generateDayInfo(){
        return(
            <DayInfo
                weathercode={data.daily.weathercode}
                temp_min={data.daily.temperature_2m_min}
                temp_max={data.daily.temperature_2m_max}
                sunrise={data.daily.sunrise}
                sunset={data.daily.sunset}
                rain_sum={data.daily.precipitation_sum}
                precipitation={data.daily.precipitation_hours}
                windspeed={data.daily.windspeed_10m_max}

                humidity={data.hourly.relativehumidity_2m}
                dewpoint={data.hourly.dewpoint_2m}
                pressure={data.hourly.surface_pressure}
                cloudcover={data.hourly.cloudcover}

                time={data.hourly.time}

                clicked={clicked}
            />
        )
    }

    function generateHours(){
        let hours = []
        for (let i = 0; i < 24; i++) {
            hours.push(<HourInfo key={clicked*24+i} id={clicked*24+i} data={data.hourly}/>)
        }
        return hours
    }

    function clickHandle(id){
        setClicked(id)
    }
    const viewHeight = !cords.latt ? "h-screen" : ""
    return(
        <div className={"flex flex-col items-center justify-center w-screen bg-[url('bg.jpg')] bg-cover bg-center min-h-screen " + viewHeight}>
            <div className = "flex flex-col justify-center w-1/3 items-center">
                <h1 className = "text-9xl text-slate-50 font-light">Počasí</h1>
                <input type="text" placeholder="Zadej název města" value={inp} onKeyDown={buttonTownToCords} className="focus:placeholder:text-transparent placeholder:text-center placeholder:text-slate-300 bg-slate-400 bg-opacity-75 rounded-3xl px-9 py-3 text-white text-center text-xl mt-5" onChange={(event) => setInp(event.target.value)}/>
            </div>
            {!cords.latt ? null : 
            <>
                <div className="flex gap-8 flex-wrap p-4 justify-center">{generateDays()}</div>
                <div className="flex gap-6 mt-6">
                    <button className={`bg-slate-400 sm:w-60 w-44 h-11 rounded-lg text-white bg-opacity-75 text-xl mb-6 hover:bg-opacity-100 hover:bg-slate-600 ${mode===0 ? 'border-2' : ''}`} onClick={() => setMode(0)}>Celý den</button>
                    <button className={`bg-slate-400 sm:w-60 w-44 h-11 rounded-lg text-white bg-opacity-75 text-xl mb-6 hover:bg-opacity-100 hover:bg-slate-600 ${mode===0 ? '' : 'border-2'}`} onClick={() => setMode(1)}>Po hodině</button>
                </div>
                {mode===0 ? generateDayInfo() : <div className="bg-white xl:w-2/5 lg:w-2/3 md:w-3/4 w-100% rounded-lg p-6 bg-opacity-90 flex flex-col justify-around shadow-xl">{generateHours()}</div>}
            </>
            } 
        <footer className="bg-opacity-50 mt-4 bg-slate-500 w-full h-16 flex justify-center items-center">
            <div>Jakub Krupka</div>
        </footer>
        </div>
    )
}