$(document).ready(function () {
    var $toggle = $('.nav-toggle');
    var $menu = $('.nav-menu');

    $toggle.click(function() {
      $(this).toggleClass('is-active');
      $menu.toggleClass('is-active');
    });
});

'use strict';
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}
var PhotoSubmission = function () {
    function PhotoSubmission() {
        _classCallCheck(this, PhotoSubmission);
        var inputs = document.querySelectorAll('.js-photo_submit-input');
        for (var i = 0; i < inputs.length; i++) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            inputs[i].addEventListener('change', this.uploadImage);
        }
        window.CP.exitedLoop(1);
    }
    PhotoSubmission.prototype.uploadImage = function uploadImage(e) {
        var fileInput = e.target;
        var uploadBtn = e.target.parentNode;
        var deleteBtn = e.target.parentNode.childNodes[7];
        var reader = new FileReader();
        reader.onload = function (e) {
            uploadBtn.setAttribute('style', 'background-image: url(\'' + e.target.result + '\');');
            uploadBtn.classList.add('photo_submit--image');
            fileInput.setAttribute('disabled', 'disabled');
        };
        reader.readAsDataURL(e.target.files[0]);
        deleteBtn.addEventListener('click', function () {
            uploadBtn.removeAttribute('style');
            uploadBtn.classList.remove('photo_submit--image');
            setTimeout(function () {
                fileInput.removeAttribute('disabled', 'disabled');
            }, 200);
        });
    };
    return PhotoSubmission;
}();
;
new PhotoSubmission();