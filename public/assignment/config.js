"use strict";
(function() 
{
  angular
    .module("FormBuilderApp")
    .config(Config);
    
  function Config($routeProvider) {
    $routeProvider
        .when("/home", {
          templateUrl: "home/home.view.html"
        })
        .when("/form", {
          templateUrl: "form/form.view.html",
          controller: "FormController"
        })
        .when("/register", {
          templateUrl: "register/register.view.html",
          controller: "RegisterController"
        })
        .when("/login", {
          templateUrl: "login/login.view.html",
          controller: "LoginController"
        })
        .when("/profile", {
          templateUrl: "profile/profile.view.html",
          controller: "ProfileController"
        })
        .otherwise({
          redirectTo: "/home"
        });
     
  }
  
})();