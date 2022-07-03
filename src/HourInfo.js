import React from "react"
import Weathercode from "./Weathercode"

export default function HourInfo(props){
    const [clicked, setClicked] = React.useState(false)

    function click(){
        setClicked(prev => !prev)
    }
    return(
        <div>
            
            <div onClick={click} className="grid grid-cols-[14%_11%_17%_26%_27%_5%] items-center h-14 border-t border-slate-500 px-4 cursor-pointer">
                <h1>{new Date(props.data.time[props.id]).getHours() + ":" + new Date(props.data.time[props.id]).getMinutes()}0</h1>
                <h1>{props.data.temperature_2m[props.id]}°</h1>
                <Weathercode weathercode = {props.data.weathercode[props.id]}/>
                <h1><i className="fa-solid fa-cloud-showers-heavy text-blue-700 text-xl mr-2"></i>{props.data.precipitation[props.id]} mm</h1>
                <h1><i className="fa-solid fa-wind text-gray-600 text-xl mr-2"></i>{props.data.windspeed_10m[props.id]} km/h</h1>
                {clicked ? <i className="fa-solid fa-angle-up text-center"></i> : <i className="fa-solid fa-angle-down text-center"></i>} 
            </div>


            {clicked ? 
                <div className="border border-slate-500 rounded-md mb-3 p-3 md:pl-16 pl-5">
                    <div className="grid grid-flow-col grid-cols-3">
                        <div>
                            <h1>Pocitově<i className="fa-solid fa-temperature-three-quarters text-blue-700 ml-2"></i></h1>
                            <h1 className="font-bold">{props.data.apparent_temperature[props.id]}°</h1>
                        </div>
                        <div>
                            <h1>Vítr<i className="fa-solid fa-wind text-blue-700 ml-2"></i></h1>
                            <h1 className="font-bold">{props.data.windspeed_10m[props.id]} km/h</h1>
                        </div>
                        <div>
                            <h1>Vlhkost<i className="fa-solid fa-droplet text-blue-700 ml-2"></i></h1>
                            <h1 className="font-bold">{props.data.relativehumidity_2m[props.id]}%</h1>
                        </div>
                    </div>
                    <div className="grid grid-flow-col grid-cols-3">
                        <div>
                            <h1>Pokrytí mraky<i className="fa-solid fa-cloud text-blue-700 ml-2"></i></h1>
                            <h1 className="font-bold">{props.data.cloudcover[props.id]}%</h1>
                        </div>
                        <div>
                            <h1>Srážky<i className="fa-solid fa-cloud-rain text-blue-700 ml-2"></i></h1>
                            <h1 className="font-bold">{props.data.precipitation[props.id]} mm</h1>
                        </div>
                        <div>
                            <h1>Tlak<i className="fa-solid fa-angles-down text-blue-700 ml-2"></i></h1>
                            <h1 className="font-bold">{props.data.surface_pressure[props.id]} hPa</h1>
                        </div>
                    </div>
                </div> 
                : ""}
        </div>
    )
}