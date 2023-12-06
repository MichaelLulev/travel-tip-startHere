export const locService = {
    getLocations,
}


const locations = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocations() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locations)
        }, 2000)
    })
}


