import { apiKey } from "../api-key.js"

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getGeocode,
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
            gMap.addListener('click', ev => {
                const lat = ev.latLng.lat()
                const lng = ev.latLng.lng()
                console.log(lat, lng)
                panTo(lat, lng)
            })
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(latLng)
}

function getGeocode(address) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey.GEOCODE}`
    fetch(apiUrl)
    .then(res => res = res.json())
    .then(res => {
        if (! res.results) {
            console.error(res)
            return
        }
        const formattedAdress = res.results[0].formatted_address
        const lat = res.results[0].geometry.location.lat
        const lng = res.results[0].geometry.location.lng
        console.log(formattedAdress, lat, lng)
        panTo(lat, lng)
    })
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.MAP}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}