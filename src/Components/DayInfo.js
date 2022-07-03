import Weathercode from "./Weathercode"
export default function DayInfo(props){

    let selectedHours = []

    for (let i = (props.clicked * 24); i < ((props.clicked * 24) +24); i++){
        selectedHours.push(i)
    }

    const average = arr => {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum = sum + arr[i]
        }
        return(sum/arr.length)
    }
    
    const avgHumidityArr = props.humidity.slice(selectedHours[0], selectedHours[selectedHours.length-1] +1)
    const avgDewpointArr = props.dewpoint.slice(selectedHours[0], selectedHours[selectedHours.length-1] +1)
    const avgPreasureArr = props.pressure.slice(selectedHours[0], selectedHours[selectedHours.length-1] +1)
    const avgCloudcoverArr = props.cloudcover.slice(selectedHours[0], selectedHours[selectedHours.length-1] +1)
    

    const avgCloudcover = Math.round(average(avgCloudcoverArr) * 100) / 100;
    const avgPreasure = Math.round(average(avgPreasureArr) * 100) / 100;
    const avgDewpoint = Math.round(average(avgDewpointArr) * 100) / 100;
    const avgHumidity = Math.round(average(avgHumidityArr) * 100) / 100;

    const days = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"]

    return(
        !props.sunset ? null :
        <div className="bg-white w-full md:w-3/5 lg:w-2/3 xl:w-2/5 max-h-3/4 bg-opacity-90 md:p-5 rounded-lg justify-self-center">
            <div className="flex justify-around items-center">
                <div>
                    <h1 className="text-5xl mb-3">{days[new Date(props.sunset[props.clicked]).getDay()]}</h1>
                    <h2>Východ slunce: {new Date(props.sunset[props.clicked]).getHours() + ":" + new Date(props.sunset[props.clicked]).getMinutes()}</h2>
                    <h2>Západ slunce:  {new Date(props.sunrise[props.clicked]).getHours() + ":" + new Date(props.sunrise[props.clicked]).getMinutes()}</h2>
                </div>
                <Weathercode weathercode = {props.weathercode[props.clicked]}/>
            </div>
            <div className="flex flex-row justify-around">
            <table className="w-2/5">
                <tbody>
                <tr>
                    <th className="flex justify-between border-t border-slate-500"><span>Max./Min.</span><span>{props.temp_max[props.clicked]}°, {props.temp_min[props.clicked]}°</span></th>
                    <th className="flex justify-between border-t border-slate-500"><span>Vítr</span><span>{props.windspeed[props.clicked]} km/h</span></th>
                </tr>
                <tr>
                    <th className="flex justify-between border-t border-slate-500"><span>Vlhkost</span><span>{avgHumidity.toString()}%</span></th>
                    <th className="flex justify-between border-t border-slate-500"><span>Rosný bod</span><span>{avgDewpoint.toString()}°C </span></th>
                </tr>
                </tbody>

            </table>
            <table className="w-2/5">
                <tbody>
                <tr>
                    <th className="flex justify-between border-t border-slate-500"><span>Srážky</span><span>{props.rain_sum[props.clicked]} mm</span></th>
                    <th className="flex justify-between border-t border-slate-500"><span>Čas s deštěm</span><span>{props.precipitation[props.clicked]}h</span></th>
                </tr>
                <tr>
                    <th className="flex justify-between border-t border-slate-500"><span>Tlak</span><span>{avgPreasure.toString()} hPa</span></th>
                    <th className="flex justify-between border-t border-slate-500"><span>Mraky</span><span>{avgCloudcover.toString()}%</span></th>
                </tr>
                </tbody>

            </table>
            </div>
        </div>

    )
}