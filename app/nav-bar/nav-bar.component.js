angular.module('navBar').component('navBar', {
    templateUrl: 'nav-bar/nav-bar.template.html',

    controller: ['$scope', '$location', function navBarController($scope, $location) {
        var self = this;
        updateNavBar($location, self);

        $scope.$on('$routeChangeSuccess', function () {
            updateNavBar($location, self);
        });
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