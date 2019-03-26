const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;

const getInfo = async (direccion) => {

    const coordenadas = await lugar.getLugarLatLng(direccion);

    const temperatura = await clima.getClima(coordenadas.lat, coordenadas.lng);

    if(temperatura){
        return `El clima de ${coordenadas.direccion} es de ${temperatura}`;
    } else {
        throw new Error(`No se pudo determinar el clima de ${coordenadas.direccion}`);
    }
}

getInfo(argv.direccion)
    .then( console.log )
    .catch( console.log );