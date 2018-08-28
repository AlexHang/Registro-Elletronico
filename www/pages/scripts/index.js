M.AutoInit();
var storage = window.localStorage;
//var value = storage.getItem(key);  Pass a key name to get its value.
/*
let tabel = [
    {
        "name": "Gica",
        "ore": 12,
        "data":"15/7/2018"
    },
    {
        "name": "Ion",
        "ore": 17,
        "data":"15/7/2018"
    },
    {
        "name": "Gheorghe",
        "ore": 17,
        "data":"15/7/2018"
    }
];
var tabel_JSON = JSON.stringify(tabel);
storage.setItem("db", tabel_JSON) // Pass a key name and its value to add or update that key.
*/
var value = storage.getItem("db");
/*if (typeof (value) == null)
{
    value = [
        {
            "render": false,
            "name": "test123",
            "ore": 12,
            "data": "test"
        },
        {
            "render": false,
            "name": "test123",
            "ore": 17,
            "data": "test"
        },
    ];
    storage.setItem("db", JSON.stringify(value));
}
*/
//window.alert(value);
tabel = JSON.parse(value) || [];


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
today = dd + '/' + mm + '/' + yyyy;

/*
JS PDF code starts here
*/

var doc = new jsPDF('p', 'pt');

var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

$('#print_tabel').click(function () {

    var res = doc.autoTableHtmlToJson(document.getElementById("tab_logic"));
    doc.autoTable(res.columns, res.data, { margin: { top: 80 } });

    var header = function (data) {
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        doc.text("Table test", data.settings.margin.left, 50);
    };

    var options = {
        beforePageContent: header,
        margin: {
            top: 80
        },
        startY: doc.autoTableEndPosY() + 20
    };

    doc.autoTable(res.columns, res.data, options);
    //doc.save("table.pdf");
    var pdfOutput = doc.output();
    console.log(pdfOutput);

    //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
    console.log("file system...");
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dir) {
        dir.getFile("a1-tabel.pdf", { create: true, exclusive: false }, function (fileEntry) {
            fileEntry.createWriter(function (writer) {
                writer.onwrite = function (evt) {
                    console.log("write success");
                };

                console.log("writing to file");
                writer.write(pdfOutput);
                window.alert("File saved in 'Android/data/com.tabele.myapp55203a/files/a1-tabel.pdf'");
            });

            }, function () {


                console.log("ERROR SAVEFILE");

            });
    });
});


/*
Angular app starting here
*/
var app = angular.module('tabele', []);
app.controller('tabel_CTRL', function ($scope) {
    $scope.today = today;
    $scope.tabel = tabel;
    $scope.add_copil = function () {
        $scope.aux = {
            "render": true,
            "nume": $scope.nume,
            "prenume": $scope.prenume,
            "data": new Date($scope.date1).toUTCString().split(' ').slice(0, 4).join(' '), //$scope.date1,
            "telefon": $scope.telefon,
            "note": $scope.note,
        };

        $scope.tabel.push($scope.aux);
        var tabel_JSON = JSON.stringify($scope.tabel);
        storage.setItem("db", tabel_JSON) // Pass a key name and its value to add or update that key.
        tabel = $scope.tabel;
        $scope.nume = " ";

    };

    $scope.click_mofify = function (pos) {
        $scope.position = pos;
        $scope.nume_edit = $scope.tabel[pos]["name"];
        $scope.ore_edit = $scope.tabel[pos]["ore"];
        $scope.date1_edit = new Date($scope.tabel[pos]["data"]);
        tabel = $scope.tabel;
        
    };

    $scope.modify = function () {
        $scope.tabel[$scope.position]["name"] = $scope.nume_edit;
        $scope.tabel[$scope.position]["ore"] = $scope.ore_edit;
        $scope.tabel[$scope.position]["data"] = new Date($scope.date1_edit).split(' ').slice(0, 4).join(' ');
        var tabel_JSON = JSON.stringify($scope.tabel);
        storage.setItem("db", tabel_JSON) // Pass a key name and its value to add or update that key.
        tabel = $scope.tabel;
    };

    $scope.delete_entry = function () {
        $scope.tabel.splice($scope.position, 1);
        var tabel_JSON = JSON.stringify($scope.tabel);
        storage.setItem("db", tabel_JSON) // Pass a key name and its value to add or update that key.
        tabel = $scope.tabel;
    }

});