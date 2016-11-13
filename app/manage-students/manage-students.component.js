/*angular.module('manageStudents').component('manageStudents', {
    templateUrl: 'manage-students/manage-students.template.html',

    controller: [function manageStudentsController() {
        var self = this;
    }]
});*/

angular.module('manageStudents').component('manageStudents', {
    templateUrl: 'manage-students/manage-students.template.html',

    controller: ['$firebaseObject', function manageStudentsController($firebaseObject) {
        var self = this;
        self.classRef = firebase.database().ref().child("root/debug/class");
        self.studentsRef = self.classRef.child("Students");
        self.categoriesRef = self.classRef.child("categories");
        self.studentsObject = $firebaseObject(self.studentsRef);
        self.categoriesObject = $firebaseObject(self.categoriesRef);

        self.grades = [];
        self.students = [];

        self.studentsRef.on('child_added', function (studentsSnapshot, prevChildKey) {
            // add listener for getting appropriate questions
            self.studentsRef.child(studentsSnapshot.getKey()).on('child_added', function (studentSnapshot, prevChildKey) {
                console.log(studentsSnapshot.getKey(), studentSnapshot.getKey(), studentSnapshot.val());
                self.students.push(studentsSnapshot.getKey());
                self.categories.push({
                    "name:": studentsSnapshot.getKey(),
                    "category": studentSnapshot.getKey(),
                    "grade": studentSnapshot.val()
                });
            });
        });
    }]
});