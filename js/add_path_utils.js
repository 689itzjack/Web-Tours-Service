$(document).ready(function () {
   
    $("form[name='user_form']").validate({//esta linea indica en que tofes vamos a hacer la validation de acuerdo al nombre del tofesescrito en las sograim merubaim
        // Specify validation rules
        rules: {
            "nameTour":{//sade del tofes del nombre
                required: true,
                minlength: 3
            },
            "cityPath":{//sade del tofes del nombre
              required: true,
              minlength: 3
            },
            "countryPath": {//sade del id
              required: true,
              minlength: 3
            }
        },
        // Specify validation error messages
        messages: {       
            nameTour: "To Update write a valid and existent name",
            cityPath: "To add write a valid name at least with 3 characters",
            countryPath: "To add write a valid name at least with 3 characters "
        }
      });

    // process the form
    $('#user_form').submit(function (event) {/**aqui es cuando enviamos el tofes (apretamos el boton de submit)*/
        if(!$("#user_form").valid()){
            alert("The inputs are not valids, pleaase try it again.")
            return ;/**en el caso de que el tofes no es valido se activa esta linea (la validacion se revisa de acuaredo a lo de arriba(linea 3) */
        }
            
        // process the form
        var nameTour=$("#nameTour").val();
        var nameCity=$("#cityPath").val();
        var nameCountry=$("#countryPath").val();
       
        var newObj=[{name:nameCity,country:nameCountry}];
        $.ajax({

            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: '/nameTour/'+nameTour, // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({/**en esta parte es donde toda la data que recibimos del tofes html que llenamos se inyecta en esta 
                seccion para crear toda la informacion en forma de json */
                  "id": nameTour,
                  "path":newObj
            }),
            processData: false,            
            encode: true,
            success: function( data, textStatus, jQxhr ){/**si el browser recibio como respuesta del servidor success(200) entonces entramos
               imprimimos la data (en el console del browser) y nos redirigimos a el path /main */
                console.log(data);
                location.href = "/list";

            },
            error: function( jqXhr, textStatus, errorThrown ){
                alert("The Tour doesnt exist, please creat it.")
                console.log( errorThrown );
            }
        })
        event.preventDefault();
    });
});

