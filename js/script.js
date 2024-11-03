var pulbPole = [];
var odkryto = [];
var vlajecka = [];
var sirka;
var vyska;


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
            sirka = 8;
            vyska = 8;
        }
        if(myParam == "Stredni"){
            console.log("stredni");
            stav(16, 16, 40);
            sirka = 15;
            vyska = 15;
        }
        if(myParam == "Tezka"){
            console.log("tezka");
            stav(16, 30, 99);
            sirka = 29;
            vyska = 15;
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
            pole[radRad][sloRad] += 9;
            if((radRad+1 >= 0) && (sloRad >= 0) && (radRad+1 < radky) && (sloRad < sloupce)) pole[radRad+1][sloRad]++;             
            if((radRad-1 >= 0) && (sloRad >= 0) && (radRad-1 < radky) && (sloRad < sloupce)) pole[radRad-1][sloRad]++;
            if((radRad+1 >= 0) && (sloRad+1 >= 0) && (radRad+1 < radky) && (sloRad < sloupce+1)) pole[radRad+1][sloRad+1]++;
            if((radRad-1 >= 0) && (sloRad+1 >= 0) && (radRad-1 < radky) && (sloRad+1 < sloupce)) pole[radRad-1][sloRad+1]++;
            if((radRad+1 >= 0) && (sloRad-1 >= 0) && (radRad+1 < radky) && (sloRad-1 < sloupce)) pole[radRad+1][sloRad-1]++;
            if((radRad-1 >= 0) && (sloRad-1 >= 0) && (radRad-1 < radky) && (sloRad-1 < sloupce)) pole[radRad-1][sloRad-1]++;
            if((radRad >= 0) && (sloRad+1 >= 0) && (radRad < radky) && (sloRad+1 < sloupce)) pole[radRad][sloRad+1]++;
            if((radRad >= 0) && (sloRad-1 >= 0) && (sloRad+1 >= 0) && (radRad < radky) && (sloRad-1 < sloupce)) pole[radRad][sloRad-1]++;
            bomb--;
        }
    }

    pulbPole = pole;
    vystav(radky, sloupce, pole);

}

function vystav(radky, sloupce, pole) {
    //element tabulka
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";

    for (let i = 0; i < radky; i++) {
        const row = document.createElement("tr"); // Vytvoří nový řádek
        for (let j = 0; j < sloupce; j++) {
            const cell = document.createElement("td"); // Vytvoří buňku
            const img = document.createElement("img");
            cell.style.border = "0px solid black";
            cell.style.padding = "2px";

            console.log(pole[i][j])

            if(pole[i][j] == 0){
                // Vytvoří obrázek a nastaví jeho vlastnosti
                cell.appendChild(flipoTvor("ZBomb", i, j));
                row.appendChild(cell);
            } else

            if((pole[i][j] > 0) && (pole[i][j] < 9)){
                // Vytvoří obrázek a nastaví jeho vlastnosti
                let index = pole[i][j];
                cell.appendChild(flipoTvor(index + "Bomb", i, j));
                row.appendChild(cell);
            }

            if(pole[i][j] >= 9){
                // Vytvoří obrázek a nastaví jeho vlastnosti
                cell.appendChild(flipoTvor("Bomb", i, j));
                row.appendChild(cell);
            }
            //https://stackoverflow.com/questions/59927377/how-to-flip-image-on-click-in-javascript
        }
        table.appendChild(row); // Přidá řádek do tabulky
    }

    // Přidá tabulku do kontejneru na stránce
    document.getElementById("ErrInfo").appendChild(table);
}

function flipoTvor(druh, i, j){
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';

    // Vytvoření vnitřního kontejneru
    const flipCardInner = document.createElement('div');
    flipCardInner.className = 'flip-card-inner';

    // Přední strana karty
    const flipCardFront = document.createElement('div');
    flipCardFront.className = 'flip-card-front';

    // Přidání event listeneru pro kliknutí
    flipCard.addEventListener('click', function handleClick(event) {
        flipCardInner.classList.add('flipped');
        // Odebrání event listeneru po prvním kliknutí
        flipCard.removeEventListener('click', handleClick);
    });
    

    const img = document.createElement('img');
    img.src = 'img/Unknowpoint.png';
    img.alt = 'Neznamo';
    img.id = i + ' + ' + j;
    img.style.width = '50px';
    img.style.height = '50px';

    flipCardFront.appendChild(img);

    // Zadní strana karty
    const flipCardBack = document.createElement('div');
    flipCardFront.className = 'flip-card-front';

    const imgH = document.createElement('img');
    imgH.src = 'img/'+ druh +'.png';
    imgH.alt = druh;
    imgH.id = i + ' + ' + j;
    imgH.style.width = '50px';
    imgH.style.height = '50px';

    flipCardBack.appendChild(imgH);
    // Sestavení karty
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    // Přidání flip karty do těla dokumentu
    return flipCard;
}

document.addEventListener("contextmenu", function(event) {
    if (event.target.tagName === 'IMG') {
        // Získáme ID obrázku
        const pozice = event.target.id;
        if(!vlajecka.includes(pozice)){
            vlajecka.push(pozice);
        }
        
        console.log(vlajecka);

        console.log(pozice);
        const delidlo = pozice.split(" ");
        let i = delidlo[0];
        let j = delidlo[2];

        // Změníme zdroj obrázku na nový obrázek
        document.getElementById(i + ' + ' + j).src = "img/Marker.png";
        
        // Zamezíme výchozímu kontextovému menu
        event.preventDefault();
    }
});

document.addEventListener("contextmenu", function(event) {
    if (event.ctrlKey && event.target.tagName === 'IMG') {
        // Získáme ID obrázku
        const pozice = event.target.id;
        vlajecka = vlajecka.filter(function(item) {
            return item !== pozice
        })

        console.log(vlajecka);

        console.log(pozice);
        const delidlo = pozice.split(" ");
        let i = delidlo[0];
        let j = delidlo[2];

        // Přepínání obrázku mezi původním a novým
        document.getElementById(i + ' + ' + j).src = "img/Unknowpoint.png";
        
        // Zamezíme výchozímu kontextovému menu
        event.preventDefault();
    }
});

function changeImage() {
    // Zde definujte cestu k novému obrázku
    return "img/Marker.png"; // Změňte na skutečnou cestu k obrázku
}

document.addEventListener('click', function(event) {
    // Zkontrolujeme, zda bylo kliknuto na obrázek
    if (event.target.tagName === 'IMG') {
        // Získáme ID obrázku
        const pozice = event.target.id;
        odkryto.push(pozice);

        console.log(pozice);
        const delidlo = pozice.split(" ");
        let i = delidlo[0];
        let j = delidlo[2];

        if(pulbPole[i][j] < 1){
            console.log("mám " + pulbPole[i][j] + " a volnost!");
            odkryvac(i, j);

        }

        if(pulbPole[i][j] > 8){
            console.log("mám " + pulbPole[i][j] + " a Bombu!");
        }
        
    }
});

function odkryvac(i, j){
    let lokal = pulbPole[i][j];

    let forward = i - 1;
    let down = i - 0 + 1;
    let right = j - 0 + 1;
    let left = j - 0 - 1;

    var nahoru = -1;
    var dolu = -1;
    var leva = -1;
    var prava = -1;

    console.log(i + " + " + j + "; " + forward + "-" + j + " + " + down + "-" + j + " + " + i + "-" + right + " + " + i + "-" + left);
    if((forward != null)&&(forward > -1)&&(forward < vyska)) {nahoru = pulbPole[forward][j];} //neumyslny hack
    if((down != null)&&(down > -1)&&(down < vyska)) {dolu = pulbPole[down][j];}
    if((left != null)&&(left > -1)&&(left < sirka)) {leva = pulbPole[i][left];} //neumyslny hack
    if((right != null)&&(right > -1)&&(right < sirka)) {prava = pulbPole[i][right];} //neumyslny hack

    if((nahoru == 0)||((lokal == 0)&&(nahoru != -1)&&(nahoru < vyska))){
        console.log(nahoru);
        document.getElementById(forward + ' + ' + j).click();
    }

    if((dolu == 0)||((lokal == 0)&&(dolu != -1)&&(dolu < vyska))){
        console.log(nahoru);
        document.getElementById(down + ' + ' + j).click();
    }

    if((leva == 0)||((lokal == 0)&&(leva != -1)&&(leva < sirka))){
        console.log(leva);
        document.getElementById(i + ' + ' + left).click();
    }

    if((prava == 0)||((lokal == 0)&&(prava != -1)&&(prava < sirka))){
        console.log(prava);
        document.getElementById(i + ' + ' + right).click();
    }
}

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
