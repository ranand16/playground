class InMemorySearch {
        constructor() {
        this.docs = new Map();
        }
        
        addDocuments(docId, movieDetails) {
        
        }
    
        search() {
        
        }
    };
    
    const searchEngine = new InMemorySearch();
    
    searchEngine.addDocuments(
        'Movies',
        { name: 'Avenger', rating: 8.5, year: 2017 },
        { name: 'Black Adam', rating: 8.7, year: 2022 },
        { name: 'Jhon Wick 4', rating: 8.2, year: 2023 },
        { name: 'Black Panther', rating: 9.0, year: 2022 }
    );
    
    console.log(
        searchEngine.search('Movies', e => e.rating > 8.5, {
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
