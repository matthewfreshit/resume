/* global firebase */

var offset = 0;

var particles = {
  particles: {
    number: {
      value: 200,

      density: {
        enable: true,

        value_area: 800
      }
    },

    color: {
      value: '#ffffff'
    },

    shape: {
      type: 'circle',

      stroke: {
        width: 0,

        color: '#000000'
      },

      polygon: {
        nb_sides: 5
      },

      image: {
        src: 'img/github.svg',

        width: 100,

        height: 100
      }
    },

    opacity: {
      value: 1,

      random: true,

      anim: {
        enable: true,

        speed: 2,

        opacity_min: 0,

        sync: false
      }
    },

    size: {
      value: 4,

      random: true,

      anim: {
        enable: false,

        speed: 10,

        size_min: 0.3,

        sync: false
      }
    },

    line_linked: {
      enable: false,

      distance: 150,

      color: '#ffffff',

      opacity: 0.4,

      width: 1
    },

    move: {
      enable: true,

      speed: 0.17,

      direction: 'none',

      random: true,

      straight: false,

      out_mode: 'out',

      bounce: false,

      attract: {
        enable: false,

        rotateX: 600,

        rotateY: 600
      }
    }
  },

  interactivity: {
    detect_on: 'canvas',

    events: {
      onhover: {
        enable: false,

        mode: 'bubble'
      },

      onclick: {
        enable: false,

        mode: 'repulse'
      },

      resize: true
    },

    modes: {
      grab: {
        distance: 400,

        line_linked: {
          opacity: 1
        }
      },

      bubble: {
        distance: 250,

        size: 0,

        duration: 2,

        opacity: 0,

        speed: 3
      },

      repulse: {
        distance: 400,

        duration: 0.4
      },

      push: {
        particles_nb: 4
      },

      remove: {
        particles_nb: 2
      }
    }
  },

  retina_detect: true
};

var firebaseConfig = {
  apiKey: 'AIzaSyAH8wfs3sUmgAYF1claBgZLwHzEJHjYtdg',

  authDomain: 'my-resume-8015c.firebaseapp.com',

  databaseURL: 'https://my-resume-8015c.firebaseio.com',

  projectId: 'my-resume-8015c',

  storageBucket: 'my-resume-8015c.appspot.com',

  messagingSenderId: '631111432434',

  appId: '1:631111432434:web:91670eff5ea4df986b386b',

  measurementId: 'G-W8QRXRC7B4'
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var rootRef = firebase.database().ref();

var aboutme = rootRef.child('AboutMe');

var skills = rootRef.child('Skills');

var tools = rootRef.child('Tools');

aboutme.on('value', (snap) => {
  var year = snap.val().Year;

  var day = snap.val().Day;

  var month = snap.val().Month;

  calculate_age(new Date(year, month, day));
});

skills.orderByValue().on('value', (data) => {
  var newArray = [];

  data.forEach(function (data) {
    newArray.push({
      value: data.val(),

      title: hex_to_ascii(data.key)
    });
  });

  newArray.sort(function (val1, val2) {
    if (val1.value > val2.value) return -1;

    if (val1.value < val2.value) return 1;

    if (val1.title > val2.title) return 1;

    if (val1.title < val2.title) return -1;
  });

  AddArray('skill', newArray);
});

tools.orderByValue().on('value', (data) => {
  var newArray = [];

  data.forEach(function (data) {
    newArray.push({
      value: data.val(),

      title: hex_to_ascii(data.key)
    });
  });

  newArray.sort(function (val1, val2) {
    if (val1.value > val2.value) return -1;

    if (val1.value < val2.value) return 1;

    if (val1.title > val2.title) return 1;

    if (val1.title < val2.title) return -1;
  });

  AddArray('tool', newArray, function () {
    $('body').fadeIn();

    offset = $('#profile').offset().top;

    applyNavigation();

    checkHash();

    particlesJS('particles-js', particles, function () {});
  });
});

function applyNavigation() {
  applyClickEvent();

  applyNavigationFixForPhone();

  applyScrollSpy();

  history.replaceState(null, null, ' ');

  $('body').addClass('fixed');

  $(window).scroll(function () {
    if ($(this).scrollTop() > offset - 1) {
      $('.my-navbar').fadeIn();

      window.location.hash = $('.nav .active a')
        .attr('href')
        .replace('#', '#/');
    } else {
      $('.my-navbar').fadeOut();

      history.replaceState(null, null, ' ');
    }
  });
}

function applyClickEvent() {
  $('a[href*=#]').on('click', function (e) {
    e.preventDefault();

    if ($($.attr(this, 'href')).length > 0) {
      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top
        },
        600
      );
    }

    return false;
  });
}

function applyNavigationFixForPhone() {
  $('.navbar li a').click(function (event) {
    $('.navbar-collapse').removeClass('in').addClass('collapse');
  });
}

function applyScrollSpy() {
  $('#navbar-example').on('activate.bs.scrollspy', function () {
    window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
  });
}

/* HASH FUNCTION */

function checkHash() {
  lstrHash = window.location.hash.replace('#/', '#');

  if ($('a[href=' + lstrHash + ']').length > 0) {
    $('a[href=' + lstrHash + ']').trigger('click');
  }
}

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();

  var age_dt = new Date(diff_ms);

  $('#ageField').html(
    '<strong>Age: </strong> ' + Math.abs(age_dt.getUTCFullYear() - 1970)
  );
}

function hex_to_ascii(str) {
  var orginal = str;

  var start = str.indexOf('~');

  if (start < 0) return str;

  var end = str.lastIndexOf('~');

  var hex = str.substr(start + 1, end - 1);

  var newstr = '';

  for (var n = 0; n < hex.length; n += 2) {
    newstr += String.fromCharCode(parseInt(hex.substr(n, 2), 16)).trim();
  }

  newstr = orginal.substr(0, start) + newstr.trim() + orginal.substr(end + 1);

  return newstr.trim();
}

function AddArray(type, newArray, callback) {
  var col1 = $('#' + type + 'col1');

  var col2 = $('#' + type + 'col2');

  var half = parseInt(newArray.length / 2);

  col1.empty();

  col2.empty();

  for (var i = 1; i <= newArray.length; i++) {
    var title = newArray[i - 1].title;

    var value = newArray[i - 1].value;

    // if (type === 'tool') title = yearsDiff(title);

    var newHtml =
      '<li><span class="ability-title">' +
      title +
      '</span><span class="ability-score">';

    for (var j = 1; j <= 5; j++) {
      newHtml +=
        '<span class="glyphicon glyphicon-star ' +
        (j <= value ? 'filled' : '') +
        '"></span>';
    }

    newHtml += '</span></li>';

    (i <= half ? col1 : col2).append(newHtml);
  }

  if (typeof callback === 'function') {
    callback();
  }
}

function yearsDiff(title) {
  var yearStart = title.indexOf('(') + 1;

  var yearEnd = title.indexOf('years');

  var d1 = title.substr(yearStart, 4).trim();

  var date1 = new Date(d1);

  var date2 = new Date();

  var yearsDiff = date2.getYear() - date1.getYear();

  return (
    title.substr(0, yearStart) +
    (yearsDiff - 1) +
    (date2.getMonth() >= 6 ? '+ ' : ' ') +
    title.substr(yearEnd)
  );
}
