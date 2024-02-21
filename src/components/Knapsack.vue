
<template>
<body>
    <div class="text-center page-header">
        <h1>Knapsack</h1>
        <h3><small>Given a set of items, each with a weight and a value. <br> <strong>Knapsack algorithm</strong> determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. <br> Whereas in <strong>Knapsack 0-1 algorithm</strong> items cannot be divided which means either should take the item as a whole or should leave it.</small></h3>
    </div>

    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-shopping-cart"></span>
                    </div>
                    <input class="form-control" id="capacity" type="number" placeholder="Enter Knapsack Capacity">
                </div>

            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-th-list"></span>
                    </div>
                    <input class="form-control" id="rows" type="number" placeholder="Enter number of Items" />
                </div>
            </div>
        </div>


        <div class="text-center">
            <button type="button" class="generateTable btn btn-primary" v-on:click="createTable();">Generate Table</button>
        </div>


        <div class="table" id="wrapper"></div>

        <div class="text-center">
            <button type="button" class="generateResult btn btn-success" v-on:click="generateResult();">Calculate</button>
        </div>

    </div>


    <hr>


    <div class="container text-center">

        <div class="result">

            <!-- <div class="resultContainer col-md-6">

                <h1>Knapsack</h1>
                <h4>Resultant Profit</h4>
                <h2 id="kpResultantProfit"></h2>
                <h4>Density</h4>
                <h2 id="kpProfitWeight"></h2>
                <h4>Profit</h4>
                <h2 id="kpProfit"></h2>
                <h4>Weight</h4>
                <h2 id="kpWeight"></h2>
                <h4>Resultant Solution</h4>
                <h2 id="kpResultantSolution"></h2>
            </div> -->


            <div class="resultContainer col-md-6">

                <h1>Knapsack 0-1</h1>
                <h4>Resultant Table</h4>
                <div id="knapsackTable"></div>
                <h4>Resultant Profit</h4>
                <h2 id="kp01ResultantProfit"></h2>
                <h4>Profit</h4>
                <h2 id="kp01Profit"></h2>
                <h4>Weight</h4>
                <h2 id="kp01Weight"></h2>
                <h4>Resultant Solution</h4>
                <h2 id="kp01ResultantSolution"></h2>
            </div>

        </div>

    </div>
    </body>
</template>


<script>
import axios from 'axios';

export default {
    data() {
    return {};
  },
  components:{},
  methods: {
    addBook(payload) {
      const path = 'http://127.0.0.1:5000/books';
      axios.post(path, payload)
        .then(() => {
          this.getBooks();
          this.message = 'Book added!';
          this.showMessage = true;
        })
        .catch((error) => {

          console.log(error);
          this.getBooks();
        });
    },
    createTable() {
        const numOfObjects = document.getElementById('rows').value;
        var tableHeader = '<table class="table table-bordered" id="table"> <tr><th scope="col">Items</th> <th scope="col">Profit</th> <th scope="col">Weight</th></tr>';
        var tableBody = '';

        for (var i = 0; i < numOfObjects; i++) {

            tableBody += '<tbody><tr>';
            tableBody += '<td>';
            tableBody += 'Item ' + i;
            tableBody += '</td>';
            for (var j = 0; j < 2; j++) {
                tableBody += '<td>';
                tableBody += '<input type="number" class="form-control" placeholder="Value"/>';
                tableBody += '</td>';
            }
            tableBody += '</tr></tbody>\n';
        }
        var tableFooter = '</table>';
        document.getElementById('wrapper').innerHTML = tableHeader + tableBody + tableFooter;
    },
    generateResult() {
    
        const knapsackCapacity = document.getElementById('capacity').value;
        const numOfObjects = document.getElementById('rows').value;
        
        const profitArr = [];
        const weightArr = [];

        // Variables for storing values taken from user; before adding them to the profit and weight arrays.
        var weightValue, profitValue;

        var resultClass = document.getElementsByClassName("result");
        console.log(resultClass.length);
        
        for (var i = 0; i < resultClass.length; i++) {
            resultClass[i].style.visibility = "visible";
        }

        var tableId = document.getElementById("table")
        for (var i = 1; i <= numOfObjects; i++) {
            profitValue = parseInt(tableId.rows[i].cells[1].children[0].value);
            profitArr.push(profitValue);
            
            weightValue = parseInt(tableId.rows[i].cells[2].children[0].value);
            weightArr.push(weightValue);
        }

        this.knapsack01Algorithm(knapsackCapacity, profitArr, weightArr, numOfObjects);
        
        this.knapsackAlgorithm(knapsackCapacity, profitArr, weightArr, numOfObjects);

    },
    sortLists(densityArr, profitArr, weightArr, numOfObjects) {

    // Loop for initializing density values.
    for (var i = 0; i < numOfObjects; i++) {
        
        // For detecting integer densities.
        if(Number.isInteger( profitArr[i] / weightArr[i] )) {
            densityArr[i] = Math.round(profitArr[i] / weightArr[i]);
            continue;
        }
        densityArr[i] = (profitArr[i] / weightArr[i]).toFixed(2);
        
    }       

    // to sort density in decreasing order along with profit and weight list
    var list = [];
    for (var i = 0; i < numOfObjects; i++)
        list.push({ 'density': densityArr[i], 'profit': profitArr[i], 'weight': weightArr[i] });


    list.sort(function (a, b) {
        return ((a.density > b.density) ? -1 : ((a.density == b.density) ? 0 : 1));
    });

    for (var i = 0; i < numOfObjects; i++) {
        densityArr[i] = list[i].density;
        profitArr[i] = list[i].profit;
        weightArr[i] = list[i].weight;
    }
    },
    knapsackAlgorithm(knapsackCapacity, profitArr, weightArr, numOfObjects) {


    // An array for storing the densities of the objects.
    const densityArr = [];
    this.sortLists(densityArr, profitArr, weightArr, numOfObjects);

    // A variable for storing the resultant profit of the knapsack; initialized with 0.
    var knapsackResultantProfit = 0;


    // An array for storing the solution of the problem
    const kpResultantSolutionArr = [];


    const kpResultantProfitId = document.getElementById("kpResultantProfit");
    const kpProfitId = document.getElementById("kpProfit");
    const kpWeightId = document.getElementById("kpWeight");
    const kpProfitWeightId = document.getElementById("kpProfitWeight");
    const kpResultantSolutionId = document.getElementById("kpResultantSolution");

    for (var i = 0; i < numOfObjects; i++) {
        if (weightArr[i] <= knapsackCapacity) {
            knapsackCapacity -= weightArr[i];
            knapsackResultantProfit += profitArr[i];
            kpResultantSolutionArr[i] = 1;
        }
        else if(knapsackCapacity != 0) {
            knapsackResultantProfit = knapsackResultantProfit + (profitArr[i] * (knapsackCapacity / weightArr[i]));
            kpResultantSolutionArr[i] = knapsackCapacity + "/" + weightArr[i];
            knapsackCapacity = 0;
        }
        else {
            kpResultantSolutionArr[i] = 0;
        }
    }

    console.log("profit = " + profitArr);
    console.log("weight = " + weightArr);
    console.log("density = " + densityArr);

    console.log(knapsackResultantProfit);

    kpResultantProfitId.innerHTML = parseFloat(knapsackResultantProfit.toFixed(2));
    kpProfitId.innerHTML = profitArr;
    kpWeightId.innerHTML = weightArr;
    kpProfitWeightId.innerHTML = densityArr;
    kpResultantSolutionId.innerHTML = kpResultantSolutionArr;
},
find01Solution(objToSelect, capLeft, solutionArr, table, numOfObjects, profitArr, weightArr) {
    // The base case will be reached in any scenario because the 0th row is initialized with 0 values.
    if( objToSelect == 0 ) {
        return;
    }

    // The current object is not selected.
    if(table[objToSelect][capLeft] == table[objToSelect - 1][capLeft]) {
        solutionArr[objToSelect - 1] = 0;
        this.find01Solution(objToSelect - 1, capLeft, solutionArr, table, numOfObjects, profitArr, weightArr);
    }
    else if(capLeft >= weightArr[objToSelect - 1]) {
        // The current object is selected.
        if( table[objToSelect][capLeft] == (table[objToSelect - 1][capLeft - weightArr[objToSelect - 1]] + profitArr[objToSelect - 1]) ) {
            solutionArr[objToSelect - 1] = 1;
            this.find01Solution(objToSelect - 1, capLeft - weightArr[objToSelect - 1], solutionArr, table, numOfObjects, profitArr, weightArr);
        }
    }
},
knapsack01Algorithm(knapsackCapacity, profitArr, weightArr, numOfObjects) {

const kp01ResultantProfitId = document.getElementById("kp01ResultantProfit");
const kp01ProfitId = document.getElementById("kp01Profit");
const kp01WeightId = document.getElementById("kp01Weight");
const kp01ResultantSolutionId = document.getElementById("kp01ResultantSolution");

var knapsackTable = new Array(numOfObjects + 1);

for (objConsidered = 0; objConsidered <= numOfObjects; objConsidered++) {

    knapsackTable[objConsidered] = Array(knapsackCapacity + 1);
    for (capConsidered = 0; capConsidered <= knapsackCapacity; capConsidered++) {
        knapsackTable[objConsidered][capConsidered] = 0;
    }
}

const tableHeader = '<table class="table table-bordered">';
var tableBody = '';

for (var objConsidered = 0; objConsidered <= numOfObjects; objConsidered++) {
    for (var capConsidered = 0; capConsidered <= knapsackCapacity; capConsidered++) {
        
        if(objConsidered == 0) {
            continue;
        }

        if (weightArr[objConsidered - 1] <= capConsidered) {
            knapsackTable[objConsidered][capConsidered] = 
            (Math.max(
                knapsackTable[objConsidered - 1][capConsidered], 
                knapsackTable[objConsidered - 1][capConsidered - weightArr[objConsidered - 1]] + profitArr[objConsidered - 1]));
            tableBody += '<td>';
            tableBody += knapsackTable[objConsidered][capConsidered];
            tableBody += '</td>'
        }
        else {
            knapsackTable[objConsidered][capConsidered] = knapsackTable[objConsidered - 1][capConsidered]
            tableBody += '<td>';
            tableBody += knapsackTable[objConsidered][capConsidered];
            tableBody += '</td>'
        }
    }
    tableBody += '</tr></tbody>\n';
}

const tableFooter = '</table>';
document.getElementById('knapsackTable').innerHTML = tableHeader + tableBody + tableFooter;

// console.log(knapsackTable);
// console.log(knapsackTable[numOfObjects][knapsackCapacity]);

var solutionArr = [];
for(let i = 0; i < numOfObjects; i++) {
    solutionArr.push(0);
}
this.find01Solution(parseInt(numOfObjects), parseInt(knapsackCapacity), solutionArr, knapsackTable, parseInt(numOfObjects), profitArr, weightArr);


kp01ResultantProfitId.innerHTML = knapsackTable[numOfObjects][knapsackCapacity];
kp01ProfitId.innerHTML = profitArr;
kp01WeightId.innerHTML = weightArr;
kp01ResultantSolutionId.innerHTML = solutionArr;
}


  },
  created() {},
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */

body {
    margin: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.resultContainer {
    margin-top: 38px;
}

.generateTable {
    margin-top: 16px;
}

.input-group{
    margin-top: 8px;
}

#table {
    margin-top: 16px;
}

h1{
    font-weight: bolder;
    /* color: rgb(112, 112, 112); */
}

h4 {
    margin-top: 48px;
    color: darkgray;
}

h2{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 38px;
    font-weight: bolder;
    color: rgb(90, 113, 128);
}

.result {
    margin-top: 12px;
    visibility: hidden;
}

#knapsackTable{
    font-weight: bold;
    color: rgb(90, 113, 128);
}
</style>
