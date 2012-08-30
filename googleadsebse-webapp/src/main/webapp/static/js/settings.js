/**
 * Created with IntelliJ IDEA.
 * User: daniels
 * Date: 29/08/12
 */

angular.module('settings', ['ngResource']);

function SettingsCtrl($scope, $http, $resource){

    $scope.availableTypes = window.availableTypes;

    $scope.adSizes = {
        'Text':{
            'Horizontal':[
                {name:'Leaderboard', width:728, height:90},
                {name:'Banner', width:468, height:60},
                {name:'Mobile Banner', width:320, height:50},
                {name:'Half Banner', width:234, height:60}
            ],
            'Vertical':[
                {name:'Wide Skyscraper', width:160, height:600},
                {name:'Skyscraper', width:120, height:600},
                {name:'Vertical Banner', width:160, height:240}
            ],
            'Square':[
                {name:'Square', width:250, height:250},
                {name:'Small Square', width:200, height:200},
                {name:'Large Rectangle', width:336, height:280},
                {name:'Medium Rectangle', width:300, height:250},
                {name:'Small Rectangle', width:180, height:150},
                {name:'Button', width:125, height:125, default:true}
            ]
        },
        'Link':{
            'Horizontal':[
                {name:'Horizontal Large', width:728, height:15},
                {name:'Horizontal Medium', width:468, height:15}
            ],
            'Vertical':[
                {name:'Vertical X-Large', width:200, height:90},
                {name:'Vertical Large', width:180, height:90},
                {name:'Vertical Large', width:160, height:90},
                {name:'Vertical Large', width:120, height:90}
            ]
        }
    };

    $scope.Settings = $resource(window.contentRoot + '/settings/:instanceId/:componentId', {componentId: '@widgetId.componentId', instanceId: '@widgetId.instanceId'});

    $scope.settings = $scope.Settings.get({ 'instanceId': window.widgetId.instanceId, 'componentId': window.widgetId.componentId});

    $scope.save = function(){
        $scope.settings.$save();
        Wix.closeSettings();
    }
}

/* Settings UI scripts */
function handleRadiusButtons(){
    var radios = $('ad-radius input');
    var buttons = $('.ad-radius .btn');

    buttons.click(function(event){
        buttons.removeClass('selected');
        radios.removeAttr('checked');
        $(event.target).addClass('selected');
        radios.find('#' + event.target.rel).attr('checked', 'checked');
        console.log(radios.find('#' + event.target.rel));
        event.preventDefault();
    });
}

function initColorButtons(){
    var colors = $('.color');
    colors.each(function(){
        $(this).css({'background-color': '#'+ $(this).val()});
    })
}

$(document).ready(function() {
    $("#ad-type-text").attr('checked', 'checked');
    $("[name=ad-type]").change(function(){
        if ($('#ad-type-text').attr('checked') == 'checked'){
            $('#ad-type-list').removeAttr('disabled');
        }else{
            $('#ad-type-list').attr('disabled', 'disabled');
        }
    });

    $('.settings-ad-size').tooltip({
        selector: "a[rel=tooltip]"
    });

    handleRadiusButtons();
    initColorButtons();

});
