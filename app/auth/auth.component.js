angular.module('auth').component('auth', {
    templateUrl: 'auth/auth.template.html',

    controller: ['$timeout', '$scope', '$window', '$location', function generateTestController($timeout, $scope, $window, $location) {
        var self = this;

        provider = new firebase.auth.GoogleAuthProvider();
        var user = firebase.auth().currentUser;


        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                document.getElementById("authScreen").style.visibility = "visible";
                document.getElementById("loading").style.visibility = "hidden";
            } else {
                document.getElementById("authScreen").style.visibility = "hidden";
                document.getElementById("loading").style.visibility = "visible";
                $location.path('manage-class');
                // $window.location.reload();
            }
        });

        self.signIn = function () {
            firebase.auth().signInWithRedirect(provider);
        };


        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // ...
            }

            if (result.user && $location.path() == "/auth") {
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

        if (user) {
            $location.path('manage-class');
        }

    }]
});


