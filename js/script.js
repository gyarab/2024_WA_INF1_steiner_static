var pulbPole = [];
var odkryto = [];
var vlajecka = [];
var bombPole1 = [];
var bombPole2 = [];
var bombPole3 = [];
var pracuj = true;
var first = false;
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
            sirka = 9;
            vyska = 9;
        }
        if(myParam == "Stredni"){
            console.log("stredni");
            stav(16, 16, 40);
            sirka = 16;
            vyska = 16;
        }
        if(myParam == "Tezka"){
            console.log("tezka");
            stav(16, 30, 300);
            sirka = 30;
            vyska = 16;
        }
        
    }
}

window.onload = nacti();

//hlavni tabulka
//zde je chyba
function stav(radky, sloupce, pocet){
    let bomb = pocet;
    console.log(bomb);
    let pole = [];

    if(first){
        pole = Array.from(pulbPole);
        console.log(pulbPole);
        console.log(pole);
    }

    //pokud stavim znova, tak to obejdu
    if(!first){
    //vytvoreni pole naplnene nulami
    pole = poleVytvarec(radky, sloupce, 0);
    console.log(pole);
    }   

    while(bomb > 0){
        let radRad = Math.floor(Math.random() * radky);
        let sloRad = Math.floor(Math.random() * sloupce);
        console.log(radRad + " a " + sloRad);
        console.log(pole[radRad][sloRad]);
        if((pole[radRad][sloRad] < 9) && (pole[radRad][sloRad] != null)){
            pole[radRad][sloRad] += 9;
            if((bombPole1.length + bombPole2.length + bombPole3.length) < 41) bombPole1.push(radRad + " + " + sloRad);
            if(((bombPole1.length + bombPole2.length + bombPole3.length) > 40) && ((bombPole1.length + bombPole2.length + bombPole3.length) < 81)) bombPole2.push(radRad + " + " + sloRad);
            if((bombPole1.length + bombPole2.length + bombPole3.length) > 80) bombPole3.push(radRad + " + " + sloRad);
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

    pulbPole = Array.from(pole);
    console.log("dojto")
    vystav(radky, sloupce, pole);
    console.log("vystaveno");
    
}

//vystavi tabuklu z pole
function vystav(radky, sloupce, pole) {
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    const errInfoElement = document.getElementById("ErrInfo");
    const existingTable = errInfoElement.querySelector("table");

    for (let i = 0; i < radky; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < sloupce; j++) {
            const cell = document.createElement("td"); 
            const img = document.createElement("img");
            cell.style.border = "0px solid black";
            cell.style.padding = "2px";

            console.log(pole[i][j])

            if(pole[i][j] == 0){
                cell.appendChild(flipoTvor("ZBomb", i, j));
                row.appendChild(cell);
            } else

            if((pole[i][j] > 0) && (pole[i][j] < 9)){
                let index = pole[i][j];
                cell.appendChild(flipoTvor(index + "Bomb", i, j));
                row.appendChild(cell);
            }

            if(pole[i][j] >= 9){
                cell.appendChild(flipoTvor("Bomb", i, j));
                row.appendChild(cell);
            }
            //https://stackoverflow.com/questions/59927377/how-to-flip-image-on-click-in-javascript
        }
        table.appendChild(row);
    }

    //pridej do stranky
        // Pokud již existuje `table` uvnitř `ErrInfo`, odstraní se
        if (existingTable) {
            errInfoElement.removeChild(existingTable);
            }
        
        // Nyní přidáme nový `table`
        errInfoElement.appendChild(table);
}

//otoceni policka
function flipoTvor(druh, i, j){
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';

    const flipCardInner = document.createElement('div');
    flipCardInner.className = 'flip-card-inner';

    const flipCardFront = document.createElement('div');
    flipCardFront.className = 'flip-card-front';

    //otoceni
    flipCard.addEventListener('click', function handleClick(event) {
        flipCardInner.classList.add('flipped');
        flipCard.removeEventListener('click', handleClick);
    });
    
    //predni cast
    const img = document.createElement('img');
    img.src = 'img/Unknowpoint.png';
    img.alt = 'Neznamo';
    img.id = i + ' + ' + j;
    img.style.width = '50px';
    img.style.height = '50px';

    flipCardFront.appendChild(img);

    //zadni cast
    const flipCardBack = document.createElement('div');
    flipCardFront.className = 'flip-card-front';

    const imgH = document.createElement('img');
    imgH.src = 'img/'+ druh +'.png';
    imgH.alt = druh;
    imgH.id = i + ' + ' + j;
    imgH.style.width = '50px';
    imgH.style.height = '50px';

    flipCardBack.appendChild(imgH);
    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);
    flipCard.appendChild(flipCardInner);

    return flipCard;
}

//vlajeckovani
document.addEventListener("contextmenu", function(event) {
    if (event.target.tagName === 'IMG') {

        const pozice = event.target.id;
        //pridej jen jednou 
        if(!vlajecka.includes(pozice)){
            vlajecka.push(pozice);
        }
        
        console.log(vlajecka);

        console.log(pozice);
        const delidlo = pozice.split(" ");
        let i = delidlo[0];
        let j = delidlo[2];

        document.getElementById(i + ' + ' + j).src = "img/Marker.png";
        
        event.preventDefault();
    }
});

//odvlajeckovani
document.addEventListener("contextmenu", function(event) {
    if (event.ctrlKey && event.target.tagName === 'IMG') {

        const pozice = event.target.id;
        //odendani vlajecky
        vlajecka = vlajecka.filter(function(item) {
            return item !== pozice
        })

        console.log(vlajecka);

        console.log(pozice);
        const delidlo = pozice.split(" ");
        let i = delidlo[0];
        let j = delidlo[2];

        document.getElementById(i + ' + ' + j).src = "img/Unknowpoint.png";
        
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
        console.log("klikam");
        // Získáme ID obrázku
        const pozice = event.target.id;

        console.log(pozice);
        const delidlo = pozice.split(" ");
        let i = delidlo[0];
        let j = delidlo[2];

        //kotrola vyhry
        console.log("kotrola vyhry: " + (vyska*sirka) + " == " + (odkryto.length + vlajecka.length) + " && " + vlajecka.length + " == " + bombPole1.length + bombPole2.length + bombPole3.length);
        if((vyska*sirka) == ((odkryto.length + vlajecka.length)) && (vlajecka.lengt == (bombPole1.length + bombPole2.length + bombPole3.length))){
            console.log("---vyhra!---");
        }

        console.log(pulbPole[i][j]);
        if((pulbPole[i][j] < 1)&&(!odkryto.includes(pozice))){
            console.log("mám " + pulbPole[i][j] + " a volnost!");
            odkryvac(i, j);

        }

        if((pulbPole[i][j] > 8)&&(!odkryto.includes(pozice)&&(pracuj))){
            //osetreni prvni hry
            console.log("predmetoduji")
            if(!first){
                first = true;

                console.log("Metoduji");
                let pracPole = Array.from(pulbPole);
                console.log(pulbPole);
                alert(pulbPole);
                pracPole[i][j] = pracPole[i][j]-9;
                console.log(pracPole);
                console.log("momenalně je na pracovím poli: " + pracPole[i][j]);
                if(i != 0) pracPole[i-1][j] = pracPole[i-1][j]-1;
                if(j != 0) pracPole[i][j-1]  = pracPole[i][j-1]-1;
                if((i != 0) && (j != 0)) pracPole[i-1][j-1]  = pracPole[i-1][j-1]-1;
                if(i != vyska) pracPole[i-0+1][j] = pracPole[i-0+1][j]-1;
                if(j != sirka) pracPole[i][j-0+1] = pracPole[i][j-0+1]-1;
                if((i != vyska) && (j != sirka)) pracPole[i-0+1][j+1]  = pracPole[i-0+1][j-0+1]-1;
                if((i != 0) && (j != sirka)) pracPole[i-1][j-0+1] = pracPole[i-1][j-0+1]-1;
                if((i != vyska) && (j != 0)) pracPole[i-0+1][j-1]  = pracPole[i-0+1][j-1]-1;

                console.log(pracPole);

                pulbPole = Array.from(pracPole);

                console.log(bombPole1.length+bombPole2.length+bombPole3.length+1);

                stav(vyska, sirka, 1);

                document.getElementById(pozice).click();


            }else{
            
            //hormadna detonace
            pracuj = false;
            console.log("mám " + pulbPole[i][j] + " a Bombu!");
            while((bombPole1.length + bombPole2.length + bombPole3.length) > 0){
                if(bombPole3.length > 0){
                    let poziceBomby = bombPole3[length];
                    bombPole3 = bombPole3.filter(function(item) {
                        return item !== poziceBomby;
                    })
                    console.log(bombPole3);
                    console.log("vybuch na miste:" + poziceBomby);
                    document.getElementById(poziceBomby).click();
                }
                if(bombPole2.length > 0){
                    let poziceBomby = bombPole2[length];
                    bombPole2 = bombPole2.filter(function(item) {
                        return item !== poziceBomby;
                    })
                    console.log(bombPole2);
                    console.log("vybuch na miste:" + poziceBomby);
                    document.getElementById(poziceBomby).click();
                }
                if(bombPole1.length > 0){
                    let poziceBomby = bombPole1[length];
                    bombPole1 = bombPole1.filter(function(item) {
                        return item !== poziceBomby;
                    })
                    console.log(bombPole1);
                    console.log("vybuch na miste:" + poziceBomby);
                    document.getElementById(poziceBomby).click();
                }
                
            }

            //konec hry
            console.log("---Prohra!---");
        }
        }

        first = true;
        odkryto.push(pozice);
        
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
