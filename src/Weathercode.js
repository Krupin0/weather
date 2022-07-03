export default function Weathercode(props){
    let src = ""
    switch (props.weathercode) {
        case 0:
        case 1:
            src = "sunny";
            break;
        case 2:
          src = "partly_cloudy";
          break;
        case 3:
            src = "cloudy";
            break; 
        case 45:
        case 48:
          src = "fog";
          break;
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            src = "rain";
            break;
        case 66:
        case 67:
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            src = "snow";
            break;
        case 95:
        case 96:
        case 99:
            src = "thunderstorms"
            break;
        default:
            src = ""
      }

    function generateImg(){
        return(<img src={"https://ssl.gstatic.com/onebox/weather/128/" + src +".png"} alt={src} className="h-full"/>)
    }
    
    return(src ? generateImg() : null)
}