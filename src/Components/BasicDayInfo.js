import Weathercode from "./Weathercode"
export default function BasicDayInfo(props){

    const styles = props.id === props.clicked ? "bg-slate-400" : "bg-white bg-opacity-90"
    const days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"]

    return(
        !props.maxTemperature ? null :
        <div onClick={()=>{props.click(props.id)}} className={styles + " mt-7 p-3 rounded-lg flex flex-col items-center cursor-pointer shadow-xl"} >
            <h1>{days[new Date(props.date).getDay()]}</h1>
            <Weathercode weathercode = {props.weathercode} />
            <div><span className="mr-3">{props.maxTemperature + "°"}</span><span className="text-slate-300">{props.minTemperature + "°"}</span></div>
        </div>
    )
}