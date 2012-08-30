/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */

angular.module('settings', ['ngResource']);

function SettingsCtrl($scope, $http, $resource){

    $scope.availableTypes = window.availableTypes;

    $scope.adUnitTypes = [
        {"id": "text", "label": "Text Only (default)"},
        {"id": "text_image", "label": "Text and Image"},
        {"id": "image", "label": "Image Only"}
    ];

    $scope.adSizes = [
        {
            'name':'Text',
            'items':{
                'Horizontal':[
                    {name:'Leaderboard', width:728, height:90, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Banner', width:468, height:60, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Mobile Banner', width:320, height:50, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Half Banner', width:234, height:60, 'format':  "" + this.width + "x" + this.height + "_as"}
                ],
                'Square':[
                    {name:'Square', width:250, height:250, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Small Square', width:200, height:200, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Large Rectangle', width:336, height:280, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Medium Rectangle', width:300, height:250, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Small Rectangle', width:180, height:150, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Button', width:125, height:125, default:true, 'format':  "" + this.width + "x" + this.height + "_as"}
                ],
                'Vertical':[
                    {name:'Wide Skyscraper', width:160, height:600, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Skyscraper', width:120, height:600, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Vertical Banner', width:160, height:240, 'format':  "" + this.width + "x" + this.height + "_as"}
                ]
            }
        },
        {
            'name':'Link',
            'items':{
                'Horizontal':[
                    {name:'Horizontal Large', width:728, height:15, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Horizontal Medium', width:468, height:15, 'format':  "" + this.width + "x" + this.height + "_as"}
                ],
                'Vertical':[
                    {name:'Vertical X-Large', width:200, height:90, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Vertical Large', width:180, height:90, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Vertical Medium', width:160, height:90, 'format':  "" + this.width + "x" + this.height + "_as"},
                    {name:'Vertical Small', width:120, height:90, 'format':  "" + this.width + "x" + this.height + "_as"}
                ]
            }
        }
    ];

    window.adTypeAngularJsHandler = function(type) {
        var prevValue = undefined;
        $scope.$apply(function() {
            prevValue = $scope.settings.adType;
            $scope.settings.adType = type;
        });
        return prevValue;
    };

    $scope.adSizesFlattened = _.flatten(_.map($scope.adSizes, function(t) { return _.values(t.items) }));

    $scope.Settings = $resource(window.contentRoot + '/settings/:instanceId/:componentId', {componentId: '@widgetId.componentId', instanceId: '@widgetId.instanceId'});

    $scope.settings = $scope.Settings.get({ 'instanceId': window.widgetId.instanceId, 'componentId': window.widgetId.componentId});

    $scope.save = function(){
        $scope.settings.$save();
        Wix.closeSettings();
    }

    $scope.picked = function(name) {
        var item = _.find($scope.adSizesFlattened, function(o) { return o.name == name});
        $scope.settings.width = item.width;
        $scope.settings.height = item.height;
        $scope.settings.format = item.format;
    }
}

/* Settings UI scripts */

$(document).ready(function() {

    var prevValue = undefined;

    $("[name=ad-type]").change(function(){
        if ($('#ad-type-text').attr('checked') == 'checked'){
            $('#ad-type-list').removeAttr('disabled');
            $(".ad-type-link-sizes").hide();
            $(".ad-type-text-sizes").show();
            window.adTypeAngularJsHandler(prevValue ? prevValue : "text");
        }else{
            $('#ad-type-list').attr('disabled', 'disabled');
            $(".ad-type-link-sizes").show();
            $(".ad-type-text-sizes").hide();
            prevValue = window.adTypeAngularJsHandler("link_unit");
        }
    });

    $("#ad-type-text").attr('checked', 'checked');
    $(".ad-type-link-sizes").hide();

    $('.settings-ad-size').tooltip({
        selector: "a[rel=tooltip]"
    });
});
