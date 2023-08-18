$(document).ready(function () {
   
    $("form[name='user_form']").validate({//esta linea indica en que tofes vamos a hacer la validation de acuerdo al nombre del tofesescrito en las sograim merubaim
        // Specify validation rules
        
        rules: {
          "nameTour":{//sade del tofes del nombre
            required: true,
            minlength: 3
          },
          "duration": {//sade del id
            required: true,
            digits: true,
            maxlength: 2,
            min:1
          },
          "price": {//sade del id
            required: true,
            digits: true,
            maxlength: 5,
            min:500
          },
          "nameGuide": {//sade del id
            required: true,
            minlength: 3,
          },
          "phone": {//sade del id
            required: true,
            digits: true,
            minlength: 8,
          },
          "pathName": {//sade del id
            required: true,
            minlength: 3,
          },
          "country": {//sade del id
            required: true,
            minlength: 3,
          },
          "email":{//sade del email 
            required: true,
            email:true
          }
        },
        // Specify validation error messages
        messages: {       
          nameTour: "please give a name of 3 letters at least",
          duration:{
            digits:"Please enter only 2 digits",
            maxlength: "The Tour duration its just till 99 hrs max",
            min:"The shortest Tour duration its 1 hr"
          },
          price:{
            digits:"Please enter only digits",
            maxlength: "The Tour cost its less than 100,000 NIS",
            min:"The Tour cheaper cost 500 NIS"
          },
          nameGuide:{
            minlength:"A valid name has 3 characters at least"
          },
          phone:{
            digits:"Please enter only digits",
            minlength:"The number phone must to have 8 ciphers"
          },
          pathName:{
            minlength:"A valid name has 3 characters at least"
          },
          country:{
            minlength:"A valid name has 3 characters at least"
          },
          email: "email structure is some@domain "
        }
      });

    // process the form
    $('#user_form').submit(function (event) {/**aqui es cuando enviamos el tofes (apretamos el boton de submit)*/
        if(!$("#user_form").valid()) return;/**en el caso de que el tofes no es valido se activa esta linea (la validacion se revisa de acuaredo a lo de arriba(linea 3) */
        console.log("in submit");
        
        // process the form
        //var existTour=existObject()
        var nameCity=$("#pathName").val();
        var nameCountry=$("#country").val();
        var newObj={name:nameCity,country:nameCountry};
        var arrayPaths=[];
        arrayPaths.push(newObj);
        console.log(arrayPaths);
        
        $.ajax({//si el tofes es vaido(no entramos a la linea 32) entonces hacemos kriat ajax en esta linea

            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/users', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({/**en esta parte es donde toda la data que recibimos del tofes html que llenamos se inyecta en esta 
              seccion para crear toda la informacion en forma de json */
                "id": $("#nameTour").val(),
                "start_date": $("#starTour").val(),
                "duration": $("#duration").val(),
                "price": $("#price").val(),
                "guide":{"name":$("#nameGuide").val(),"email":$("#email").val(),"cellular":$("#phone").val()},
                "path":arrayPaths
            }),
            processData: false,            
            // dataType: 'json', // what type of data do we expect back from the server "email": $("#email").val(),
            encode: true,
            success: function( data, textStatus, jQxhr ){/**si el browser recibio como respuesta del servidor success(200) entonces entramos
               imprimimos la data (en el console del browser) y nos redirigimos a el path /main */
                console.log(data);
                location.href = "/list";

            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
});

///////////////////////////////////////functions///////////////////////////////////


//NOTE: el tofes no se envia hasta que todos los sadot(campos a rrellenar) sean aceptables y no marquen tipos de errores de los descrtitos en messages(linea 20)
//NOTE: la validation que hacemos en este kovets es de lado del front "el lado del cliente" es decir que ante de enviar los datos al servidor hacem0s validation a los datods del cliente
/**NOTE: el servidor tambien hace las revisiones pertinentes cuando recibe el tofes del client, recibe el req.body y revisa que el nomre tengamas de 6 chars...
 * todas las revisiones  que hcimos arriba igual las hace el servidor
 */