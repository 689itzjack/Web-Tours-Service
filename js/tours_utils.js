$(document).ready(function () {
   
    $("form[name='user_form']").validate({//esta linea indica en que tofes vamos a hacer la validation de acuerdo al nombre del tofesescrito en las sograim merubaim
        // Specify validation rules
        rules: {/**rules significa las reglas de cada campo a rellenar en el tofes, si alguno no cumple con los criterios entonces 
          podemos sacar un mensaje de error de que los criterios no se cumplen, como en la linea messages escita abajo  */
          "nameTour":{//sade del tofes del nombre
            required: true,
            minlength: 3
          },
          "duration": {//sade del id
            digits: true,
            maxlength: 2,
            min:1
          },
          "price": {//sade del id
            digits: true,
            maxlength: 5,
            min:500
          },
          "nameGuide": {//sade del id
            minlength: 3,
          },
          "phone": {//sade del id
            digits: true,
            minlength: 8,
          },
          "pathName": {//sade del id
            minlength: 3,
          },
          "country": {//sade del id
            minlength: 3,
          },
          "email":{//sade del email 
            email:true
          }
        },
        // Specify validation error messages
        messages: {       
          nameTour: "To Update write a valid and existent name",
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
        // process the form
        
        var nameTour=$("#nameTour").val();
        var starTour=$("#starTour").val();
        var durTour=$("#duration").val();
        var priceTour=$("#price").val();
        var nameGuide=$("#nameGuide").val();
        var telGuide=$("#phone").val();
        var mailGuide=$("#email").val();
        /** +'/nTour/'+starTour+'/duration/'+durTour+'/price/'+priceTour+'/nGuide/'+nameGuide
            +'/tel/'+telGuide+'/mail/'+mailGuide,*/
        $.ajax({

            type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
            url: '/users/'+nameTour, // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({/**en esta parte es donde toda la data que recibimos del tofes html que llenamos se inyecta en esta 
                seccion para crear toda la informacion en forma de json */
                  "id": nameTour,
                  "start_date": starTour,
                  "duration": durTour,
                  "price": priceTour,
                  "guide":{"name":nameGuide,"email":mailGuide,"cellular":telGuide}
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

