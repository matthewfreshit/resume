var offset = $('#profile').offset().top;
var firebaseConfig = {
	apiKey: "AIzaSyAH8wfs3sUmgAYF1claBgZLwHzEJHjYtdg",
	authDomain: "my-resume-8015c.firebaseapp.com",
	databaseURL: "https://my-resume-8015c.firebaseio.com",
	projectId: "my-resume-8015c",
	storageBucket: "my-resume-8015c.appspot.com",
	messagingSenderId: "631111432434",
	appId: "1:631111432434:web:91670eff5ea4df986b386b",
	measurementId: "G-W8QRXRC7B4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var rootRef = firebase.database().ref();
var ref = rootRef.child("AboutMe");
ref.on('value',(snap)=>{
	var year = snap.val().Year;
	var day = snap.val().Day;
	var month = snap.val().Month;
	$("#ageField").html("<strong>Age:</strong> <br> "+calculate_age(new Date(year,month,day))+" years");
});
$(document).ready(function()
{
	applyNavigation();
	applyMailTo();
	checkHash();
});

/* NAVIGATION FUNCTIONS */

function applyNavigation()
{
	applyClickEvent();
	applyNavigationFixForPhone();
	applyScrollSpy();
	$('body').addClass('fixed');
  $(window).scroll(function () {
      if ($(this).scrollTop() > offset-1) {
          $('.my-navbar').fadeIn();
      } else {
          $('.my-navbar').fadeOut();
      }
  });
}

function applyClickEvent()
{
	$('a[href*=#]').on('click', function(e)
	{
		e.preventDefault();

		if( $( $.attr(this, 'href') ).length > 0 )
		{
			$('html, body').animate(
			{
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 600);
		}
		return false;
	});
}

function applyNavigationFixForPhone()
{
	$('.navbar li a').click(function(event)
	{
		$('.navbar-collapse').removeClass('in').addClass('collapse');
	});
}

function applyScrollSpy()
{
	$('#navbar-example').on('activate.bs.scrollspy', function()
	{
		window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
	});
}

/* MAILTO FUNCTION */

function applyMailTo()
{
	$('a[href*=mailto]').on('click', function(e)
	{
		var lstrEmail = $(this).attr('href').replace('mailto:', '');

		lstrEmail = lstrEmail.split('').reverse().join('')

		$(this).attr('href', 'mailto:' + lstrEmail);
	});
}

/* HASH FUNCTION */

function checkHash()
{
	lstrHash = window.location.hash.replace('#/', '#');

	if($('a[href='+ lstrHash +']').length > 0)
	{
		$('a[href='+ lstrHash +']').trigger('click');
	}
}

function calculate_age(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

var particles = {
      "particles": {
        "number": {
          "value": 200,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 2,
            "opacity_min": 0,
            "sync": false
          }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 10,
            "size_min": 0.3,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 0.17,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "bubble"
          },
          "onclick": {
            "enable": false,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },

            "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
   };
   particlesJS('particles-js', particles, function() {
     console.log('callback - particles.js config loaded');
   });
