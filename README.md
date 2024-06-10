# Welcome to our Duck Cloud company portfolio

### PHP 8.1.5 require 

##### to check your php version you can also run command

In your web.php;


###### Route::get('/version', function() { 
######    return app()->version(); 
###### });

then visit: http://your-app-url/version

##### for exporting SQL Cmd line
mysqldump -u root -p [your_database_name] | gzip >  "Add\Your\Path\[your_desire_name].sql.gz"


### if your storing method is wrong or getting error try this
catch (\Exception $e) {
    \Log::error('Error saving quotation: ' . $e->getMessage());
    return response()->json(['error' => 'Error saving data. Please try again.']);
}

storage/logs/laravel.log
