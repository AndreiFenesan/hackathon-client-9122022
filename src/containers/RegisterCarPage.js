import React from 'react';
import api from '../api';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import "./LoginPage.css"
function RegisterCarPage() {
    const [vehicleData, setVehicleData] = React.useState({registrationPlate: '', fuelId: undefined, pollutionStandard: undefined, errorMessage: ''});
    const [fuels, setFuels] = React.useState([]);

    const [cookies, setCookie] = useCookies(['token', 'refresh_token']);

    const navigate = useNavigate();

    React.useEffect(() => {
        api.post('/authentication/get-fuels', {
            token: cookies.token
        }).then(res => {
            setFuels(prevState => res.data.fuels);
        }).catch(e => {
            navigate('/');
        });
    }, []);

    const submitTheForm = (ev) => {
        ev.preventDefault();
        api.post('/authentication/register-vehicle', {
            registrationPlate: vehicleData.registrationPlate,
            fuelId: vehicleData.fuelId,
            pollutionStandard: vehicleData.pollutionStandard,
            token: cookies.token
        }).then(res => {
            navigate('/');
        }).catch(e => {
            setVehicleData(prevState => ({
                ...prevState,
                errorMessage: e.response.data.errorMessage
            }));
        });
    }

    const updateVehicleData = (ev) => {
        setVehicleData(prevState => (
            {
                ...prevState,
                [ev.target.name]:ev.target.value
            }
        ))
    }

    const getFuels = () => {
        return fuels.map((fuel) => {
          return <option value={fuel.fuelId}>{fuel.name}</option>;
        });
    }

    return (
        <div className='screen'>
            <form method="POST" onSubmit={submitTheForm} className={"form-container"}>
                <label>Registration plate</label>
                <input name={"registrationPlate"} type={"text"} className='email' value={vehicleData.registrationPlate} onChange={updateVehicleData} />
                <label>Pollution standard (Euro)</label>
                <input name={"pollutionStandard"} type={"number"} className='email' value={vehicleData.pollutionStandard} onChange={updateVehicleData} />
                <label>Fuel</label>
                <select name={"fuelId"} className='email' onChange={updateVehicleData}>
                    {getFuels()}
                </select> 
                <div className='button-div'>
                <input type={"submit"} className='login-button' value={"Add vehicle"} /></div>
                <label>{vehicleData.errorMessage}</label>
            </form>
        </div>
    );
}

export default RegisterCarPage;