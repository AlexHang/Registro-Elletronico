const storage = window.localStorage;
//storage.clear();
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

//window.alert(JSON.stringify(tabel));

var app = angular.module("anagrafiche", []);
app.controller("anagrafiche_ctrl", function ($scope) {
    $scope.tabel = tabel;

    $scope.reset = function () {
        $scope.nume = undefined;
        $scope.nume_edit = undefined;
        $scope.prenume = undefined;
        $scope.prenume_edit = undefined;
        $scope.date1 = undefined;
        $scope.date1_edit = undefined;
        $scope.telefon = undefined;
        $scope.telefon_edit = undefined;
        $scope.email = undefined;
        $scope.email_edit = undefined;
        $scope.note = undefined;
        $scope.note_edit = undefined;

    };


    $scope.add_copil = function () {
        $scope.aux = {
            "render": true,
            //"id": index_add() ,
            "nume": $scope.nume,
            "prenume": $scope.prenume,
            "data": $scope.date1, //$scope.date1,
            "telefon": $scope.telefon,
            "email": $scope.email,
            "note": $scope.note,
        };

        $scope.tabel["elevi"].push($scope.aux);
        tabel = $scope.tabel;
        save(tabel);
        $scope.reset();
        
    };

    $scope.edit_copil = function (index) {
        // window.alert(index);
        let aux = tabel["elevi"][index];
        $scope.nume_edit = aux["nume"];
        $scope.prenume_edit = aux["prenume"];
        $scope.date1_edit = new Date(aux["data"]);
        $scope.telefon_edit = aux["telefon"];
        $scope.email_edit = aux["email"];
        $scope.note_edit = aux["note"];
        i = index;
    };

    $scope.edit_save_copil = function () {
        $scope.tabel["elevi"][i]["nume"] = $scope.nume_edit;
        $scope.tabel["elevi"][i]["prenume"] = $scope.prenume_edit;
        $scope.tabel["elevi"][i]["data"] = $scope.date1_edit;
        $scope.tabel["elevi"][i]["telefon"] = $scope.telefon_edit;
        $scope.tabel["elevi"][i]["email"] = $scope.email_edit;
        $scope.tabel["elevi"][i]["note"] = $scope.note_edit;
        tabel = $scope.tabel;
        save(tabel);
        $scope.reset();
    };

    $scope.delete_kid = function () {
        $scope.tabel["elevi"].splice(i, 1);
        tabel = $scope.tabel;
        save(tabel);
        $scope.reset();
    };

});