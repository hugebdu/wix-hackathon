/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */

angular.module('settings', ['ngResource']);

function SettingsCtrl($scope, $http, $resource) {

    $scope.availableTypes = window.availableTypes;

    $scope.Settings = $resource(window.contentRoot + '/settings/:instanceId/:componentId', {componentId: '@widgetId.componentId', instanceId: '@widgetId.instanceId'});

    $scope.settings = $scope.Settings.get({ 'instanceId': window.widgetId.instanceId, 'componentId': window.widgetId.componentId});

    $scope.save = function() {
        $scope.settings.$save();
        Wix.closeSettings();
    }
}
