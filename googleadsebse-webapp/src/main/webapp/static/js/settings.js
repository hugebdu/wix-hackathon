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
                    {name:'Leaderboard', width:728, height:90},
                    {name:'Banner', width:468, height:60},
                    {name:'Mobile Banner', width:320, height:50},
                    {name:'Half Banner', width:234, height:60}
                ],
                'Square':[
                    {name:'Square', width:250, height:250},
                    {name:'Small Square', width:200, height:200},
                    {name:'Large Rectangle', width:336, height:280},
                    {name:'Medium Rectangle', width:300, height:250},
                    {name:'Small Rectangle', width:180, height:150},
                    {name:'Button', width:125, height:125, default:true}
                ],
                'Vertical':[
                    {name:'Wide Skyscraper', width:160, height:600},
                    {name:'Skyscraper', width:120, height:600},
                    {name:'Vertical Banner', width:160, height:240}
                ]
            }
        },
        {
            'name':'Link',
            'items':{
                'Horizontal':[
                    {name:'Horizontal Large', width:728, height:15},
                    {name:'Horizontal Medium', width:468, height:15}
                ],
                'Vertical':[
                    {name:'Vertical X-Large', width:200, height:90},
                    {name:'Vertical Large', width:180, height:90},
                    {name:'Vertical Medium', width:160, height:90},
                    {name:'Vertical Small', width:120, height:90}
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

    $scope.getCssClass = function(fmt) {
        return $scope.settings.format == fmt ? 'selected' : '';
    };

    $scope.adSizesFlattened = _.flatten(_.map($scope.adSizes, function(t) { return _.values(t.items) }));

    _.forEach($scope.adSizesFlattened, function(item) {
        item.format =  "" + item.width + "x" + item.height + "_as";
    });

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

function handleTypeChange(){


    $("[name=ad-type]").change(function(){
        var prevValue = $('#ad-type-text').attr('prevValue');
        if ($('#ad-type-text').attr('checked') == 'checked'){
            $('#ad-type-list').removeAttr('disabled');
            $(".ad-type-link-sizes").hide();
            $(".ad-type-text-sizes").show();
            window.adTypeAngularJsHandler(prevValue ? prevValue : "text");
        }else{
            $('#ad-type-list').attr('disabled', 'disabled');
            $(".ad-type-link-sizes").show();
            $(".ad-type-text-sizes").hide();
            $('#ad-type-text').attr('prevValue', window.adTypeAngularJsHandler("link_unit"));
        }
    });

    $("#ad-type-text").attr('checked', 'checked');
    $(".ad-type-link-sizes").hide();
}

function initColorButtons(){
    var colors = $('.color');
    colors.each(function(){
        $(this).css({'background-color': '#'+ $(this).val()});
    })
}

function initTooltips(){
    $('.settings-ad-size').tooltip({
        selector: "a[rel=tooltip]"
    });
}

$(document).ready(function() {
    initTooltips();
    initColorButtons();
    handleTypeChange();
    handleRadiusButtons();
});
