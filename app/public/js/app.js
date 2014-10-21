(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./browser/js/main.js":[function(require,module,exports){
require('./controller');
},{"./controller":"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/index.js"}],"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/TadaController.js":[function(require,module,exports){
'use strict';
module.exports = function($scope, Restangular) {
    alert('ok');
};
},{}],"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/index.js":[function(require,module,exports){
'use strict';
var app = angular.module('tada', ['restangular']);

app.controller('TadaController', require('./TadaController'));
},{"./TadaController":"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/TadaController.js"}]},{},["./browser/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2Jyb3dzZXIvanMvbWFpbi5qcyIsIi9Vc2Vycy95dmFud2liYXV4Mi9Xb3Jrc3BhY2Uvd2VsZWFuMy10YWRhL2FwcC9icm93c2VyL2pzL2NvbnRyb2xsZXIvVGFkYUNvbnRyb2xsZXIuanMiLCIvVXNlcnMveXZhbndpYmF1eDIvV29ya3NwYWNlL3dlbGVhbjMtdGFkYS9hcHAvYnJvd3Nlci9qcy9jb250cm9sbGVyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9jb250cm9sbGVyJyk7IiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc2NvcGUsIFJlc3Rhbmd1bGFyKSB7XG4gICAgYWxlcnQoJ29rJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgndGFkYScsIFsncmVzdGFuZ3VsYXInXSk7XG5cbmFwcC5jb250cm9sbGVyKCdUYWRhQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vVGFkYUNvbnRyb2xsZXInKSk7Il19
