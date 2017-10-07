$(document).ready(function(){

  //add html using jquery
  $("h2#about").text("About");

  //---------tabs for murals section-----------------------------------------------
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');

    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
  })

  // --------------Navigation -------------------------------------------------
  //drop down menu
  $('nav li ul').hide().removeClass('dropdownItem'); //hide drop down menu
  $('nav li').hover(function () {
    $('ul', this).stop().slideToggle(300); 
  });

  //progressBar
  $("li#brand").click(function() {
    $("#bar").css("width", "20%");
  });

  $("li#about").click(function() {
    $("#bar").css("width", "73%");
    
  });

  //animation bounce effect ----------------------------------------------

  $(".home").click(function(){
     $("#bar").animate({left: '85', width: '50px',});
     bounceRight();
  });

  $(".about").click(function(){
    var section = window.location.hash.substr(1);
    var clickedindex = $(this).index();
    var currentindex = $("." + section).index();

    //if the clicked index is higher than the current then bounce right else bounce left.
    //for example if i am in mural section with index of 2 and i click street art with index of 3.
    //then the bounce should be to the right
    $("#bar").animate({left: '185px', width: '60px'});
    if (clickedindex > currentindex){
      bounceRight();
    } else{
      bounceLeft();
    }
  })

  $(".streetart").click(function(){
    var section = window.location.hash.substr(1);
    var clickedindex = $(this).index();
    var currentindex = $("." + section).index();

    //if the clicked index is higher than the current then bounce right else bounce left.
    $("#bar").animate({left: '325px', width: '80px',});
    if (clickedindex > currentindex){
      bounceRight();
    } else{
      bounceLeft();
    }
  })

  $(".murals").click(function(){
    var section = window.location.hash.substr(1);
    var clickedindex = $(this).index();
    var currentindex = $("." + section).index();

    //if the clicked index is higher than the current then bounce right else bounce left.
    $("#bar").animate({left: '440px', width: '60px',});
    if (clickedindex > currentindex){
      bounceRight();
    } else{
      bounceLeft();
    }
  })

  $(".contact").click(function(){
     $("#bar").animate({left: '560px', width: '60px',});
     bounceLeft();
  });


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

  // Get the modal
  var modal = document.getElementById('myModal');

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
    if (event.target == modal) {
      $("#myModal").css("display", "none");
    }
  })

  // --------------form validation --------------------------------------------------------

  $("#submit").click(function(){

    var isFilled;
    var emailsMatch;
    var emailValid;
    var yearValid;

    //error messages
    var erroryear = "Year must be a number";
    var errorBlank = "This can not be left blank";
    var errorEmailMatch = "Email does not match";
    var errorEmail = "Email must contain '@'";
    
    //check each input is not blank
    $("input").each(function() {
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


    if (emailValid == true && emailsMatch == true && isFilled == true && yearValid ==true){
      $(".form").css("display", "none");
      $( ".modal-content" ).append("<h2> You have succesfully signed up for the newsletter!</h2>");
    }

  });

  // --------------------slideshow --------------------------------------------------------
  //settings for slider
  var width = 720;
  var animationSpeed = 1000;
  var pause = 3000;
  var currentSlide = 1;

  //cache DOM elements
  var $slider = $('#slider');
  var $slideContainer = $('.slides', $slider);
  var $slides = $('.slide', $slider);

  var interval;

  function startSlider() {
    interval = setInterval(function() {
      $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
        if (++currentSlide === $slides.length) {
          currentSlide = 1;
          $slideContainer.css('margin-left', 0);
        }
      });
    }, pause);
  }

  function pauseSlider() {
      clearInterval(interval);
  }

  $slideContainer
      .on('mouseenter', pauseSlider)
      .on('mouseleave', startSlider);

  startSlider();


  

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
                  ];
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