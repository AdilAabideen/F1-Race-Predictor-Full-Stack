"use client"
import React from 'react'
import Dropdown from '../Dropdown'
import { useState } from 'react';
import{ BlinkBlur} from 'react-loading-indicators';

const driverInfo = [
    { id: "Verstappen", name: "Max Verstappen", team: "Red Bull Racing", flag: "🇳🇱" },
    { id: "Pérez", name: "Sergio Pérez", team: "Red Bull Racing", flag: "🇲🇽" },
    { id: "Hamilton", name: "Lewis Hamilton", team: "Mercedes", flag: "🇬🇧" },
    { id: "Russell", name: "George Russell", team: "Mercedes", flag: "🇬🇧" },
    { id: "Leclerc", name: "Charles Leclerc", team: "Ferrari", flag: "🇲🇨" },
    { id: "Sainz", name: "Carlos Sainz", team: "Ferrari", flag: "🇪🇸" },
    { id: "Norris", name: "Lando Norris", team: "McLaren", flag: "🇬🇧" },
    { id: "Piastri", name: "Oscar Piastri", team: "McLaren", flag: "🇦🇺" },
    { id: "Alonso", name: "Fernando Alonso", team: "Aston Martin", flag: "🇪🇸" },
    { id: "Stroll", name: "Lance Stroll", team: "Aston Martin", flag: "🇨🇦" },
    { id: "Ocon", name: "Esteban Ocon", team: "Alpine", flag: "🇫🇷" },
    { id: "Gasly", name: "Pierre Gasly", team: "Alpine", flag: "🇫🇷" },
    { id: "Albon", name: "Alexander Albon", team: "Williams", flag: "🇹🇭" },
    { id: "Sargeant", name: "Logan Sargeant", team: "Williams", flag: "🇺🇸" },
    { id: "Bottas", name: "Valtteri Bottas", team: "Alfa Romeo", flag: "🇫🇮" },
    { id: "Zhou", name: "Guanyu Zhou", team: "Alfa Romeo", flag: "🇨🇳" },
    { id: "Tsunoda", name: "Yuki Tsunoda", team: "AlphaTauri", flag: "🇯🇵" },
    { id: "de Vries", name: "Nyck de Vries", team: "AlphaTauri", flag: "🇳🇱" },
    { id: "Hülkenberg", name: "Nico Hülkenberg", team: "Haas F1 Team", flag: "🇩🇪" },
    { id: "Magnussen", name: "Kevin Magnussen", team: "Haas F1 Team", flag: "🇩🇰" }
  ];

export default function MainPage() {
    function organizeDriversByGrid(predictions) {
        // Create an array of 3 empty slots (for top 3 positions)
        const organizedDrivers = new Array(3).fill(null);

        predictions?.forEach(prediction => {
            const { driverId, grid, "Top 3 Finish": top3Finish } = prediction;
            
            // Only process if Top 3 Finish is 1
            if (top3Finish === 1) {
                let driverName = driverId;

                // Handle special cases
                if (driverId === "H\u00fclkenberg") {
                    driverName = "Hulkenberg";
                } else if (driverId === "P\u00e9rez") {
                    driverName = "Perez";
                }

                // Place the driver name in the array based on grid position
                // We use Math.min to ensure we don't exceed array bounds
                const index = Math.min(grid - 1, 2);
                organizedDrivers[index] = driverName;
            }
        });

        return organizedDrivers;
    }
    function findDriverById(id) {
        return driverInfo.find(driver => driver.id === id);
      }
    
    const [predictions, setPredictions] = useState([])
    const [predict, setPredict] = useState(false)
    const [loading, setLoading] = useState(false)
    const [raceName, setRaceName] = useState("")

    const getRaceId = (raceID, selectedGP) => {
        setRaceName(selectedGP.name)
        setPredict(true)
        setLoading(true)
        fetch(`http://127.0.0.1:8080/api/race/${raceID}`)
            .then(response => response.json())
            .then(data => {
                const predicitonsData = organizeDriversByGrid(data.predictions)
                setPredictions(predicitonsData.map((driver, index) => {
                    if (driver) {
                        const driverOBJ = findDriverById(driver)
                        console.log(driverOBJ)
                        return (
                            <div key={index} className='flex items-center justify-between w-[80%] rounded-lg bg-gray-100 border-gray-300 border-2 p-4'>
                                <div className="flex items-center gap-2">
                                    <p>{driverOBJ?.flag}</p>
                                    <span className="font-f1-bold text-lg text-black">
                                        {driverOBJ?.name.split(' ').map((namePart, index, array) => (
                                            <React.Fragment key={index}>
                                                {index === 0 ? (
                                                    <span className="font-f1-regular font-light">{namePart}</span>
                                                ) : (
                                                    <span className="font-f1-bold">{namePart}</span>
                                                )}
                                                {index < array.length - 1 && ' '}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </div>
                                <span className="font-f1-regular font-light text-base text-black">{driverOBJ?.team}</span>
                            </div>
                        )
                    }
                }))

                setLoading(false)
            })
    }

    
    const handlePredictAgain = () => {
        setPredict(false)
        setPredictions([])
        setRaceName("")
    }
 



  return (
    <div className="bg-white bg-opacity-95  md:p-12 p-4 rounded-xl shadow-md text-center flex flex-col gap-8 items-center">
        {!predict ? <>
            <div className='flex flex-col gap-1'>
                <h1 className="text-3xl font-f1-bold mb-4 text-black">Welcome to F1 Predict</h1>
                <p className="text-lg font-f1-regular text-black">Your ultimate destination for Formula 1 predictions!</p>
                <p className="text-lg font-f1-regular text-black">Please Choose your race in the 2023 season and we will predict it!</p>
            </div>
            <Dropdown getRaceId={getRaceId} />
        <div className='flex flex-row items-center justify-center gap-2'>
            <a href="https://github.com/adil-aabideen" target="_blank" className="text-base underline font-f1-regular text-black">Adil Aabideen</a>
            <a href="https://github.com/adil-aabideen" target="_blank" className="text-base underline font-f1-regular text-black">Docs</a>
        </div>
        </> : (
            <div className='flex flex-col  items-center gap-8'>
                <div className='flex flex-col gap-1'>
                    <h1 className="text-3xl font-f1-bold mb-4 text-black">Here are the predictions for the race</h1>
                    <h1 className="text-2xl font-f1-bold mb-4 text-red-500">{raceName}</h1>
                    <p className="text-lg font-f1-regular text-black">We only predict who is going to be in the Top - 3</p>
                </div>
                {loading ? (<BlinkBlur color="#ff0000" size="medium" text="" textColor="" />) : (<div className='flex flex-col gap-2 w-full items-center'>
                    {predictions}
                </div>)}
                {!loading && <button onClick={handlePredictAgain} className='bg-red-500 text-white p-4 rounded-lg font-f1-bold text-lg'>Predict Again</button>}
            </div>
            )}
      </div>
  )
}
