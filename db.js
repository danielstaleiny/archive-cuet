const book = require('./init-db') // bookshelf
const uuid = require('uuid/v4')

const Attachment = book.Model.extend({
    tableName: 'attachments'
})

const Document = book.Model.extend({
    tableName: 'documents',
    attachments: function() {
        return this.hasMany(Attachment)
    }
})

// insert :: Model -> Object -> Promise
const insert = Model => async obj => {
    try {
        const rr = await new Model({
            id: uuid(),
            ...obj
        }).save(null, { method: 'insert' })
    } catch (e) {
        console.log(e)
        console.trace('faling here')
    }
}

exports.Document = {
    // save :: Object -> Promise
    save: insert(Document)
}

exports.Attachment = {
    // save :: Object -> Promise
    save: insert(Attachment)
}

exports.test = async obj => {
    try {
        const res = await Document.fetchAll()
        console.log(res.toJSON())
        return res
    } catch (e) {
        console.log(e)
        console.trace('here')
    }
}

// { publishedOnOfficialBoard: 'Obec Močenok',
//   publishedFrom: '01.02.2019',
//   registrySymbol: '',
//   documentsAuthor: 'Obec Močenok',
//   publishedTo: '17.02.2019',
//   registryCase: '',
//   nameOfOfficialDocument: 'VZN Obce Močenok č.1/2019,2/2019,3/2019',
//   documentAbstract: '<div class="encodedArea"></div>',
//   attachments:
//    [ { name: 'VZN Obce Močenok č. 01_2019, ktorým sa mení a dopĺňa vzn 01 2010 o určení výšky dotácie na prevádzku a mzdy na žiaka.pdf',
//        fileSize: null,
//        mimeType: null,
//        path: '/en/priloha/uloz/963aa5e3-f9f0-48ad-867f-2da277748af1',
//        pathOrig: '/en/priloha/povodna/uloz/69f66af9-ac76-4dbd-bd46-1adc433e4e0c' },
//      { name: 'VZN Obce Močenok č. 02_2019 o podmienkach predaja výrobkov a poskytovania služieb na trhovisku v obci Močenok.pdf',
//        fileSize: null,
//        mimeType: null,
//        path: '/en/priloha/uloz/415feb9c-1de5-4e05-a1a8-809de89fa15c',
//        pathOrig: '/en/priloha/povodna/uloz/c01daca3-f78e-4bd9-8c8e-2cb157a5c700' },
//      { name: 'VZN Obce Močenok č. 03_2019, ktorým sa mení a dopĺňa VZN č. 05_2017 o miestnych daniach a miestnom poplatku za KO.pdf',
//        fileSize: null,
//        mimeType: null,
//        path: '/en/priloha/uloz/51070751-04a1-46a2-b90a-a447d99fecad',
//        pathOrig: '/en/priloha/povodna/uloz/4b56ce6d-e1c9-45d3-9f07-349e90cfb266' } ] }

// const test1 = {
//     publishedOnOfficialBoard: 'Ministerstvo kultúry Slovenskej republiky',
//     publishedFrom: '01.02.2019',
//     registrySymbol: 'G01.05',
//     documentsAuthor: 'Ministerstvo kultúry Slovenskej republiky',
//     publishedTo: '15.02.2019',
//     registryCase: '17885/2018',
//     nameOfOfficialDocument: 'Rozhodnutie - vyhlásenie Mostu SNP za NKP',
//     documentAbstract:
//     '<div class="encodedArea">Rozhodnutie o vyhlásení Mosta SNP za Národnú kultúrnu pamiatku (NKP), zmena rozsahu vyhláseného Pamiatkovým úradom SR.</div>'
// }

// Document.save({
//     publisher: test1.publishedOnOfficialBoard,
//     published_date: new Date(...test1.publishedFrom.split('.')),
//     closed_date: new Date(...test1.publishedTo.split('.')),
//     author: test1.documentsAuthor,
//     registry_symbol: test1.registrySymbol,
//     registry_case: test1.registryCase,
//     name_of_document: test1.nameOfOfficialDocument,
//     description: test1.documentAbstract
// })
