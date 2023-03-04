import {useState, useRef, useEffect} from 'react';
import WeatherWidget from './WeatherWidget'


const api = process.env.REACT_APP_API_ENDPOINT;
function WeatherApp() {
    
    const [location, setlocation] = useState('');
    const [background, setBackground] = useState('');
    const locationInput = useRef(null);

    function clearInput(e) {
        e.preventDefault();
        locationInput.current.value = ''
    }

    function handleClick(e) {
        e.preventDefault();
        setlocation(locationInput.current.value)
        clearInput(e)
    };

    function handleEnter(e) {
        if (e.key === 'Enter') {
        e.preventDefault();
        setlocation(locationInput.current.value)
        clearInput(e)
        }
    };

    useEffect (() => {
        function getBackground(query) {
            fetch(api+'/background/'+query) 
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Invalid Request")
            })
            .then(jsonData => {
                setBackground(jsonData.urls.regular);
                console.log("Background Updated");
            })
            .catch((error) => {
                console.log("Background Not Updated: Bad request")
            })
        };
        if (!location) {
            getBackground("landscape")
        }
        else {
            getBackground(location);
            console.log('background loaded');
        }
    }, [location]);

    return (
        <div 
        className="background"
        style={{backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}
         >
            <div className="card">
                <div className="search">
                    <input 
                        type="text" 
                        className="search-bar" 
                        placeholder="Search" 
                        id="search" 
                        autoComplete='off'
                        ref={locationInput}
                        onKeyDown={handleEnter}
                        onFocus={clearInput}
                        />
                    <button
                        onClick={handleClick}
                        >
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" 
                        height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                        </svg>
                    </button>
                </div>
                <WeatherWidget 
                    location={location}
                    />
            </div>
        </div>
    )
}
export default WeatherApp