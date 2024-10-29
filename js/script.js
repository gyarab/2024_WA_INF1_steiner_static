function strankoPrestup(param) {
    window.location.href = 'Game.html?myParam=' + encodeURIComponent(param);
}

function nacti(){
    //nacteni
    const params = new URLSearchParams(window.location.search);
    const myParam = params.get('myParam');
    if(myParam == null){
        console.log("koncim, blbe")
        return;
    }
    console.log(myParam);

    //Paprametr nalezen
    if (myParam) {
        //Znema textu pri necteni
        document.getElementById("Uz").innerText = "Zvolená úroveň je: " + myParam;
    } else {
        //Paprametr nenalezen
        document.getElementById("ErrInfo").innerText = "Parametr nebyl nalezen.";
    }

    if(myParam != null){
        if(myParam == "Lehka"){
            console.log("lehka");
            stav(9, 9, 10);
        }
        if(myParam == "Stredni"){
            console.log("stredni");
            stav(16, 16, 40);
        }
        if(myParam == "Tezka"){
            console.log("tezka");
            stav(16, 30, 99);
        }
        
    }
}

window.onload = nacti();

function stav(radky, sloupce, pocet){
    //vytvoreni pole naplnene nulami
    let bomb = pocet;
    const pole = poleVytvarec(radky, sloupce, 0);
    console.log(pole);

    while(bomb > 0){
        let radRad = Math.floor(Math.random() * radky);
        let sloRad = Math.floor(Math.random() * sloupce);
        console.log(radRad + " a " + sloRad);
        if((pole[radRad][sloRad] != 9) && (pole[radRad][sloRad] != null)){
            pole[radRad][sloRad] = 9;
            if((radRad+1 >= 0) && (sloRad >= 0) && (radRad+1 < radky) && (sloRad < sloupce)) pole[radRad+1][sloRad]++;             
            if((radRad-1 > 0) && (sloRad > 0) && (radRad-1 < radky) && (sloRad < sloupce)) pole[radRad-1][sloRad]++;
            if((radRad+1 >= 0) && (sloRad+1 >= 0) && (radRad+1 < radky) && (sloRad < sloupce+1)) pole[radRad+1][sloRad+1]++;
            if((radRad-1 >= 0) && (sloRad+1 >= 0) && (radRad-1 < radky) && (sloRad+1 < sloupce)) pole[radRad-1][sloRad+1]++;
            if((radRad+1 >= 0) && (sloRad-1 >= 0) && (radRad+1 < radky) && (sloRad-1 < sloupce)) pole[radRad+1][sloRad-1]++;
            if((radRad-1 >= 0) && (sloRad-1 >= 0) && (radRad-1 < radky) && (sloRad-1 < sloupce)) pole[radRad-1][sloRad-1]++;
            if((radRad >= 0) && (sloRad+1 >= 0) && (radRad < radky) && (sloRad+1 < sloupce)) pole[radRad][sloRad+1]++;
            if((radRad >= 0) && (sloRad-1 >= 0) && (sloRad+1 >= 0) && (radRad < radky) && (sloRad-1 < sloupce)) pole[radRad][sloRad-1]++;
            bomb--;
        }
    }

    vystav(radky, sloupce, pole);

}

/*
function vystav(radky, sloupce, pole) {
    //element tabulka
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";

    for (let i = 0; i < radky; i++) {
        const row = document.createElement("tr"); // Vytvoří nový řádek
        for (let j = 0; j < sloupce; j++) {
            const cell = document.createElement("td"); // Vytvoří buňku
            cell.style.border = "1px solid black";
            cell.style.padding = "10px";
            //if(pole[i][j]==1){
                //add https://www.w3schools.com/howto/howto_css_shake_image.asp
                //createFlipBox("img_paris.jpg", "Paris", "What an amazing city");
                //cell.appendChild(flipBox)
            //}
            cell.textContent = `Řádek ${i + 1}, Sloupec ${j + 1}`;
            //cell.textContent = `Řádek ${i + 1}, Sloupec ${j + 1}`; // Nastaví text buňky
            row.appendChild(cell); // Přidá buňku do řádku
        }
        table.appendChild(row); // Přidá řádek do tabulky
    }

    // Přidá tabulku do kontejneru na stránce
    document.getElementById("ErrInfo").appendChild(table);
    //document.getElementById("tableContainer").appendChild(table);
}
*/

function vystav(radky, sloupce, pole) {
    //element tabulka
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";

    for (let i = 0; i < radky; i++) {
        const row = document.createElement("tr"); // Vytvoří nový řádek
        for (let j = 0; j < sloupce; j++) {
            const cell = document.createElement("td"); // Vytvoří buňku
            cell.style.border = "1px solid black";
            cell.style.padding = "10px";

            // Vytvoří obrázek a nastaví jeho vlastnosti
            const img = document.createElement("img");
            img.src = "img/Bomb.png"; // Nahraďte URL_OBRÁZKU skutečnou URL
            img.alt = `Řádek ${i + 1}, Sloupec ${j + 1}`;
            img.style.width = "50px"; // Nastaví šířku obrázku
            img.style.height = "50px"; // Nastaví výšku obrázku

            // Přidá obrázek do buňky
            cell.appendChild(img);

            row.appendChild(cell); // Přidá buňku do řádku
        }
        table.appendChild(row); // Přidá řádek do tabulky
    }

    // Přidá tabulku do kontejneru na stránce
    document.getElementById("ErrInfo").appendChild(table);
}

// Zavolá funkci pro vytvoření tabulky 4x3


function poleVytvarec(radky, sloupce, naplnene = 0) {
    const array = new Array(radky);

    for (let i = 0; i < radky; i++) {
        array[i] = new Array(sloupce).fill(naplnene);
    }

    return array;
}

function napisZpravu(){
    let den = Date();   //definovany u promennych
    const x = 2;
    document.getElementById('ZZ').innerHTML = 'Hello JavaScript!';
    console.log("klikl: " + den + ", a zavolal tlacitko no." + x);
}

function KocS(){
    let den = Date();
    const x = 3;
    document.getElementById('myImage').src='img/CatS.jpg'
    document.getElementById('myImage').style.border = "5px solid rgb(5, 58, 5)"; 
    console.log("klikl: " + den + ", a zavolal tlacitko no." + x);
}

function KocH(){
    let den = Date();
    const x = 4;
    document.getElementById('myImage').src='img/CatH.jpg'
    document.getElementById('myImage').style.border = "5px solid rgb(255, 0, 0)"; 
    console.log("klikl: " + den + ", a zavolal tlacitko no." + x);
}
