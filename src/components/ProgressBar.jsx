import { useEffect , useState } from "react";
export default function ProgressBar({timer,quz}) {
const[remainingTime , setRemainingTime ] = useState(timer);

  useEffect(() =>{
    const timer = setInterval(()=>{
      console.log(' INTERVAL ');
      setRemainingTime( prev => prev - 10);
    },10)

    return () => {
      clearInterval(timer)
    }

  },[quz]);
 
  return <progress value={remainingTime} max={timer}/>
}