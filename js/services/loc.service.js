import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const locService = {
    getLocations,
    createLocation,
    addLocation,
    removeLocation,
}

const LOCATIONS_STORAGE_KEY = 'locations'

const gLocations = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocations() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocations)
        }, 2000)
    })
}

function createLocation(name, lat, lng) {
    const newLocation = {
        id: utilService.makeId(),
        name,
        lat,
        lng,
    }
    return newLocation
}

function addLocation(location) {
    gLocations.push(location)
    saveLocations()
}

function removeLocation(locationId) {
    const idx = gLocations.findIndex(location => location.id === locationId)
    if (idx < 0) return
    gLocations.splice(idx, 1)
    saveLocations()
}

function saveLocations() {
    storageService.post(LOCATIONS_STORAGE_KEY, gLocations)
}