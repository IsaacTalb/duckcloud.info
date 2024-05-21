# duckcloud.info

## PHP 8.1.5 require (but this project's ver is 8.83.13) no worries you can use 8.1.5

## to check your php version you can also run command

In your web.php;

Route::get('/version', function() {
    return app()->version();
});

then visit: http://your-app-url/version
