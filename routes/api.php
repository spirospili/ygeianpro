<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('subscribe', 'Frontend\AuthController@subscribe');
Route::post('invite', 'Frontend\AuthController@invite');
Route::resource('doctors', 'Frontend\DoctorController');
Route::get('live/session', 'Frontend\LiveSessionController@index');
Route::get('search', 'Frontend\SearchController@index');
Route::resource('videos', 'Frontend\VideoController');
Route::resource('publications', 'Frontend\PublicationController');
Route::resource('news', 'Frontend\NewsController');
Route::resource('teams', 'Frontend\TeamController');
Route::resource('hospitals', 'Frontend\HospitalController');
Route::resource('events', 'Frontend\EventController');
Route::resource('masterclasses', 'Frontend\MasterclassController');
Route::post('contact', 'Frontend\AuthController@contact');

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Frontend\AuthController@login');
    Route::post('signup', 'Frontend\AuthController@register');
    Route::post('forgot', 'Frontend\AuthController@sendResetLinkEmail');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'Frontend\AuthController@logout');
        Route::get('user', 'Frontend\AuthController@user');
        Route::resource('profile', 'Frontend\UserProfileController');
        //Route::resource('doctor', 'Frontend\DoctorProfileController');
    });
});