var fadein_tween = TweenMax.to('#fadein-trigger > div', .375,{ opacity: 1 });
var fadeout_tween = TweenMax.to('#fadein-trigger > div', .375,{ opacity: 0 });

var controller = new ScrollMagic.Controller();

var fadein_scene = new ScrollMagic.Scene({
  triggerElement: '#fadein-trigger',
  reverse: true
})
.setTween(fadein_tween)
.addTo(controller);

var fadeout_scene = new ScrollMagic.Scene({
  triggerElement: '#fadeout-trigger',
  reverse: true
})
.setTween(fadeout_tween)
.addTo(controller);