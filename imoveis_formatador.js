const fs = require("fs");
const csvParser = require("csv-parser")



const stream = fs.createReadStream("houses.csv");



let conteudo = [];

//city,area,rooms,bathroom,parking spaces,floor,animal,furniture,hoa,rent amount,property tax,fire insurance,total

stream.pipe(csvParser()).on('data', (data) => {
    conteudo.push({
        id: conteudo.length + 1,
        city: data['city'].trim(),
        area: Number(data['area']),
        rooms: data['rooms'].trim(),
        bathroom: data['bathroom'].trim(),
        'parking spaces': data['parking spaces'].trim(),
        floor: data['floor'].trim(),
        animal: Boolean(data['animal']),
        furniture: Boolean(data['furniture']),
        hoa: Number(data['hoa'] * 100),
        'rent amount': Number(data['rent amount'] * 100),
        'property tax': Number(data['property tax'] * 100),
        'fire insurance': Number(data['fire insurance'] * 100),
        total: Number(data['total'] * 100)

    }) 
   
});

stream.on('end', () => {
    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'imoveis_saida.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'city', title: 'cidade'},
            {id: 'area', title: 'area'},
            {id: 'rooms', title: 'quartos'},
            {id: 'bathroom', title: 'banheiros'},
            {id: 'parking spaces', title: 'estacionamento'},
            {id: 'floor', title: 'andares'},
            {id: 'animal', title: 'animais'},
            {id: 'furniture', title: 'moveis'},
            {id: 'hoa', title: 'taxa_condominio'},
            {id: 'rent amount', title: 'aluguel'},
            {id: 'fire insurace', title: 'seguro_incendio'},
            {id: 'total', title: 'total'},
        ]
    });
    
    csvWriter.writeRecords(conteudo);
});