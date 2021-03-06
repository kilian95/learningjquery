$(document).ready(function(){

  window.location.hash = 'home';

  //add html using jquery
  $("h2#about").text("About");

  //---------tabs for murals section-----------------------------------------------
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').hide();

    $(this).addClass('current');
    $("#"+tab_id).fadeIn("slow");
  })

  //---------dynamic population of list-----------------------------------------------
  var alreadyshown = false;
  $('#showGalleries').click(function(){ 
    if (alreadyshown){
      //do nothing
    }else{
      alreadyshown = true;
      $('#artGalleries').append('<ul />');
      $('#textHolder>span').each(function(){
        $('#about ul').append('<li>' + $(this).text()  + '</li>' );
      }); 
    }
  });

  //---------dynamic population of select element-------------------------------------
    $('#selectElement').append('<select />');
    $('#textHolder1>span').each(function(){
      $('select').append('<option>' + $(this).text()  + '</option>' );
   });

   //---------dynamic population of table----------------------------------------------
    $('#theTable').append('<table />');
    $('#tableContainer table').append('<tr />');
    $('#tableHeader>span').each(function(){
      $('#tableContainer tr').append('<th>' + $(this).text()  + '</th>' ); //add headers
    });

    //add search button and search fields
    $('#tableContainer tr').append('<th><input type="button" value="search" id="search"></th>' );
    $('#tableContainer table').append('<tr id="searchFields">'+
    '<td><input type="text" id="1" class="searchInput" placeholder="Artist..." /></td>'+
    '<td><input type="text" id="2" class="searchInput" placeholder="Website..." /></td>'+
    '<td><input type="text" id="3" class="searchInput" placeholder="xxxxxxxxxxx" /></td>'+
    '<td><input type="text" id="4" class="searchInput" placeholder="Meduim..." /></td>'+
    '</tr> ');
    
    //add new table row and populate with data for each artist
    for (i = 0; i < 7; i++) { 
      $('#tableContainer table').append('<tr id="row' + [i] + '" />');
      $('#tableData' + [i] + '>span').each(function(){
        $('#tableContainer tr[id="row' + [i] + '"]').append('<td>' + $(this).text()  + '</td>' );
      });
    }

  // -------------search for table-----------------------------------------------------
  //show search fields on click
  $('#search').click(function(){
    $("#searchFields").show();
  })

  $(".searchInput").on("keyup", function() {
    var input = $(this).val().toLowerCase(); //get input in lowercase
    var i = $(this).attr('id'); //get the id of the td. This is then passed as the number of the nth child
   
    $("td:nth-child(" + i + ")").each(function() {
      var s = $(this).text().toLowerCase(); //get value of each td in corresponding row
      if (s.indexOf(input)!=-1) {
        //if match is found show corresponding table row
        $(this).closest('tr').show();
      } else{
        $(this).closest('tr').hide();
        $("#searchFields").show();
      }
    });   
  });

  //--------------animation bounce effect ---------------------------------------
  //using array means a click function is not needed for each li.
  //first value is left, second value is width.
  var animateInfo = [[0,0], [560,60], [440,60], [325,80], [185,60], [85, 50]];

  $("nav li").click(function(){
    //get index of clicked li
    var clickedIndex = $(this).index();
    
    //get Url after hash
    var section = window.location.hash.substr(1);

    //get index of current li
    var currentIndex = $("." + section).index();
    
    //animate
    $("#bar").animate({left: animateInfo[clickedIndex][0], width: animateInfo[clickedIndex][1]});
    //if clicked index is bigger than current index then we know it is to the right
    if (clickedIndex > currentIndex){
      bounceRight();
    } else{
      bounceLeft();
    }
  })

  function bounceLeft(){
    $("#bar").animate({left: '-=20px'});
    $("#bar").animate({left: '+=20px'});
    $("#bar").animate({left: '-=10px'});
    $("#bar").animate({left: '+=10px'});
  }

  function bounceRight(){
    $("#bar").animate({left: '+=20px'});
    $("#bar").animate({left: '-=20px'});
    $("#bar").animate({left: '+=10px'});
    $("#bar").animate({left: '-=10px'});
  }

  //--------------smooth scrolling -------------------------------------------------
  $("a").on('click', function(event) {
    // Prevent default anchor click behavior
    event.preventDefault();
    
    // Store hash
    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){
 
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });

  //----------------Modal for form--------------------------------------------------------
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  //show modal when button is clicked
  $('#myBtn').click(function(){
    $("#myModal").css("display", "block");
  })

  //When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    $("#myModal").css("display", "none");
  }

  // When the user clicks anywhere outside of the modal, close it
  $(window).click(function(event){
    if (event.target == $("#myModal")) {
      $("#myModal").css("display", "none");
    }
  })

  // --------------form validation --------------------------------------------------------
  $("#submit").click(function(){
    var isFilled, emailsMatch, emailValid, yearValid; //boolean
    
    //error messages
    var erroryear = "Year must be a number";
    var errorBlank = "This can not be left blank";
    var errorEmailMatch = "Email does not match";
    var errorEmail = "Email must contain '@'";
    
    //check each input is not blank
    $(".modal-content input").each(function() {
      var element = $(this);
      if (element.val() == "") {
        $( ".modal-content" ).prepend( "<p class='error' id='errorBlank'>All fields must be filled in</p>" );
        isFilled = false;
        return false; //break out of loop  
      }else {
        $( "input" ).prev().empty(); //removes error message
        $("p#errorBlank").empty();
        isFilled = true;
      }
    });

    //check emails match
    var email = $("#email").val();
    var confirmEmail = $("#confirmEmail").val();
    if (email != confirmEmail){
      $( "#confirmEmail" ).prev().append(errorEmailMatch);
      emailsMatch = false;
    } 
    else{
      $( "#confirmEmail" ).prev().empty();
      emailsMatch = true;
    }

    //check if email contains @ symbol
    //indexOf returns the numeric index  of '@'. 
    //Else it returns -1. So check if the value it has returned is greater than -1.
    if ($('#email').val().indexOf('@') > -1) {
      emailValid = true;
    }else{
      $( "#email" ).prev().append(errorEmail);
      emailValid = false;
    } 

    //check year of birth is numeric
    if ($.isNumeric($('#dob').val())) {
      yearValid = true;
    }else{
      $( "#dob" ).prev().append(erroryear);
      yearValid = false;
    } 

    if (emailValid && emailsMatch && isFilled && yearValid){
      $(".form").toggle(); //hide form
      $( ".modal-content" ).append("<h2> You have succesfully signed up for the newsletter!</h2>");
    }
  });

  // --------------------Accordion --------------------------------------------------------
  $('.accordion').each(function(){
    $(this).click(function(){
      $('.accordion').removeClass("active");
      $(this).addClass("active");
      if ($(this).next().css("max-height") == "0px"){
        $(this).next().css("maxHeight", "100px");
      } else{
        $(this).next().css("maxHeight", "0px");
      }
    });
  }); 

 // --------------------tooltip --------------------------------------------------------
   $("#social").mouseover(function() {
    $("#tooltip").show();
  });

  $("#social").mouseout(function() {
    $("#tooltip").hide();
  });

  // --------------------slideshow --------------------------------------------------------
  $('.right').click(function(){
    var currentImg = $('.active'); 
    //get the next element
    var nextImg = currentImg.next();

    if(nextImg.length){
      currentImg.removeClass("active").css("z-index", -1);
      nextImg.addClass("active").css("z-index", 1);
    }else{
      //go back to the first image in the slideshow
      currentImg.removeClass("active").css("z-index", -1);
      $("#sliderInner img:nth-child(1)").addClass("active").css("z-index", 1);
    }
  })

  $('.left').click(function(){
    var currentImg = $('.active');
    //get the previous element
    var prevImg = currentImg.prev();

    if(prevImg.length){
      currentImg.removeClass("active").css("z-index", -1);
      prevImg.addClass("active").css("z-index", 1);
    }else{
      //go to the last image in the slide show
      currentImg.removeClass("active").css("z-index", -1);
      $("#sliderInner img:nth-child(5)").addClass("active").css("z-index", 1);
    }
  })
});//.ready(function()

//--------------Google Maps ----------------------------------------------------

function initMap() {
  var mapProp= new google.maps.Map(document.getElementById('googleMap'),{  
      center:new google.maps.LatLng(54.5961, -5.92858),
      zoom:13,
  });

  var cordinates = [
                    [54.602119,-5.931664, 'art1.jpg'],
                    [54.601166,-5.924788, 'art2.jpg'],
                    [54.593826,-5.918291, 'art3.jpg'], 
                    [54.599540,-5.946156, 'art4.jpg'],
                    [54.602960,-5.899297, 'art5.jpg']
                  ]; //lat, long and address of corresponding imge
  //place markers                
  for (i = 0; i < cordinates.length; i++){
    var latlng = new google.maps.LatLng(cordinates[i][0], cordinates[i][1]);
    var marker = new google.maps.Marker({  
      map: mapProp, 
      position: latlng  
    }); 

    //give each marker infowindow
    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent("<img id='infoWindow' src=images/" + cordinates[i][2] + ">");
        infoWindow.open(mapProp, marker);
      }
    })(marker, i));
  } 
}

//--------------Drawing Game ----------------------------------------------------
$(document).ready(function(){
  var context = document.getElementById('drawingCanvas').getContext("2d");
  var paint; //boolean
  var canvas = $('#canvas');
  var green = '#71b573';
  var blue = '#49a0d8';
  var red = '#dc4b25';
  var black = '#000000';
  var activeColour = black;
  var mySound;
  mySound = new sound("spray.mp3"); 

  $('#drawingCanvas').mousedown(function(e){
    paint = true;
    //get the mouse position and subtract it from the gameContainer offset postion
    var x = e.pageX - $('#gameContainer').offset().left;
    var y = e.pageY - $('#gameContainer').offset().top;
    addClick(x, y); 
    redraw();
    mySound.play();
  });

  $('#drawingCanvas').mousemove(function(e){
    if(paint){
      //add x, y cordinates AND also dragging = true
      var x = e.pageX - $('#gameContainer').offset().left;
      var y = e.pageY - $('#gameContainer').offset().top;
      addClick(x, y, true);
      redraw();
    }
  });

  //stop painting when mouse is not clicked down
  $('#drawingCanvas').mouseup(function(e){
    paint = false;
    mySound.stop();
    console.log(game);
  });

   //stop painting when mouse is outside canavs
   $('#drawingCanvas').mouseleave(function(e){
    paint = false;
  });

  var paint; //boolean
  var game = [[],[],[],[]]; // x , y cordinates, boolean value for dragging and colour
  
  //make referencing array easier to read
  var xCord = game[0]; 
  var yCord = game[1];
  var dragging = game[2];
  var colour = game[3];

  function addClick(x, y, dragging)
  {
    //push x and y cordinates and dragging to array
    game[0].push(x);
    game[1].push(y);
    game[2].push(dragging);
    game[3].push(activeColour);
  }

  //below function is code modified from the tutorial: https://github.com/williammalone/Simple-HTML5-Drawing-App 
  function redraw(){
    context.lineJoin = "round";
    context.lineWidth = 10;
        
    for(var i=0; i < xCord.length; i++) {    
      context.beginPath();
        if(dragging[i] && i){ //if user is moving mouse
       //move pen above the paper to cordinates of last point
        context.moveTo(xCord[i-1], yCord[i-1]); 
       }else{
        //move pen one pixel to the left of clicked pixel  
        context.moveTo(xCord[i]-1, yCord[i]);
       }
       //move pen on paper to draw line to clicked cordinates x and y
       context.lineTo(xCord[i], yCord[i]);
       
       context.closePath(); //makes line solid with no gaps
       context.strokeStyle = colour[i];
       context.stroke(); //make the line visible
    }
  }

  //event handlers for game buttons

  //change background
  $('.service').click(function(){
    var image = $(this).attr("id");
    $('#drawingCanvas').css("background-image", "url(images/" + image + ".jpg)");
  })

  //clear canvas
  $('#clear').click(function(){
    clearCanvas();
  })

  $(".colour").click(function(){
    activeColour = $(this).attr('id'); //this way we dont need clickk functon for each colour
  })  

  $('#useColour').click(function(){
    activeColour = $('#custColour').val();
  })

  $("#movelight").click(function(){

    function loop() {

      $("#spotlight").show(); 

      //Get random height value
      var random = Math.floor(Math.random() * 280) + 20;
      
    
      $("#spotlight").animate({left: '25px', bottom: random}, 2000);
      $("#spotlight").animate({left: '800px', bottom: random}, 2000,
      function() {
        loop(); //loop animation 
      });
    }
    loop();
  });

  function clearCanvas(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); //clear canvas
   
    //empty array
    game = [[],[],[],[]];

    //reset values of x,y and dragging and colour
    xCord = game[0]; 
    yCord = game[1];
    dragging = game[2];
    colour = game[3];
  }

  $("#spotlight").mouseover(function(){
    mySound.stop();
    alert("youve been caught!");
    clearCanvas();
  }); 
  
  //below function is code modified from https://www.w3schools.com/graphics/game_sound.asp 
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    $(document.body).append(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
});