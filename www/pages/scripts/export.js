
    const storage = window.localStorage;
    //let ind_order = storage.getItem("index") || 0;
    let value = storage.getItem("db");
    var i;
    let tabel = JSON.parse(value) || {
        "elevi": [],
        "prezente": [],
    };


//window.alert(JSON.stringify(tabel));

    var doc = new jsPDF('p', 'pt');

    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    //end

    function genPDF() {


        domtoimage.toJpeg(document.getElementById('table_export'), { quality: 0.95 })
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
                var email = prompt("Please enter your email", "");
                document.getElementById('email').value = email;
                doc = new jsPDF('l','mm',[ 841.89, 210]);
                doc.addImage(img, 'JPEG', 20, 20 );
                var bin = doc.output('blob');

              var pdf = btoa(doc.output());
              document.getElementById('file1').value = pdf;
              $('#form1').submit();
             // window.alert("Check you email");

                 /* $.ajax({
                    method: "POST",
                    url: "https://registroellectronice.000webhostapp.com/API/createpdf.php",
                    data: {data: pdf,
                           'email':email},
                  }).done(function(data){
                     console.log(data);
                     setTimeout(function(){ 
                           window.alert("check your email");
                      }, 3000);

                  });*/
               /*
                var link = document.createElement('a');

                link.download = 'my-image-name.jpeg';
                link.href = doc.output;
                link.innerHTML = "download";
                //link.click();
                document.body.appendChild(link);*/

            });


    }

    //function to extract day from a date
    function extract(str){
      var n = str.search("/");
      str = str.substring(0,n);
      return str*1;
    }

    var app = angular.module("exportapp", []);
    app.controller("export_ctrl", function ($scope) {
        $scope.result = [];
        $scope.tabel = tabel;

        $scope.search_data = function () {
            var counter = 0;
            var data = $scope.month + '/' + $scope.year;
            for (var i = 0; i < $scope.tabel["prezente"].length; i++) {
                if (String($scope.tabel["prezente"][i]["date"]).search(data) != -1) {
                    $scope.result.push($scope.tabel["prezente"][i]);
                    counter++;
                }

            };
            console.log($scope.result);
            let intercganhe;
            for (var i = 0; i < $scope.result.length-1; i++){
                for(var j=i+1; j<$scope.result.length; j++){
                    if(extract($scope.result[i]["date"])>extract($scope.result[j]["date"])){
                        intercganhe = $scope.result[i];
                        $scope.result[i] = $scope.result[j];
                        $scope.result[j] = intercganhe;
                    }
                }
            };

            if (counter != 0) {
               // window.alert(JSON.stringify($scope.result));
                console.log($scope.result);
                let aux =[];
                for(var j=0;j<$scope.tabel["elevi"].length;j++){
                    let nume = $scope.tabel["elevi"][j]["nume"],
                        prenume = $scope.tabel["elevi"][j]["prenume"];
                    let elev = {
                        "nume": nume,
                        "prenume": prenume,
                        "zile":[],
                    }
                    for(var i=0; i<$scope.result.length;i++){
                        for(q=0;q<$scope.result[i]['Studenti'].length;q++)
                        {   //console.log($scope.result[q]);
                            if($scope.result[i]['Studenti'][q]["Student"]["nume"] == nume && $scope.result[i]['Studenti'][q]["Student"]["prenume"] == prenume)
                            {   
                                console.log($scope.result[i]);
                                let aux2 = {"data": $scope.result[i]["date"],
                                            "prezent" : $scope.result[i]['Studenti'][q]["prezent"],
                                            "mancat": $scope.result[i]['Studenti'][q]["mancat"],

                                            };

                                            elev["zile"].push(aux2);
                            }
                        }
                    }
                    aux.push(elev);
                }
                console.log(aux);
                for (var i = 0; i < aux.length-1; i++) {
                    for (var j = i+1; j < aux.length; j++) {
                        if(aux[i]["nume"] > aux[j]["nume"]){
                            intercganhe = aux[i];
                            aux[i]=aux[j];
                            aux[j]=intercganhe;
                        }
                    }
                }



                $scope.aux = aux;
            }
            else alert("no records found");
        }

    });

