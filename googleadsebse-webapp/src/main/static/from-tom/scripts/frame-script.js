WixAdSense = (function () {
    var win, ad, selectedAdSize, adSizes, adType;
    var getWindowSize, fitAdToWindow, fitWindowToAd;

    win = $(window);
    ad = $('#ad');
    adSizes = {
        default:{name:'Button', width:125, height:125},
        text   :[

            //Horizontal
            {name:'Leaderboard', width:728, height:90},
            {name:'Banner', width:468, height:60},
            {name:'Mobile Banner', width:320, height:50},
            {name:'Half Banner', width:234, height:60},

            //Vertical
            {name:'Wide Skyscraper', width:160, height:600},
            {name:'Skyscraper', width:120, height:600},
            {name:'Vertical Banner', width:160, height:240},

            //Square
            {name:'Square', width:250, height:250},
            {name:'Small Square', width:200, height:200},
            {name:'Large Rectangle', width:336, height:280},
            {name:'Medium Rectangle', width:300, height:250},
            {name:'Small Rectangle', width:180, height:150},
            {name:'Button', width:125, height:125}
        ],
        link   :[
            {name:'Horizontal Large', width:728, height:15},
            {name:'Horizontal Medium', width:468, height:15},
            {name:'Vertical X-Large', width:200, height:90},
            {name:'Vertical Large', width:180, height:90},
            {name:'Vertical Large', width:160, height:90},
            {name:'Vertical Large', width:120, height:90}
        ]

    };
    selectedAdSize = adSizes.default;
    adType = 'text';

    getWindowSize = function () {
        var size = {
            width :win.width(),
            height:win.height()
        };
        return size;
    };

    fitAdToWindow = function () {
        var winSize = getWindowSize();
        var ads = adSizes[adType];
        selectedAdSize = _.chain(ads)
            .filter(function (item) {
                        return (item.width <= winSize.width) && (item.height <= winSize.height);
                    })
            .reduce(function (prev, next) {
                        var nextWins = (prev.width * prev.height) < (next.width * next.height);
                        return (nextWins) ? next : prev;
                    }, adSizes.default)
            .value();

        ad.css(selectedAdSize);
        ad.html(selectedAdSize.name + '</br>' + selectedAdSize.width + 'X' + selectedAdSize.height);
    };

    fitWindowToAd = function () {
        window.parent.postMessage(['resize', selectedAdSize.width, selectedAdSize.height], '*');
    };

    return{
        fitAdToWindow:fitAdToWindow,
        fitWindowToAd:fitWindowToAd
    };

}());

$(document).ready(function () {
    $(window).on('resize', WixAdSense.fitAdToWindow);
    WixAdSense.fitAdToWindow();
    //WixAdSense.fitWindowToAd();
});
