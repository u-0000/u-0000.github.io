if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker.register('./service-worker.js');
    console.log('Service Worker is registered');
}
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).DetectIt={})}(this,(function(e){"use strict";var t="undefined"!=typeof window?window:{screen:{},navigator:{}},n=(t.matchMedia||function(){return{matches:!1}}).bind(t),o=!1,i={get passive(){return o=!0}},s=function(){};t.addEventListener&&t.addEventListener("p",s,i),t.removeEventListener&&t.removeEventListener("p",s,!1);var r=o,a="PointerEvent"in t,c="ontouchstart"in t,u=c||"TouchEvent"in t&&n("(any-pointer: coarse)").matches,d=(t.navigator.maxTouchPoints||0)>0||u,h=t.navigator.userAgent||"",p=n("(pointer: coarse)").matches&&/iPad|Macintosh/.test(h)&&Math.min(t.screen.width||0,t.screen.height||0)>=768,v=(n("(pointer: coarse)").matches||!n("(pointer: fine)").matches&&c)&&!/Windows.*Firefox/.test(h),f=n("(any-pointer: fine)").matches||n("(any-hover: hover)").matches||p||!c,m=!d||!f&&v?d?"touchOnly":"mouseOnly":"hybrid",y="mouseOnly"===m?"mouse":"touchOnly"===m||v?"touch":"mouse";e.deviceType=m,e.primaryInput=y,e.supportsPassiveEvents=r,e.supportsPointerEvents=a,e.supportsTouchEvents=u,Object.defineProperty(e,"__esModule",{value:!0})}));
function youtubeUrlParser(url) {
  var timeToSec = function(str) {
    var sec = 0;
    if (/h/.test(str)) { sec += parseInt(str.match(/(\d+)h/,'$1')[0],10) * 60 * 60; }
    if (/m/.test(str)) { sec += parseInt(str.match(/(\d+)m/,'$1')[0],10) * 60; }
    if (/s/.test(str)) { sec += parseInt(str.match(/(\d+)s/,'$1')[0],10); }
    return sec;
  };
  var videoId = /^https?\:\/\/(www\.)?youtu\.be/.test(url) ? url.replace(/^https?\:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/,"$2") : url.replace(/.*\?v\=([\w-]{11}).*/,"$1");
  var videoStartTime = /[^a-z]t\=/.test(url) ? url.replace(/^.+t\=([\dhms]+).*$/,'$1') : 0;
  var videoStartSeconds = videoStartTime ? timeToSec(videoStartTime) : 0;
  var videoShowRelated = ~~/rel\=1/.test(url);
  console.log({
    id: videoId,
    startString: videoStartTime,
    startSeconds: videoStartSeconds,
    showRelated: videoShowRelated
  })
  var html = `<style>body,html{margin: 0;overflow: hidden;}</style><iframe width=100% height=100% src="https://www.youtube.com/embed/${videoId}?autoplay=1&cc_load_policy=1&rel=0&showinfo=0"frameborder="0" allow="autoplay" allowfullscreen></iframe>`;
	document.body.innerHTML = html;
	document.querySelector('html').style.height = '100%';
	document.querySelector('body').style.height = '100%';
	
	if (DetectIt.deviceType == 'touchOnly') {
		document.body.innerHTML += '<div id="cat" style="position: fixed; top: 50%; right: 0; bottom: 0; left: 0; z-index: 999; height:50%"></div>';
		document.querySelector("#cat").style.background = `url('/vibin.gif') bottom left / contain no-repeat`;
	} else {
		document.body.innerHTML += '<div id="cat" style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 999"></div>';
		document.querySelector("#cat").style.background = `url('/vibin.gif') bottom left / contain no-repeat`;
	}
};
function submitForm(that) {
  youtubeUrlParser(that.searchTerm.value)
}
