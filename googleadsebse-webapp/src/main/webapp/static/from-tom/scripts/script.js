WixAdSenseSettings = (function () {
    var form , select, adSizes, frame, drag;
    var populateSelect, resizeFrame;
    form = $('#form');
    select = $('#select');
    frame = $('#frame');
    drag = $('#dragMe');

    adSizes = {
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

    populateSelect = function () {
        var options = '';
        _(adSizes).each(function (value, key) {
            options += '<optgroup label="' + key + '">';
            _(value).each(function (element, index) {
                options += '<option value="' + element.width + ',' + element.height + '">' + element.name + '</option>';
            });
            options += '</optgroup>';
        });
        select.html(options);
    };

    resizeFrame = function (size) {
        frame.css(size);
        drag.css(size);

    };


    return{
        populateSelect:populateSelect,
        resizeFrame   :resizeFrame
    }
}());

$(document).ready(function () {
    var selectChange = function (event) {
        var sizearr = event.target.value.split(',');
        var size = {width: Number(sizearr[0]) + 5, height: Number(sizearr[1]) + 5};
        WixAdSenseSettings.resizeFrame(size)
    };

//    window.addEventListener('message', function (event) {
//        var eventName = event.data[0];
//        var width = event.data[1];
//        var height = event.data[2];
//
//        switch (eventName) {
//            case 'resize':
//                $('#dragMe').height(height + 5);
//                $('#dragMe').width(width + 5);
//                break;
//        }
//    });

    WixAdSenseSettings.populateSelect();
    $('#select').on('change', selectChange);
    $('#dragMe').jqResize('.jqResize');


});

