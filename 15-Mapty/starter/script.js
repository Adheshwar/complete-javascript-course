'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout{
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration){
        this.coords = coords; // [lat, lon]
        this.distance = distance; // in kms
        this.duration = duration; // in mins
    }
}

class Running extends Workout{
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.clacPace();
    }

    clacPace(){
        // min/km
        this.pace = this.duration/this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    constructor(coords, distance, duration, elevation){
        super(coords, distance, duration);
        this.elevation = elevation;
        this.speed = this.calcSpeed();
    }

    calcSpeed(){
        // kms/hr
        this.speed = this.distance/(this.duration/60);
        return this.speed;
    }
}

// const run1 = new Running([25.0330, 121.5654], 5.2, 24, 178);
// const cycle1 = new Cycling([25.0330, 121.5654], 27, 95, 523);
// console.log(run1, cycle1);
////////////////////////////////////
// Applicaton arch
class App {
    #map;
    #mapEvent;
    constructor() {
        this._getPosition();
        //Event listener on Enter/Submit of form
        form.addEventListener('submit', this._newWorkout.bind(this));

        //Event listener on change of Type
        inputType.addEventListener('change', this._toggleElevationField.bind(this));
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
            alert('Could not get your position.')
        });
    }

    _loadMap(position) {

        //console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        //console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);
        const coords = [latitude, longitude];
        console.log(this);
        this.#map = L.map('map').setView(coords, 10);

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        /*L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS popup.<br> Easily customizable.')
            .openPopup();*/

        //Handling clicks on Map
        this.#map.on('click', this._showForm.bind(this))
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField(e) {
        //form__row--hidden
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        console.log(this);
        e.preventDefault();
        //Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = '';
        const { lat, lng } = this.#mapEvent.latlng;
        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            }))
            .setPopupContent('Workout')
            .openPopup();
    }
}

const app = new App();