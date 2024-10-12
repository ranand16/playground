const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ["Front", "End", "JavaScript"];

document.getElementById("input-words").innerHTML = words;
document.getElementById("input-str").innerHTML = str;
const o = highlight(str, words);
console.log(o);
document.getElementById("output").innerHTML = o;
function highlight(str, words) {
    // 1. Convert words into a set to have unique words
    const uniqueWords = new Set(words);
    // 2. Split str into array with space as delimitter
    const splittedStr = str.split(" ");
    // 3. Traverse through each word in splitted str
    const result = splittedStr.map((sw) => {
        let output = "";
        // 4. Check if the selected word is in the unique word array
        if(uniqueWords.has(sw)) output = `<strong>${sw}</strong>`;
        else {
            // 5. If not then divide the selected word into two parts part1 and part2(prefix or suffix)
            const swlen = sw.length;
            for(let i = 0; i< swlen; i++) {
                const prefix = sw.slice(0, i+1);
                const suffix = sw.slice(i+1);
                // 6. If both parts are in the word highlight both
                if(uniqueWords.has(prefix) && uniqueWords.has(suffix)) {
                    output = `<strong>${prefix}${suffix}</strong>`;
                    break;
                } else if(uniqueWords.has(prefix) && !uniqueWords.has(suffix)) {
                    // 7. If Part 1(prefix) is in the word only highlight it
                    output = `<strong>${prefix}</strong>${suffix}`;
                } else if(!uniqueWords.has(prefix) && uniqueWords.has(suffix)) {
                    // 8. If Part 2(suffix) is in the word only highlight it
                    output = `${prefix}<strong>${suffix}</strong>`;
                }
            }
        }
        // 9. Return the highlighted string
        return output !=="" ? output : sw
    })
    return result.join(" ");
}
