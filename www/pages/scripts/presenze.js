const storage = window.localStorage;
//let ind_order = storage.getItem("index") || 0;
let value = storage.getItem("db");
var i;
let tabel = JSON.parse(value) || {
    "elevi": [],
    "prezente": [],
};

//window.alert(JSON.stringify(tabel));
/*
function index_add() {
    ind_order = ind_order + 1;
    storage.setItem("index", ind_order);
    return ind_order;
};
*/
function save(x) {
    var tabel_JSON = JSON.stringify(x);
    storage.setItem("db", tabel_JSON);
};
var app = angular.module("presenze", []);
app.controller("presenze_ctrl", function ($scope) {
    $scope.tabel = tabel;

    $scope.adauga_ziua = function () {
        let result = {
            "Studenti": [],
            "date": $scope.date,
        };
        let aux;
        for (var i = 0; i < tabel["elevi"].length; i++) {
            result["Studenti"].push({ "Student": tabel["elevi"][i], "prezent": false, "mancat": false });

        };
        //result.push({ "date":  })
        //window.alert(JSON.stringify(result));
        $scope.pres = result;
    };

    $scope.cauta_data = function () {
        $scope.date = $scope.day + '/' + $scope.month + '/' + $scope.year;
        let x = $scope.date;
        let result = {
            "Studenti": [],
            "date": $scope.date,
        };;
        let counter = 0;
        if ($scope.tabel["prezente"].length > 0) {
            for (var i = 0; i < $scope.tabel["prezente"].length; i++) {
               // alert(JSON.stringify($scope.tabel["prezente"][i]));
                if ($scope.tabel["prezente"][i]["date"] == x) {
                    result = $scope.tabel["prezente"][i];
                    counter++;
                }
            }
        }
        if (counter == 0) {
            $scope.adauga_ziua();
            $scope.mesaj = "Add Day";
           // window.alert("new");
        }
        else{
            //return result;
            $scope.pres = result;
            //window.alert(JSON.stringify($scope.pres));
            $scope.mesaj = "Edit Day";
           // window.alert("yes");
        }
    };

    $scope.save_date = function () {

       // alert(JSON.stringify($scope.pres));
        let x = $scope.date;
        let counter = 0;
        let ind;
        if ($scope.tabel["prezente"].length > 0) {
            for (var i = 0; i < $scope.tabel["prezente"].length; i++) {
                if ($scope.tabel["prezente"][i]["date"] == x) {
                    counter++;
                    ind = i;
                }
            }
        }
        if (counter != 0) {
            $scope.tabel["prezente"][ind] = $scope.pres;
            window.alert("saved as existing");
        }
        else {
            $scope.tabel["prezente"].push($scope.pres);
            window.alert("saved as new");
        }
        tabel = $scope.tabel;
        save(tabel);
    };


});

