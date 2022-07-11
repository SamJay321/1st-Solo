var smoothScroll = {
  move: function (old, des, actual) {
    easeInOutQuart = function (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    };
    actual += 1;
    ease = easeInOutQuart(actual / 100);
    delta = des - old;
    delta *= ease;
    delta += old;
    window.scrollTo(0, delta);
    if (actual < 100) {
      window.requestAnimationFrame(function () {
        smoothScroll.move(old, des, actual);
      });
    }
  },

  linkInit: function (e) {
    e.preventDefault();
    link = e.target.getAttribute("href").substr(1);
    block = document.getElementById(link).offsetTop;
    client = document.documentElement.scrollTop;

    smoothScroll.move(client, block, 0);
  },

  init: function () {
    links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
      link = links[i].getAttribute("href");
      if ((link.search("#") == 0) & (link.substr(1) != "")) {
        links[i].onclick = smoothScroll.linkInit;
      }
    }
  },
};

window.onload = smoothScroll.init;
