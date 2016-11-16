angular.module('auth').component('auth', {
    templateUrl: 'auth/auth.template.html',

    controller: ['$window', '$location', '$routeParams', function generateTestController($window, $location, $routeParams) {
        var self = this;

        provider = new firebase.auth.GoogleAuthProvider();
        var user = firebase.auth().currentUser;

        if (user) {
            document.getElementById("authScreen").innerHTML = "<h2>Loading...</h2>";
        }

        self.signIn = function () {
            // firebase.auth().signInWithRedirect(provider);
            // firebase.auth().signInWithPopup(provider).then(function(result) {
            //     // This gives you a Google Access Token. You can use it to access the Google API.
            //     var token = result.credential.accessToken;
            //     // The signed-in user info.
            //     var user = result.user;
            //     // ...
            //     // console.log("POPUP SUCCESSFUL!!!");
            //     $location.path('manage-class');
            //     $window.location.reload();
            //     // $route.reload();
            // }).catch(function(error) {
            //     // Handle Errors here.
            //     console.log("error");
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            //     // The email of the user's account used.
            //     var email = error.email;
            //     // The firebase.auth.AuthCredential type that was used.
            //     var credential = error.credential;
            //     // ...
            // });
            document.getElementById("authScreen").innerHTML = "<h2>Loading...</h2>";
            firebase.auth().signInWithRedirect(provider);
        };

        // firebase.auth().signInWithRedirect(provider);

        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }

            // $location.path('manage-class');
            // $window.location.reload();
            // The signed-in user info.
            console.log("REDIRECTED");
            console.log(result.user);
            console.log($location.path());
            if (result.user && $location.path() == "/auth") {
                // Document.getElementById("authScreen").innerHTML = "<h2>Loading...</h2>";
                console.log("redirecting");
                $location.path('/manage-class');
                $window.location.reload();
            }
            var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });

        // console.log(user);
        // console.log("logged user first");
        if (user) {
            // $location.url('/manage-class');
            console.log(user);
            $location.path('manage-class');
            // $window.location.reload();
        }
    }]
});