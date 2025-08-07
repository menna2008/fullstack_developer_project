import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../Header/Header';

const SearchCars = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [dealer, setDealer] = useState('');
    const [message, setMessage] = useState('');

    const { id } = useParams();

    let cars_url = window.location.origin + `/djangoapp/get_inventory/${id}`;
    let dealer_url = window.location.origin + `/djangoapp/dealer/${id}`;

    const populateMakesAndModels = (cars) => {
        let makes = [];
        let models = [];
        cars.forEach((car) => {
            makes.push(car['make']);
            models.push(car['model']);
        });
        setMakes(Array.from(new Set(makes)));
        setModels(Array.from(new Set(models)));
    }

    const fetchCars = async () => {
        const res = await fetch(cars_url, {
            method : 'GET'
        });

        let data = await res.json();
        if (data.status === 200) {
            let cars = Array.from(data.cars);
            setCars(cars);
            populateMakesAndModels(cars);
        }
    };

    const fetchDealer = async () => {
        const res = await fetch(dealer_url, {
            method : 'GET'
        });

        let data = await res.json();

        if (data.status === 200) {
            setDealer(data['dealer'][0]['full_name'])
        };
    };

    const SearchCarsByMake = async () => {
        let make = document.getElementById('make').value;
        let url = dealer_url + "?make=" + make;

        let res = await fetch(url, {
            method : 'GET',
        });

        res = await res.json();
        let cars = Array.from(res.cars);
        if (cars.length === 0) {
            setMessage('No cars found matching criteria');
        }
        setCars(cars);
    }

    const SearchCarsByModel = async () => {
        let model = document.getElementById('model').value;
        let url = dealer_url + "?model=" + model;

        let res = await fetch(url, {
            method : 'GET',
        });

        res = await res.json();
        let cars = Array.from(res.cars);
        if (cars.length === 0) {
            setMessage('No cars found matching criteria');
        }
        setCars(cars);
    }

    const SearchCarsByYear = async () => {
        let year = document.getElementById('year').value;
        let url = dealer_url + "?year=" + year;

        let res = await fetch(url, {
            method : 'GET',
        });

        res = await res.json();
        let cars = Array.from(res.cars);
        if (cars.length === 0) {
            setMessage('No cars found matching criteria');
        }
        setCars(cars);
    }

    const SearchCarsByMileage = async () => {
        let mileage = document.getElementById('mileage').value;
        let url = dealer_url + "?mileage=" + mileage;

        let res = await fetch(url, {
            method : 'GET',
        });

        res = await res.json();
        let cars = Array.from(res.cars);
        if (cars.length === 0) {
            setMessage('No cars found matching criteria');
        }
        setCars(cars);
    }

    const SearchCarsByPrice = async () => {
        let price = document.getElementById('price').value;
        let url = dealer_url + "?price=" + price;

        let res = await fetch(url, {
            method : 'GET',
        });

        res = await res.json();
        let cars = Array.from(res.cars);
        if (cars.length === 0) {
            setMessage('No cars found matching criteria');
        }
        setCars(cars);
    }

    useEffect(() => {
        fetchCars()
        fetchDealer()
    }, [])

    return (
        <div>
            <Header />
            <h1>Cars at {dealer}</h1>
            <span>Make</span>

            {/* Makes option */}
            <select name="make" id="make" defaultValue={''} onChange={SearchCarsByMake}>
                <option disabled value=''> -- All -- </option>
                {makes.map((make, index) => (
                    <option key={index} value={make}>{make}</option>
                ))}
            </select>

            {/* Models option */}
            <select name="model" id="model" defaultValue={''} onChange={SearchCarsByModel}>
                <option disabled value=''> -- All -- </option>
                {models.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                ))}
            </select>

            {/* Years option */}
            <select name="year" id="year" onChange={SearchCarsByYear}>
                <option disabled selected> -- All -- </option>
                <option value={2024}>2024 or newer</option>
                <option value={2023}>2023 or newer</option>
                <option value={2022}>2022 or newer</option>
                <option value={2021}>2021 or newer</option>
                <option value={2020}>2020 or newer</option>
            </select>

            {/* Mileage option */}
            <select name="mileage" id="mileage" onChange={SearchCarsByMileage}>
                <option disabled selected> -- All -- </option>
                <option value={50000}>Less than 50000</option>
                <option value={100000}>Between 50000 and 100000</option>
                <option value={150000}>Between 100000 and 150000</option>
                <option value={200000}>Between 150000 and 200000</option>
                <option value={200001}>Greater than 200000</option>
            </select>
            
            {/* Price option */}
            <select name="price" id="price" onChange={SearchCarsByPrice}>
            <option disabled selected> -- All -- </option>
                <option value={20000}>Less than 20000</option>
                <option value={40000}>Between 20000 and 40000</option>
                <option value={60000}>Between 40000 and 60000</option>
                <option value={80000}>Between 60000 and 80000</option>
                <option value={80001}>Greater than 80000</option>
            </select>

            <hr />
            
            {cars.length === 0 ? (
                <p>{message}</p>
            ) : (
                <div>
                    {cars.map(car => (
                        <div>
                            <h3>{car.make} {car.model}</h3>
                            <p>Year: {car.year}</p>
                            <p>Mileage: {car.mileage}</p>
                            <p>Price: {car.price}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
};


export default SearchCars;
