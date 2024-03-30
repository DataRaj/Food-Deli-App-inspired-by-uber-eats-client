import {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import Loading from '../../components/loading/Loading';
import './Driver.css';
const Driver = () => {
	const [coords, setCoords] = useState<any>([]);
	const onSuccess = (postion) => {
		let latitude = postion.coords.latitude;
		let longitude = postion.coords.longitude;
		setCoords([latitude, longitude]);
	};
	const onError = (error) => {
		console.log(error);
	};
	useEffect(() => {
		navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
	}, []);

	return coords.length > 0 ? (
		<MapContainer center={coords} zoom={13} scrollWheelZoom={true}>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
			<Marker position={coords}>
				<Popup>
					<span>You are here</span>
				</Popup>
			</Marker>
		</MapContainer>
	) : (
		<Loading />
	);
};
export default Driver;
