<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', function(){
    return view('frontend.index');
    /*return view('index', [
        'videos' => App\Models\Video::all()
    ]);*/
});

Route::get('videos', function(){
    //return view('frontend.index');
    return view('viewall', [
        'videos' => App\Models\Video::all()
    ]);
});



Route::group([
    'prefix' => 'admin',
], function(){
    /*
    |-----------------------------------------
    | ADMIN AUTH ROUTES
    |----------------------------------------- 
    */
    
    // Authentication Routes...
    Route::get('login', 'Auth\LoginController@showLoginForm')->name('admin.login');
    Route::post('login', 'Auth\LoginController@login');
    Route::post('logout', 'Auth\LoginController@logout')->name('admin.logout');
    
    // Password Reset Routes...
    Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');
    Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('admin.password.email');
    Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('admin.password.reset');
    Route::post('password/reset', 'Auth\ResetPasswordController@reset');




    Route::group([
        'middleware' => 'auth',
        'namespace' => 'Admin',
    ], function(){
        //Route::get('/', 'DashboardController@index');
        Route::get('dashboard', 'DashboardController@index')->name('admin.dashboard');
        Route::resource('live', 'LiveController', ['as' => 'admin']);
        Route::resource('video', 'VideoController', ['as' => 'admin']);
        Route::resource('publication', 'PublicationController', ['as' => 'admin']);
        Route::resource('doctor', 'DoctorController', ['as' => 'admin']);
        Route::resource('team', 'TeamController', ['as' => 'admin']);
        Route::resource('masterclass', 'MasterclassController', ['as' => 'admin']);
        Route::resource('news', 'NewsController', ['as' => 'admin']);
        Route::resource('event', 'EventController', ['as' => 'admin']);
        Route::resource('image', 'DoctorImageController', ['as' => 'admin']);
        Route::resource('user', 'UserController', ['as' => 'admin']);
        Route::get('newsletter', 'UserController@newsletter', ['as' => 'admin'])->name('admin.newsletter');
    });
});

Route::get('/home', 'HomeController@index')->name('home');

Route::get( '/{path?}', function(){
    return view( 'frontend.index' );
} )->where('path', '.*');
