import { useEffect, useState } from "react";

export function MovieSelection() {
    const [seat, setSeat] = useState([]);
    const [currentSeat, setCurrent] = useState({});
    const [removeFlag, setRemove] = useState(false);
    const [currentMovie, setCurrentMovie] = useState("");

    useEffect(()=>{
        fetch('http://localhost:3000/api/seat')
        .then((response) => response.json())
        .then((data) => setCurrent(data));

    },[,currentMovie]);

    useEffect(()=>{
        if(removeFlag===true){
            const obj = {
                'movie': currentMovie,
                'array': seat
            }
            fetch('http://localhost:3000/api/seatRemove',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(obj)
            })
            .then(res => {
                console.log()
                if(res.status === 200){
                    console.log('Updated seat')
                    setRemove(false);

                }
                else{
                    console.log('Error')
                }
            });

        }   
    },[removeFlag]);

    function clearMovie(){
        setSeat([]);
    }

    function selectMovie(movieSelected){
        setCurrentMovie(movieSelected);
        setSeat(currentSeat[movieSelected]);
    }

    function remove(removeSeat){
        setSeat(seat.filter(number => number !== removeSeat));
        setRemove(true);
        alert('Your seat No: '+removeSeat+' has been booked');
    }
    return (
        <div className="Movie">
            <div className="movie-List">
                <div className="movie-1">
                    <div className="movie-Content">
                        <h1>SpiderMAN</h1>
                        <div><button onClick={()=>{
                            selectMovie("spiderman");
                        }}>Select</button></div>
                        </div>

                </div>
                <div className="moview-2">
                <   div className="movie-Content">
                        <h1>Iron-Man</h1>
                        <div><button onClick={()=>{
                            selectMovie("ironMan");
                        }}>Select</button>
                        </div>
                    </div>

                </div>
                <div className="moview-3">
                    <div className="movie-Content">
                        <h1>Doctor Strange</h1>
                        <div><button onClick={()=>{
                            selectMovie("doctorStrange");
                        }}>Select</button>
                        </div>
                    </div>

                </div>

            </div>
            <div>
                <h4>Please select your seats for {currentMovie}</h4>
                {seat.length>0 && <div>
                    {seat.map((item)=>{
                        return(
                            <div>
                                <h4>{item}</h4>
                                <button onClick={()=>{
                                    remove(item)
                                }}>
                                Book
                                </button>

                            </div>

                        )
                    })}
                    </div>}
            </div>
            <div>
                <h5>If you wish to select seats for another movie, please reset</h5>
                <button onClick={clearMovie}>Reset</button>
            </div>
        </div>

    );
}