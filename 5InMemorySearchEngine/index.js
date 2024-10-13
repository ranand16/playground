// 1. Create class with a map for different docs, addDocument, search functions
class InMemoryDB {
    constructor() {
        // 2. Create map for dif docs
        this.entities = new Map();
    }
    // 3. Create addDocument with docId and documents to be added
    addDocuments(docId, documents) {
        if(this.entities.has(docId)) {
            // 4. If docId exists in the map, append the documents
            const existingDocs = this.entities.get(docId);
            this.entities.set(docId, [...existingDocs, ...documents]);
        } else {
            // 5. If docId doesnot exists then create a document and add documents needed to add.
            this.entities.set(docId, [...documents]);
        }
    }
    // 6. Create Search function with docId, filter function and sort type
    search(docId, filterFN, sortLogic) {
        // 7. In search function get all the documents 
        let existingDocs = this.entities.get(docId);
        console.log("🚀 ~ InMemoryDB ~ search ~ existingDocs:", existingDocs)
        if(!existingDocs) throw new Error("This document does not exist!");
        // 8. Apply filter function on the fetched functions
        existingDocs = existingDocs.filter((doc)=> filterFN(doc));
        // 9. Apply sorting to the filtered documents and return the documents
        if(sortLogic) {
            const { key, asc } = sortLogic;
            if(!(key && asc)) throw new Error("Sort logic is not in correct format.");
            return existingDocs.sort((a,b)=> {
                if(asc) return a[key] - b[key];
                else return b[key] - a[key];
            })
        }
        // 10. Return the documents
        return existingDocs
    }
}


// TESTS
const MOVIE_DOC = "Movies";

const se = new InMemoryDB();
se.addDocuments(MOVIE_DOC, [
    { name: "Avengers", rating: "8.5", year: 2017 },
    { name: "Avengers 2", rating: "10.5", year: 2018 },
    { name: "Avengers 3", rating: "5.5", year: 2019 },
    { name: "Avengers 4", rating: "5.5", year: 2020 },
    { name: "Avengers 5", rating: "9.5", year: 2021 },
    { name: "Avengers 6", rating: "8.59", year: 2022 },
]);

const sr = se.search(MOVIE_DOC, (doc)=> doc.rating > 7, { key: "rating", asc: true });

console.log(sr)