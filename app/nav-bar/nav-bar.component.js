angular.module('navBar').component('navBar', {
    templateUrl: 'nav-bar/nav-bar.template.html',

    controller: ['$window', '$scope', '$location', function navBarController($window, $scope, $location) {
        var self = this;
        updateNavBar($location, self);

        $scope.$on('$routeChangeSuccess', function () {
            updateNavBar($location, self);
        });

        this.signOut = function () {
            console.log("BEFORE SIGNOUT:" + firebase.auth().currentUser.displayName);
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("SIGNED OUT");
                // $location.url('/manage-classes');
                $window.location.href = '/auth';
                $location.path('/auth');
            }, function(error) {
                // An error happened.
            });
        }
    }

    ]
});

function updateNavBar(location, self) {
    self.path = location.path();
    self.url = location.url();
    self.manageClass = /manage-class$/.test(self.path);
    self.manageStudents = /manage-students$/.test(self.path);
    self.generateTest = /generate-test$/.test(self.path);
    self.about = /about$/.test(self.path);
}