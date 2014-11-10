jQuery(function ($) {
    $(document).ready(function () {
        $('img').elevateZoom({scrollZoom : true}); // For Images in the Article
        $('aside img').elevateZoom({zoomWindowPosition: 10, zoomWindowOffetx: -10, scrollZoom : true}); // For Images in the Aside
    });
});