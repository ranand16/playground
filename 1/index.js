const MOVIES = 'Movies';
class InMemorySearch {
    constructor() {
        this.docs = new Map();
    }

    addDocuments(docId, ...movieDetails) {
        console.log(docId);
        console.log(movieDetails);
        if(!this.docs.has(docId)) {
            this.docs.set(MOVIES, [...movieDetails]);
            console.log(this.docs);
        } else {
            const existingMovs = this.docs.get(MOVIES);
            const newMovs = [...existingMovs, ...movieDetails]
            this.docs.set(MOVIES, newMovs);
            console.log(this.docs);
        }
    }

    search(docId, filterFn, sortConfig) {
        const ifDocExists = this.docs.has(docId);
        if(ifDocExists) {
            const existingdocs = this.docs.get(docId);
            if(!(existingdocs.length > 0)) return new Error("Document is empty.")
            const filterDocs = existingdocs.filter(filterFn);
            const { key, asc } = sortConfig;
            const sortedDocs = filterDocs.sort((m1, m2) => Boolean(asc) ? m1[key] - m2[key] : m2[key] - m1[key]);
            return sortedDocs;
        }
        return new Error("Doc id doesnot exist.")
    }
};

const searchEngine = new InMemorySearch();

searchEngine.addDocuments(
    MOVIES,
    { name: 'Avenger', rating: 8.5, year: 2017 },
    { name: 'Black Adam', rating: 8.7, year: 2022 },
    { name: 'Jhon Wick 4', rating: 8.2, year: 2023 },
    { name: 'Black Panther', rating: 9.0, year: 2022 }
);

searchEngine.addDocuments(
    MOVIES,
    { name: 'Avenger: DOOMSDAY', rating: 8.5, year: 2025 },
);

console.log(
    searchEngine.search(MOVIES, e => e.rating > 8.5, {
    key: 'rating',
    asc: false,
    })
);

// Output
/*
[
    {
    "name": "Black Panther",
    "rating": 9,
    "year": 2022
    },
    {
    "name": "Black Adam",
    "rating": 8.7,
    "year": 2022
    }
]
*/
