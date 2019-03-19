/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name :    
Date : 
Contact information : 
What does this script do ? 
...
*/

// Your scripting goes here...

///////////Les graphiques inline data//////////

/////----graphique 1----/////

let divGraph = document.createElement('div');
//Création d'une nouvelle div pour le graphique à placer
divGraph.id = "graph1";
//On définition l'identifiant de la div
/*Note : pour insérer la div après le h3, il était possible de faire :
let nodeH3 = document.getElementById('Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police');
nodeH3.appendChild(divGraph);*/
document.getElementById("Crimes_et_d.C3.A9lits_enregistr.C3.A9s_par_les_services_de_police").appendChild(divGraph);
//Méthode plus courte pour insérer après le h3
let svg1 = dimple.newSvg("#graph1", 900, 580);
//Création du SVG avec une dimension donnée

//On récupère les données du tableau 1
let table1 = document.getElementsByTagName('table')[0];
console.log(table1); //Console pour vérifier

//Boucle récupérant les données complètes de chaque ligne du tableau 1
let dataTab1 = [];
console.log(dataTab1); //On vérifie avec la console
for (let i = 2; i < table1.rows.length; i++){
    dataTab1.push(table1.rows[i].getElementsByTagName('td'));

} /*Découverte du .row() (thanks MDN) qui m'évite des lignes de code inutiles:
for(...){
data = new object(table1Th[...].innerHTML, table1Td[...], }etc*/

//On stocke les données dans un nouveau tableau
let data1 = [];
console.log(data1); //Vérification de nouveau

//Nouvelle boucle pour le tableau
for(let i = 0;  i < dataTab1.length; i++){
    let number = 1;
    let date = 2002;
    for(let x = 0; x < 11; x++){ //Jusque 2012
        data1.push({
            pays : dataTab1[i][0].innerHTML,
            Crimes : dataTab1[i][number].innerHTML.replace(/:/g, "0"),
            //Replaces all : so that blah blah blah blah blah..
            date : date
        });
        number++ //On incrémente
        date++ //De même
    }
}

//Création du graphique en barres avec dimple
function chartGraph1() {
    let chart = new dimple.chart(svg1, data1);
    chart.addCategoryAxis("x", ["pays", "date"]);
    //L'axe des X
    chart.addMeasureAxis("y", "Crimes");
    //L'axe des Y
    chart.addSeries("pays", dimple.plot.bar); 
    //Graphique en barres
    chart.draw();
    //On dessine le graphique
};
chartGraph1();
console.log(chartGraph1); //Console pour vérifier que la function fonctionne

/////----graphique 2----/////

/*Même chose pour le deuxième tableau*/

let divGraph2 = document.createElement('div');
divGraph2.id = "graph2";
document.getElementById("Homicides").appendChild(divGraph2);
// On insère en dessous du h4
let svg2 = dimple.newSvg("#graph2", 900, 580);
//Création du deuxième svg

//On récupère les données du tableau 2
let table2 = document.getElementsByTagName('table')[1];
console.log(table2); //Console pour vérifier

//Boucle récupérant les données complètes de chaque ligne du tableau 2
let dataTab2 = [];
console.log(dataTab2); //On vérifie avec la console
for (let i = 1; i < table2.rows.length; i++){
    dataTab2.push(table2.rows[i].getElementsByTagName('td'));
}

let data2 = [];
for(let i =0; i < dataTab2.length; i+=3){
    data2.push({"pays":dataTab2[i], "population carcérale":dataTab2[i+1], "population carcérale2":dataTab2[i+2]});
}

//Création du graphique en barres avec dimple
function chartGraph2() {
    let chart2 = new dimple.chart(svg2, data2);
    let x = chart2.addCategoryAxis("x", "pays");
    let pc1 = chart2.addMeasureAxis("y", "population carcérale");
    let pc2 =  chart2.addMeasureAxis("y", "population carcérale2");
     chart2.addSeries("2010 - 2012", dimple.plot.bar, [x, pc1]);
     chart2.addSeries("2007 - 2009", dimple.plot.bar, [x, pc2]);
    chart2.draw();
    //On dessine le graphique
};
chartGraph2();
console.log(chartGraph2);

/////----graphique 3----/////

/////Graphique remote data/////

let divGraph3 = document.createElement('div');
//Création d'une nouvelle div en dessous du titre principal
divGraph3.id = "graph3";
//Trouver le bon endroit avec le DOM
let child = document.getElementById("bodyContent");
let parent = child.parentNode;
parent.insertBefore(divGraph3, child);

let svg3 = dimple.newSvg("#graph3", 900, 580);
//Création du svg du graphique 3 remote data

//Cette fois-ci, on importe les données via ajax
function graphique3(){
    async function getData(){
        let res = await fetch('https://inside.becode.org/api/v1/data/random.json');
    
    let data = await res.json();
    return data;
    }
    console.log(graphique3);

    getData()
    .then((data) => {
        let dataTab3 = [];
        for(let i in data){
            dataTab3.push({"année":data[i][0], "taux de criminalité":data[i][1]});
        }
        //création du graphique 3
        let chart3 = new dimple.chart(svg3,dataTab3);
        chart3.addCategoryAxis("x", "année");
        //Définition de l'axe des X
        chart3.addMeasureAxis("y", "taux de criminalité");
        //Définition de l'axe des Y
        chart3.addSeries(null, dimple.plot.bar);
        //Le graphique en barres
        chart3.draw();
        //On le dessine

        setTimeout(function(){
            chart3.svg.selectAll("*").remove();
            graphique3();
        },1000); //relance la fonction après une seconde
    })
}
graphique3();