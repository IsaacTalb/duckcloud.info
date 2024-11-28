# Welcome to our Duck Cloud company portfolio

### PHP 8.1.5 require 

### ways to install PHP8.1.5 on Ubuntu

sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.1  (you can either install 8.1 or specific versions)

### FYI

PPA (Personal Package Archive) are used to include a specific software to your Ubuntu, Kubuntu or any other PPA compatible distro. The "safeness" of a PPA depends mostly on 3 things:

Who made the PPA - An official PPA from WINE or LibreOffice like ppa:libreoffice/ppa and a PPA that I created myself are not the same. You do not know me as a PPA maintainer, so the trust issue and safety is VERY low for me (Since I could have made a corrupted package, incompatible package or anything else bad), but for LibreOffice and the PPA they offer in their website, THAT gives a certain safety net to it. So depending on who made the PPA, how long he or she has been making and maintaining the PPA will influence a little bit on how safe the PPA is for you. PPA's as mentioned above in the comments are not certified by Canonical.

How many users have used the PPA - For example, I have a PPA from http://winehq.org in my personal PPA. Would you trust ME with 10 users that confirm using my PPA having 6 of them saying it sucks than to the one Scott Ritchie offers as ppa:ubuntu-wine/ppa in the official winehq website. It has thousands of users (including me) that use his PPA and trust his work. This is work that has several years behind it.

You can check the number of downloads from a PPA with the PPA Stats webpage.

How updated the PPA is - Let us say you are using Ubuntu 10.04 or 10.10, and you want to use THAT special PPA. You find out that the last update to that PPA was 20 years ago.. O.o. The chances you have on using THAT PPA are null. Why?. Because the package dependencies that PPA needs are very old and maybe the updated ones change so much code that they wont work with the PPA and possibly break your system if you install any of the packages of that PPA to your system.

How updated a PPA influences the decision to use it if he/she wants to use THAT PPA. If not they would rather go look for another one more up to date. You do not want Banshee 0.1 or Wine 0.0.0.1 or OpenOffice 0.1 Beta Alpha Omega Thundercat Edition with the latest Ubuntu. What you want is a PPA that is updated to your current Ubuntu. Remember that a PPA mentions for what Ubuntu version is made for or multiple Ubuntu versions was made for.

##### to check your php version you can also run command

In your web.php;


###### Route::get('/version', function() { 
######    return app()->version(); 
###### });

then visit: http://your-app-url/version


##### After that set php version as 8.1
sudo update-alternatives --set php /usr/bin/php8.1


##### Install or Enable the Required PHP Extensions
If pdo_mysql is missing, install it for your PHP version:

sudo apt install php8.1-mysql
After installation, restart your web server:

For Apache:

sudo systemctl restart apache2

For Nginx:

sudo systemctl restart php8.1-fpm
sudo systemctl restart nginx

#### Clear Laravel Cache
Sometimes, cached configurations can cause issues. Clear your Laravel configuration and cache:

php artisan config:clear
php artisan cache:clear
php artisan config:cache

#### Retry the Migration
Run the migration command again:


php artisan migrate



##### for exporting SQL Cmd line
mysqldump -u root -p [your_database_name] | gzip >  "Add\Your\Path\[your_desire_name].sql.gz"


### if your storing method is wrong or getting error try this
catch (\Exception $e) {
    \Log::error('Error saving quotation: ' . $e->getMessage());
    return response()->json(['error' => 'Error saving data. Please try again.']);
}

storage/logs/laravel.log


mysqldump -u root -p duckcloud.info | gzip >  path\to\your\backup\folder\quotation.sql.gz
