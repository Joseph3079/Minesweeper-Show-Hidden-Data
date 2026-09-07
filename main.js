// ==UserScript==
// @name         Minesweeper Show Hidden Data
// @namespace    http://tampermonkey.net/
// @version      2026-09-06
// @description  try to take over the world!
// @author       Joseph3079
// @run-at       document-start
// @match        https://*.minesweeper.online/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const mmrToRating = e => !e || e <= 850 ? 0 : e < 1100 ? Math.floor((e - 850) / 5) : Math.floor((e - 1e3) / 2);
    const xmmrs = {};

    const waitForTable = function() {
        if (document.querySelectorAll('#MultiplayerBlock #StatTableBlock #stat_table tbody tr').length == 10 && document.querySelectorAll('#MultiplayerBlock #StatTableBlock #stat_table tbody tr')[0].children[2].innerHTML.split('(').length == 2) {
            document.querySelectorAll('#MultiplayerBlock #StatTableBlock #stat_table tbody tr').forEach(i => {
                const id = i.children[1].querySelector('a').getAttribute('href').split('/').pop();
                const rating = xmmrs[id];
                if (rating) {
                    i.children[2].innerHTML += ` (${rating})`;
                }
            });
        }
        else {
            setTimeout(waitForTable,10);
        }
    }
    const formatNum = function (num) {
        var currStr = num.toString()
        const len = currStr.length;
        var i=len;
        while (i>3) {
            currStr = currStr.substr(0,i-3) + ' ' + currStr.substr(i-3);
            i-=3;
        }
        return currStr;
    }
    const getGem = function(s) {
        let a = '💎';
        let e = s;
        return e == 1 ? a = '🟠' : e == 2 ? a = '🔻️' : e == 3 ? a = '🔵️' : e == 4 ? a = '🟣️' : e == 5 ? a = '⚫️' : e == 6 ? a = '💠️' : 7 ? a = '🌵️' : 8 ? a = '🔴️' : 9 &&
        (a = '🟢️'),
        s ||
        (s = ''),
        e == - 1 ? '<img src="/img/gems/random.svg" class="gem ' + s + '" alt="' + a + '"/>' : '<img src="/img/gems/' + e + '.svg" class="gem gem' + e + ' ' + s + '" alt="' + a + '"/>'
      }
    window.flipStatistics = function() {
        if(document.getElementById('current_season').checked) {showStatistics(seasonObject);}
        else {showStatistics(allTimeObject);}
    }
    const showStatistics = function(s) {
        jQuery('#aggregate').empty();
        let a = Math.round(s.timeAll / 1000 / 3600 * 10) / 10;
        let gemTable = document.createElement('table', {
            class : 'gems-popover-table'
        });

        gemTable.setAttribute('id','gemTable');
        let acTable = document.createElement('table', {
            class : 'gems-popover-table'
        });
        acTable.setAttribute('id','acTable');

        a >= 10 &&
            (a = Math.round(a));
        let r = s.extraStat ? s.extraStat : {
        },
            l = (r.qd ? r.qd : 0) + (r.qs ? r.qs : 0) + (r.qe ? r.qe : 0),
            z = 0;
        for (let C = 1; C <= 8; C++) r['a' + C] &&
            (z += r['a' + C]),
            r['a' + C + 'e'] &&
            (z += r['a' + C + 'e']);
        let c = (r.eg ? r.eg : 0) + (r.eq ? r.eq : 0) + (r.ea ? r.ea : 0),
            d = (r.cg ? r.cg : 0) + (r.cq ? r.cq : 0) + (r.ca ? r.ca : 0) + (r.cs ? r.cs : 0),
            m = 0,
            f = {};
        var totalGems = 0;
        for (let C of [2,3,1,4,5,6,7,8,9,10]) r['g' + C] &&
            (m += r['g' + C], f[C] = r['g' + C], totalGems += r['g' + C]);
        let b = 0;
        for (let C = 1; C <= 8; C++) r['t' + C] &&
            (b += r['t' + C]);
        let A = (r.acg ? r.acg : 0) + (r.acq ? r.acq : 0) + (r.aca ? r.aca : 0),
            v = (r.eig ? r.eig : 0) + (r.eiq ? r.eiq : 0) + (r.eia ? r.eia : 0) + (r.eic ? r.eic : 0);
        let E = 0,
            x = {};
        for (let C of [42,43,41,44,45,46,47,48,49,50,40]) r['arc' + (C - 40)] &&
            (E += r['arc' + (C - 40)], x[C] = r['arc' + (C - 40)]);
        jQuery('#aggregate').append(
            jQuery('<div>', {
                class : 'row'
            }).append(
                jQuery('<div>', {
                    class : 'col-md-6 col-xs-12'
                }).css('margin-bottom', '10px').append(
                    'Total games played: <strong>' + formatNum(s.games) + '</strong>',
                    '<br/>',
                    'Total wins: <strong>' + formatNum(s.winsAll) + '</strong> ',
                    s.games > 0 ? '(' + Math.round(s.winsAll / s.games * 1000) / 10 + '%)' : '',
                    '<br/>',
                    'Total time: <strong>' + formatNum(a) + '</strong> ' + (a > 0 ? 'hours' : ''),
                    '<br/>',
                    'Quests completed: ',
                    l ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(l)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            'Daily quests: ',
                            formatNum(r.qd ? r.qd : 0),
                            '<br/>',
                            'Season quests: ',
                            formatNum(r.qs ? r.qs : 0),
                            '<br/>',
                            'Event quests: ',
                            formatNum(r.qe ? r.qe : 0)
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    'Arenas completed: ',
                    z ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(z)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            (
                                () => {
                                    let C = jQuery('<table>');
                                    for (let q = 1; q <= 8; q++) if (r['a' + q] || r['a' + q + 'e']) {
                                        let D = jQuery('<tr>');
                                        r['a' + q] ? D.append(jQuery('<td>').append('L' + q + ': ', formatNum(r['a' + q]))) : D.append(jQuery('<td>').append('&nbsp;')),
                                            r['a' + q + 'e'] ? D.append(
                                            jQuery('<td>').append('&nbsp;&nbsp; L' + q + 'E' + ': ', formatNum(r['a' + q + 'e']))
                                        ) : D.append(jQuery('<td>').append('&nbsp;')),
                                            C.append(D)
                                    }
                                    return C
                                }
                            ) ()
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    '3BV solved: <strong>' + formatNum(s.bbbvAll ? s.bbbvAll : 0) + '</strong>',
                    '<br/>'
                ),
                jQuery('<div>', {
                    class : 'col-md-6 col-xs-12'
                }).append(
                    'Experience: ',
                    c ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(c)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            'Games: ',
                            formatNum(r.eg ? r.eg : 0),
                            '<br/>',
                            'Quests: ',
                            formatNum(r.eq ? r.eq : 0),
                            '<br/>',
                            'Arena: ',
                            formatNum(r.ea ? r.ea : 0)
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    'Minecoins: ',
                    d ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(d)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            'Games: ',
                            formatNum(r.cg ? r.cg : 0),
                            '<br/>',
                            'Quests: ',
                            formatNum(r.cq ? r.cq : 0),
                            '<br/>',
                            'Arena: ',
                            formatNum(r.ca ? r.ca : 0),
                            '<br/>',
                            'Season rewards: ',
                            formatNum(r.cs ? r.cs : 0)
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    'Gems: ',
                    m ? jQuery('<span>', {
                        id : 'gemElement',
                        class : 'bold'
                    }).append(formatNum(totalGems)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: gemTable}) : '<strong>0</strong>',
                    '<br/>',
                    'Arena tickets: ',
                    b ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(b)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            (
                                () => {
                                    let C = [];
                                    for (let q = 1; q <= 8; q++) r['t' + q] &&
                                        C.push(jQuery('<span>').append('L' + q + ': ', formatNum(r['t' + q])), '<br/>');
                                    return C
                                }
                            ) ()
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    'Activity: ',
                    A ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(A)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            'Games: ',
                            formatNum(r.acg ? r.acg : 0),
                            '<br/>',
                            'Quests: ',
                            formatNum(r.acq ? r.acq : 0),
                            '<br/>',
                            'Arena: ',
                            formatNum(r.aca ? r.aca : 0),
                            '<br/>'
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    'Event points: ',
                    v ? jQuery('<span>', {
                        class : 'help bold dotted-underline'
                    }).append(formatNum(v)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: jQuery('<div>', {
                            class : 'custom-popover-content'
                        }).append(
                            r.eig ? jQuery('<div>').append('Games: ', formatNum(r.eig ? r.eig : 0)) : '',
                            r.eiq ? jQuery('<div>').append('Quests: ', formatNum(r.eiq ? r.eiq : 0)) : '',
                            r.eia ? jQuery('<div>').append('Arena: ', formatNum(r.eia ? r.eia : 0)) : '',
                            r.eic ? jQuery('<div>').append('Championship: ', formatNum(r.eic ? r.eic : 0)) : ''
                        )
                    }) : '<strong>0</strong>',
                    '<br/>',
                    'Arena coins: ',
                    E ? jQuery('<span>', {
                        id : 'acElement',
                        class : 'bold'
                    }).append(formatNum(s.arenaCoinsAll)).popover({
                        trigger: 'hover',
                        placement: 'top',
                        html: !0,
                        content: acTable}) : '<strong>0</strong>',
                    '<br/>'
                )
            ),
            '<br/>'
        )
        $('#gemElement').popover('show');
        let gemArray = ['Topaz','Ruby','Sapphire','Amethyst','Onyx','Aquamarine','Emerald','Garnet','Jade','Diamond'];
        for (let c of [2,3,1,4,5,6,7,8,9,10]) {
            if(s.extraStat['g'+c]) {
                jQuery('#gemTable').append(
                    jQuery('<tr>').append(
                        jQuery('<td>', {
                            class : 'text-right text-nowrap'
                        }).append(formatNum(s.extraStat['g'+c])),
                        jQuery('<td>', {
                            class : 'text-center'
                        }).append(getGem(c)),
                        jQuery('<td>', {
                            class : 'text-nowrap'
                        }).append(gemArray[c-1])
                    )
                );
            }
        }
        $('#gemElement').popover('hide');
        $('#acElement').popover('show');
        let acArray = ['Old arena coins','Gold coins','Copper coins','Silver coins','Nickel coins','Steel coins','Iron coins','Palladium coins','Titanium coins','Zinc coins','Platinum coins'];
        for (let c of [42,43,41,44,45,46,47,48,49,50,40]) {
            if(s.extraStat['arc'+(c-40)]) {
                jQuery('#acTable').append(
                    jQuery('<tr>').append(
                        jQuery('<td>', {
                            class : 'text-right text-nowrap'
                        }).append(formatNum(s.extraStat['arc'+(c-40)])),
                        jQuery('<td>', {
                            class : 'text-center'
                        }).append('<img src="/img/arena-coins/' + c + '.svg" class="arena-coin-icon ' + c + '" alt="📀"/>'),
                        jQuery('<td>', {
                            class : 'text-nowrap'
                        }).append(acArray[c-40])
                    )
                );
            }
        }
        $('#acElement').popover('hide');
    }
    window.toggleArenas = function() {
        var arenaTypes = ['Speed','Speed NG','No Flags','Efficiency','High Difficulty','Random Difficulty','Hardcore','Hardcore NG','Endurance','Nightmare'];
        if(document.getElementById('specificArenas').innerText.length > 0) {document.getElementById('specificArenas').innerHTML = '';}
        else {
            var currentDate = [];
            document.getElementById('specificArenas').innerHTML = '<style>display: flex; justify-content: center</style>';
            //console.log(arenaResults);
            for(var i=0; i<arenaResults.length; i++) {
                currentDate[i] = new Date(arenaResults[i].finishedAt);
                currNode = document.createElement('span');
                currNode.id = 'arena' + i;
                currNode.innerHTML = '<span><span class="custom-popover" data-original-title="" title=""><a class="ticket'+(Math.floor(arenaResults[i].type/10)-10).toString()+'" href="/arena/'+arenaResults[i].id+'"><i class="fa fa-ticket ticket"></i>L'+arenaResults[i].type%10+(arenaResults[i].mode?'E':'')+'</a></span>&nbsp;&nbsp;</span>';
                /*$(currNode).popover({
                    trigger: "hover",
                    placement: "top",
                    html: !0,
                    content: () => 'Type: ' + arenaTypes[Math.floor(arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].type/10)-11]
                    + '<br>Level: L' + arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].type%10+(arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].mode?'E':'')
                    + '<br>Time: <b>' + Math.floor(arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].duration/3600000).toString().padStart(2, "0") + ':' + Math.floor(arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].duration/60000%60).toString().padStart(2, "0") + ':' + Math.floor(arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].duration/1000%60).toString().padStart(2, "0") + '</b>.' + Math.floor(arenaResults[this.children[0].children[0].children[0].classList[0].substr(6)-1].duration%1000).toString().padStart(3, "0")
                    + '<br><span class="gray">' + currentDate[this.children[0].children[0].children[0].classList[0].substr(6)-1].getDate() + ' ' + monthArray[currentDate[this.children[0].children[0].children[0].classList[0].substr(6)-1].getMonth()] + ' ' + currentDate[this.children[0].children[0].children[0].classList[0].substr(6)-1].getFullYear() + ', ' + currentDate[this.children[0].children[0].children[0].classList[0].substr(6)-1].getHours().toString().padStart(2, "0") + ':' + currentDate[this.children[0].children[0].children[0].classList[0].substr(6)-1].getMinutes().toString().padStart(2, "0") + '</span>'
                });*/
                $(currNode).click(function(r){r.preventDefault(),history.pushState(null, null, this.children[0].children[0].children[0].href),history.go(-1),history.go(1)});
                document.getElementById('specificArenas').childNodes[document.getElementById('specificArenas').childNodes.length-1].after(currNode);
            }
        }
    }

    var allTimeObject, seasonObject, currNode, arenaResults;
    var diffArray = ['','Beginner','Intermediate','Expert','Custom'];
    var monthArray = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var masterySkillPoints = [{"level":3,"mastery":60,"points":43005003},{"level":2,"mastery":100,"points":42477502},{"level":3,"mastery":59,"points":41950003},{"level":2,"mastery":99,"points":41427002},{"level":3,"mastery":58,"points":40904003},{"level":2,"mastery":98,"points":40386502},{"level":3,"mastery":57,"points":39869003},{"level":2,"mastery":97,"points":39357002},{"level":3,"mastery":56,"points":38845003},{"level":2,"mastery":96,"points":38338002},{"level":3,"mastery":55,"points":37831003},{"level":2,"mastery":95,"points":37329002},{"level":3,"mastery":54,"points":36827003},{"level":2,"mastery":94,"points":36660002},{"level":3,"mastery":53,"points":35833003},{"level":2,"mastery":93,"points":35332002},{"level":3,"mastery":52,"points":34851003},{"level":2,"mastery":92,"points":33919002},{"level":3,"mastery":51,"points":33876003},{"level":3,"mastery":50,"points":32916003},{"level":2,"mastery":91,"points":32139002},{"level":3,"mastery":49,"points":31961003},{"level":3,"mastery":48,"points":31021003},{"level":2,"mastery":90,"points":30426002},{"level":3,"mastery":47,"points":30087003},{"level":3,"mastery":46,"points":29164003},{"level":2,"mastery":89,"points":28896002},{"level":3,"mastery":45,"points":28259003},{"level":2,"mastery":88,"points":27430002},{"level":3,"mastery":44,"points":27359003},{"level":3,"mastery":43,"points":26466003},{"level":2,"mastery":87,"points":26058002},{"level":3,"mastery":42,"points":25583003},{"level":2,"mastery":86,"points":24741002},{"level":3,"mastery":41,"points":24713003},{"level":3,"mastery":40,"points":23847003},{"level":1,"mastery":100,"points":23847001},{"level":2,"mastery":85,"points":23519002},{"level":3,"mastery":39,"points":22989003},{"level":2,"mastery":84,"points":22328002},{"level":3,"mastery":38,"points":22144003},{"level":3,"mastery":37,"points":21305003},{"level":2,"mastery":83,"points":20873002},{"level":3,"mastery":36,"points":20476003},{"level":1,"mastery":99,"points":20157001},{"level":3,"mastery":35,"points":19648003},{"level":2,"mastery":82,"points":19528002},{"level":3,"mastery":34,"points":18834003},{"level":2,"mastery":81,"points":18336002},{"level":3,"mastery":33,"points":18023003},{"level":2,"mastery":80,"points":17285002},{"level":3,"mastery":32,"points":17218003},{"level":3,"mastery":31,"points":16421003},{"level":2,"mastery":79,"points":16133002},{"level":3,"mastery":30,"points":15632003},{"level":1,"mastery":98,"points":15547001},{"level":2,"mastery":78,"points":14998002},{"level":3,"mastery":29,"points":14853003},{"level":3,"mastery":28,"points":14072003},{"level":2,"mastery":77,"points":13944002},{"level":3,"mastery":27,"points":13303003},{"level":2,"mastery":76,"points":12993002},{"level":3,"mastery":26,"points":12808003},{"level":1,"mastery":97,"points":12384001},{"level":2,"mastery":75,"points":12138002},{"level":3,"mastery":25,"points":11812003},{"level":2,"mastery":74,"points":11367002},{"level":3,"mastery":24,"points":11037003},{"level":2,"mastery":73,"points":10666002},{"level":1,"mastery":96,"points":10430001},{"level":3,"mastery":23,"points":10319003},{"level":2,"mastery":72,"points":9998002},{"level":3,"mastery":22,"points":9609003},{"level":2,"mastery":71,"points":9376002},{"level":3,"mastery":21,"points":8911003},{"level":2,"mastery":70,"points":8694002},{"level":1,"mastery":95,"points":8599001},{"level":3,"mastery":20,"points":8220003},{"level":2,"mastery":69,"points":7966002},{"level":3,"mastery":19,"points":7533003},{"level":2,"mastery":68,"points":7319002},{"level":1,"mastery":94,"points":7147001},{"level":3,"mastery":18,"points":6854003},{"level":2,"mastery":67,"points":6737002},{"level":3,"mastery":17,"points":6383003},{"level":2,"mastery":66,"points":6229002},{"level":1,"mastery":93,"points":5850001},{"level":3,"mastery":16,"points":5753003},{"level":2,"mastery":65,"points":5745002},{"level":2,"mastery":64,"points":5312002},{"level":3,"mastery":15,"points":5155003},{"level":2,"mastery":63,"points":5011002},{"level":2,"mastery":62,"points":4705002},{"level":3,"mastery":14,"points":4566003},{"level":2,"mastery":61,"points":4419002},{"level":2,"mastery":60,"points":4148002},{"level":1,"mastery":92,"points":4125001},{"level":3,"mastery":13,"points":4001003},{"level":2,"mastery":59,"points":3896002},{"level":3,"mastery":12,"points":3484003},{"level":2,"mastery":58,"points":3424002},{"level":2,"mastery":57,"points":2989002},{"level":3,"mastery":11,"points":2961003},{"level":1,"mastery":91,"points":2809001},{"level":2,"mastery":56,"points":2579002},{"level":3,"mastery":10,"points":2480003},{"level":2,"mastery":55,"points":2219002},{"level":3,"mastery":9,"points":2057003},{"level":2,"mastery":54,"points":1883002},{"level":1,"mastery":90,"points":1834001},{"level":3,"mastery":8,"points":1608003},{"level":2,"mastery":53,"points":1597002},{"level":2,"mastery":52,"points":1322002},{"level":3,"mastery":7,"points":1238003},{"level":1,"mastery":89,"points":1139001},{"level":2,"mastery":51,"points":1078002},{"level":3,"mastery":6,"points":917003},{"level":2,"mastery":50,"points":869002},{"level":2,"mastery":49,"points":680002},{"level":1,"mastery":88,"points":661001},{"level":3,"mastery":5,"points":632003},{"level":2,"mastery":48,"points":630002},{"level":2,"mastery":47,"points":587002},{"level":1,"mastery":87,"points":554001},{"level":2,"mastery":46,"points":541002},{"level":2,"mastery":45,"points":498002},{"level":1,"mastery":86,"points":463001},{"level":2,"mastery":44,"points":459002},{"level":2,"mastery":43,"points":421002},{"level":1,"mastery":85,"points":385001},{"level":2,"mastery":42,"points":383002},{"level":3,"mastery":4,"points":370003},{"level":2,"mastery":41,"points":342002},{"level":1,"mastery":84,"points":342001},{"level":2,"mastery":40,"points":303002},{"level":1,"mastery":83,"points":299001},{"level":1,"mastery":82,"points":277001},{"level":1,"mastery":81,"points":271001},{"level":2,"mastery":39,"points":263002},{"level":1,"mastery":80,"points":255001},{"level":1,"mastery":79,"points":241001},{"level":2,"mastery":38,"points":221002},{"level":1,"mastery":78,"points":213001},{"level":2,"mastery":37,"points":189002},{"level":1,"mastery":77,"points":161001},{"level":2,"mastery":36,"points":160002},{"level":2,"mastery":35,"points":133002},{"level":3,"mastery":3,"points":130003},{"level":1,"mastery":76,"points":115001},{"level":2,"mastery":34,"points":110002},{"level":2,"mastery":33,"points":89002},{"level":1,"mastery":75,"points":89001},{"level":2,"mastery":32,"points":73002},{"level":1,"mastery":74,"points":67001},{"level":2,"mastery":31,"points":59002},{"level":2,"mastery":30,"points":53002},{"level":1,"mastery":73,"points":53001},{"level":2,"mastery":29,"points":47002},{"level":1,"mastery":72,"points":42001},{"level":2,"mastery":28,"points":41002},{"level":2,"mastery":27,"points":36002},{"level":1,"mastery":71,"points":33001},{"level":3,"mastery":2,"points":31003},{"level":2,"mastery":26,"points":31002},{"level":2,"mastery":25,"points":26002},{"level":1,"mastery":70,"points":24001},{"level":2,"mastery":24,"points":21002},{"level":2,"mastery":23,"points":16002},{"level":1,"mastery":69,"points":16001},{"level":2,"mastery":22,"points":13002},{"level":1,"mastery":68,"points":12001},{"level":2,"mastery":21,"points":11002},{"level":2,"mastery":20,"points":9002},{"level":1,"mastery":67,"points":9001},{"level":2,"mastery":19,"points":7002},{"level":1,"mastery":66,"points":6001},{"level":2,"mastery":18,"points":5002},{"level":1,"mastery":65,"points":4001},{"level":2,"mastery":17,"points":3002},{"level":2,"mastery":16,"points":2002},{"level":1,"mastery":64,"points":2001},{"level":2,"mastery":15,"points":1002},{"level":1,"mastery":63,"points":1001},{"level":1,"mastery":62,"points":621},{"level":2,"mastery":14,"points":612},{"level":1,"mastery":61,"points":611},{"level":1,"mastery":60,"points":601},{"level":2,"mastery":13,"points":592},{"level":1,"mastery":59,"points":591},{"level":1,"mastery":58,"points":581},{"level":1,"mastery":57,"points":571},{"level":2,"mastery":12,"points":562},{"level":1,"mastery":56,"points":561},{"level":1,"mastery":55,"points":551},{"level":1,"mastery":54,"points":541},{"level":2,"mastery":11,"points":532},{"level":1,"mastery":53,"points":531},{"level":1,"mastery":52,"points":521},{"level":1,"mastery":51,"points":511},{"level":1,"mastery":50,"points":501},{"level":2,"mastery":10,"points":492},{"level":1,"mastery":49,"points":491},{"level":1,"mastery":48,"points":481},{"level":1,"mastery":47,"points":471},{"level":1,"mastery":46,"points":461},{"level":2,"mastery":9,"points":452},{"level":1,"mastery":45,"points":451},{"level":1,"mastery":44,"points":441},{"level":1,"mastery":43,"points":431},{"level":1,"mastery":42,"points":421},{"level":1,"mastery":41,"points":411},{"level":2,"mastery":8,"points":402},{"level":1,"mastery":40,"points":401},{"level":1,"mastery":39,"points":391},{"level":1,"mastery":38,"points":381},{"level":1,"mastery":37,"points":371},{"level":1,"mastery":36,"points":361},{"level":2,"mastery":7,"points":352},{"level":1,"mastery":35,"points":351},{"level":1,"mastery":34,"points":341},{"level":1,"mastery":33,"points":331},{"level":1,"mastery":32,"points":321},{"level":1,"mastery":31,"points":311},{"level":2,"mastery":6,"points":302},{"level":1,"mastery":30,"points":301},{"level":1,"mastery":29,"points":291},{"level":1,"mastery":28,"points":281},{"level":1,"mastery":27,"points":271},{"level":1,"mastery":26,"points":261},{"level":2,"mastery":5,"points":252},{"level":1,"mastery":25,"points":251},{"level":1,"mastery":24,"points":241},{"level":1,"mastery":23,"points":231},{"level":1,"mastery":22,"points":221},{"level":1,"mastery":21,"points":211},{"level":2,"mastery":4,"points":202},{"level":1,"mastery":20,"points":201},{"level":1,"mastery":19,"points":191},{"level":1,"mastery":18,"points":181},{"level":1,"mastery":17,"points":171},{"level":1,"mastery":16,"points":161},{"level":1,"mastery":15,"points":151},{"level":2,"mastery":3,"points":142},{"level":1,"mastery":14,"points":141},{"level":1,"mastery":13,"points":131},{"level":1,"mastery":12,"points":121},{"level":1,"mastery":11,"points":111},{"level":1,"mastery":10,"points":101},{"level":1,"mastery":9,"points":91},{"level":2,"mastery":2,"points":82},{"level":1,"mastery":8,"points":81},{"level":1,"mastery":7,"points":71},{"level":1,"mastery":6,"points":61},{"level":1,"mastery":5,"points":51},{"level":1,"mastery":4,"points":41},{"level":1,"mastery":3,"points":31},{"level":1,"mastery":2,"points":21},{"level":3,"mastery":1,"points":13},{"level":2,"mastery":1,"points":12},{"level":1,"mastery":1,"points":11}];
    var wsSkillPoints = [{"level":3,"ws":16,"points":55000003},{"level":1,"ws":200,"points":55000001},{"level":1,"ws":199,"points":54850001},{"level":2,"ws":75,"points":54700002},{"level":1,"ws":198,"points":54700001},{"level":1,"ws":197,"points":54600001},{"level":1,"ws":196,"points":54400001},{"level":2,"ws":74,"points":54300002},{"level":1,"ws":195,"points":54200001},{"level":1,"ws":194,"points":54000001},{"level":2,"ws":73,"points":53900002},{"level":1,"ws":193,"points":53800001},{"level":1,"ws":192,"points":53600001},{"level":1,"ws":191,"points":53400001},{"level":2,"ws":72,"points":53300002},{"level":1,"ws":190,"points":53200001},{"level":1,"ws":189,"points":53000001},{"level":2,"ws":71,"points":52800002},{"level":1,"ws":188,"points":52800001},{"level":3,"ws":15,"points":52728003},{"level":1,"ws":187,"points":52600001},{"level":1,"ws":186,"points":52400001},{"level":2,"ws":70,"points":52300002},{"level":1,"ws":185,"points":52200001},{"level":1,"ws":184,"points":51870001},{"level":2,"ws":69,"points":51755002},{"level":1,"ws":183,"points":51560001},{"level":1,"ws":182,"points":51249001},{"level":2,"ws":68,"points":51202002},{"level":1,"ws":181,"points":50937001},{"level":2,"ws":67,"points":50641002},{"level":1,"ws":180,"points":50624001},{"level":1,"ws":179,"points":50310001},{"level":2,"ws":66,"points":50073002},{"level":1,"ws":178,"points":49994001},{"level":3,"ws":14,"points":49784003},{"level":1,"ws":177,"points":49678001},{"level":2,"ws":65,"points":49496002},{"level":1,"ws":176,"points":49361001},{"level":1,"ws":175,"points":49043001},{"level":2,"ws":64,"points":48912002},{"level":1,"ws":174,"points":48723001},{"level":1,"ws":173,"points":48403001},{"level":2,"ws":63,"points":48319002},{"level":1,"ws":172,"points":48082001},{"level":1,"ws":171,"points":47759001},{"level":2,"ws":62,"points":47719002},{"level":1,"ws":170,"points":47436001},{"level":2,"ws":61,"points":47111002},{"level":1,"ws":169,"points":47111001},{"level":1,"ws":168,"points":46785001},{"level":3,"ws":13,"points":46626003},{"level":2,"ws":60,"points":46494002},{"level":1,"ws":167,"points":46459001},{"level":1,"ws":166,"points":46131001},{"level":2,"ws":59,"points":45870002},{"level":1,"ws":165,"points":45803001},{"level":1,"ws":164,"points":45473001},{"level":2,"ws":58,"points":45238002},{"level":1,"ws":163,"points":45142001},{"level":1,"ws":162,"points":44810001},{"level":2,"ws":57,"points":44598002},{"level":1,"ws":161,"points":44477001},{"level":1,"ws":160,"points":44144001},{"level":2,"ws":56,"points":43951002},{"level":1,"ws":159,"points":43809001},{"level":1,"ws":158,"points":43473001},{"level":2,"ws":55,"points":43295002},{"level":3,"ws":12,"points":43256003},{"level":1,"ws":157,"points":43136001},{"level":1,"ws":156,"points":42798001},{"level":2,"ws":54,"points":42631002},{"level":1,"ws":155,"points":42459001},{"level":1,"ws":154,"points":42119001},{"level":2,"ws":53,"points":41959002},{"level":1,"ws":153,"points":41778001},{"level":1,"ws":152,"points":41435001},{"level":2,"ws":52,"points":41280002},{"level":1,"ws":151,"points":41092001},{"level":1,"ws":150,"points":40748001},{"level":2,"ws":51,"points":40593002},{"level":1,"ws":149,"points":40403001},{"level":1,"ws":148,"points":40056001},{"level":2,"ws":50,"points":39897002},{"level":1,"ws":147,"points":39709001},{"level":3,"ws":11,"points":39672003},{"level":1,"ws":146,"points":39361001},{"level":2,"ws":49,"points":39194002},{"level":1,"ws":145,"points":39011001},{"level":1,"ws":144,"points":38661001},{"level":2,"ws":48,"points":38483002},{"level":1,"ws":143,"points":38309001},{"level":1,"ws":142,"points":37957001},{"level":2,"ws":47,"points":37764002},{"level":1,"ws":141,"points":37603001},{"level":1,"ws":140,"points":37248001},{"level":2,"ws":46,"points":37037002},{"level":1,"ws":139,"points":36893001},{"level":1,"ws":138,"points":36536001},{"level":2,"ws":45,"points":36302002},{"level":1,"ws":137,"points":36178001},{"level":3,"ws":10,"points":35876003},{"level":1,"ws":136,"points":35820001},{"level":2,"ws":44,"points":35559002},{"level":1,"ws":135,"points":35467001},{"level":1,"ws":134,"points":35095001},{"level":2,"ws":43,"points":34810002},{"level":1,"ws":133,"points":34728001},{"level":1,"ws":132,"points":34366001},{"level":2,"ws":42,"points":34042002},{"level":1,"ws":131,"points":34007001},{"level":1,"ws":130,"points":33651001},{"level":1,"ws":129,"points":33296001},{"level":2,"ws":41,"points":33295002},{"level":1,"ws":128,"points":32932001},{"level":1,"ws":127,"points":32545001},{"level":2,"ws":40,"points":32504002},{"level":1,"ws":126,"points":32154001},{"level":3,"ws":9,"points":31867003},{"level":1,"ws":125,"points":31761001},{"level":2,"ws":39,"points":31687002},{"level":1,"ws":124,"points":31389001},{"level":1,"ws":123,"points":31028001},{"level":2,"ws":38,"points":30871002},{"level":1,"ws":122,"points":30683001},{"level":1,"ws":121,"points":30327001},{"level":2,"ws":37,"points":30057002},{"level":1,"ws":120,"points":29977001},{"level":1,"ws":119,"points":29660001},{"level":2,"ws":36,"points":29309002},{"level":1,"ws":118,"points":29308001},{"level":1,"ws":117,"points":28935001},{"level":1,"ws":116,"points":28570001},{"level":2,"ws":35,"points":28477002},{"level":1,"ws":115,"points":28221001},{"level":1,"ws":114,"points":27875001},{"level":2,"ws":34,"points":27669002},{"level":3,"ws":8,"points":27643003},{"level":1,"ws":113,"points":27516001},{"level":1,"ws":112,"points":27173001},{"level":2,"ws":33,"points":26856002},{"level":1,"ws":111,"points":26835001},{"level":1,"ws":110,"points":26495001},{"level":1,"ws":109,"points":26126001},{"level":2,"ws":32,"points":26015002},{"level":1,"ws":108,"points":25762001},{"level":1,"ws":107,"points":25413001},{"level":2,"ws":31,"points":25157002},{"level":1,"ws":106,"points":25080001},{"level":1,"ws":105,"points":24758001},{"level":1,"ws":104,"points":24427001},{"level":2,"ws":30,"points":24287002},{"level":1,"ws":103,"points":24063001},{"level":1,"ws":102,"points":23733001},{"level":2,"ws":29,"points":23434002},{"level":1,"ws":101,"points":23404001},{"level":3,"ws":7,"points":23210003},{"level":1,"ws":100,"points":23069001},{"level":1,"ws":99,"points":22726001},{"level":2,"ws":28,"points":22519002},{"level":1,"ws":98,"points":22390001},{"level":1,"ws":97,"points":22042001},{"level":1,"ws":96,"points":21690001},{"level":1,"ws":95,"points":21337001},{"level":1,"ws":94,"points":20982001},{"level":2,"ws":27,"points":20895002},{"level":1,"ws":93,"points":20632001},{"level":1,"ws":92,"points":20306001},{"level":1,"ws":91,"points":19964001},{"level":1,"ws":90,"points":19644001},{"level":1,"ws":89,"points":19316001},{"level":2,"ws":26,"points":19292002},{"level":1,"ws":88,"points":18993001},{"level":1,"ws":87,"points":18676001},{"level":3,"ws":6,"points":18560003},{"level":1,"ws":86,"points":18358001},{"level":1,"ws":85,"points":18022001},{"level":2,"ws":25,"points":17694002},{"level":1,"ws":84,"points":17691001},{"level":1,"ws":83,"points":17373001},{"level":1,"ws":82,"points":17047001},{"level":1,"ws":81,"points":16707001},{"level":1,"ws":80,"points":16365001},{"level":2,"ws":24,"points":16147002},{"level":1,"ws":79,"points":16032001},{"level":1,"ws":78,"points":15700001},{"level":1,"ws":77,"points":15361001},{"level":1,"ws":76,"points":15147001},{"level":1,"ws":75,"points":14921001},{"level":1,"ws":74,"points":14662001},{"level":2,"ws":23,"points":14590002},{"level":1,"ws":73,"points":14406001},{"level":1,"ws":72,"points":14114001},{"level":1,"ws":71,"points":13805001},{"level":2,"ws":22,"points":13698002},{"level":1,"ws":70,"points":13490001},{"level":1,"ws":69,"points":13148001},{"level":1,"ws":68,"points":12803001},{"level":3,"ws":5,"points":12604003},{"level":1,"ws":67,"points":12435001},{"level":2,"ws":21,"points":12225002},{"level":1,"ws":66,"points":12037001},{"level":1,"ws":65,"points":11646001},{"level":1,"ws":64,"points":11252001},{"level":1,"ws":63,"points":10873001},{"level":2,"ws":20,"points":10817002},{"level":1,"ws":62,"points":10466001},{"level":1,"ws":61,"points":10095001},{"level":1,"ws":60,"points":9700001},{"level":2,"ws":19,"points":9446002},{"level":1,"ws":59,"points":9353001},{"level":1,"ws":58,"points":8991001},{"level":1,"ws":57,"points":8629001},{"level":1,"ws":56,"points":8272001},{"level":2,"ws":18,"points":8169002},{"level":1,"ws":55,"points":7914001},{"level":1,"ws":54,"points":7575001},{"level":3,"ws":4,"points":7460003},{"level":1,"ws":53,"points":7241001},{"level":2,"ws":17,"points":7003002},{"level":1,"ws":52,"points":6913001},{"level":1,"ws":51,"points":6581001},{"level":1,"ws":50,"points":6241001},{"level":2,"ws":16,"points":6195002},{"level":1,"ws":49,"points":5920001},{"level":1,"ws":48,"points":5602001},{"level":1,"ws":47,"points":4916001},{"level":2,"ws":15,"points":4714002},{"level":1,"ws":46,"points":4275001},{"level":1,"ws":45,"points":3662001},{"level":2,"ws":14,"points":3418002},{"level":1,"ws":44,"points":3102001},{"level":3,"ws":3,"points":3070003},{"level":1,"ws":43,"points":2594001},{"level":2,"ws":13,"points":2339002},{"level":1,"ws":42,"points":2129001},{"level":1,"ws":41,"points":1713001},{"level":2,"ws":12,"points":1474002},{"level":1,"ws":40,"points":1339001},{"level":1,"ws":39,"points":1008001},{"level":2,"ws":11,"points":848002},{"level":3,"ws":2,"points":835003},{"level":1,"ws":38,"points":733001},{"level":1,"ws":37,"points":664001},{"level":1,"ws":36,"points":610001},{"level":2,"ws":10,"points":586002},{"level":1,"ws":35,"points":551001},{"level":1,"ws":34,"points":490001},{"level":1,"ws":33,"points":434001},{"level":2,"ws":9,"points":375002},{"level":1,"ws":32,"points":373001},{"level":1,"ws":31,"points":313001},{"level":1,"ws":30,"points":267001},{"level":1,"ws":29,"points":217001},{"level":2,"ws":8,"points":204002},{"level":1,"ws":28,"points":172001},{"level":1,"ws":27,"points":120001},{"level":1,"ws":26,"points":95001},{"level":2,"ws":7,"points":92002},{"level":1,"ws":25,"points":69001},{"level":1,"ws":24,"points":56001},{"level":2,"ws":6,"points":43002},{"level":1,"ws":23,"points":43001},{"level":1,"ws":22,"points":32001},{"level":1,"ws":21,"points":21001},{"level":2,"ws":5,"points":15002},{"level":1,"ws":20,"points":14001},{"level":1,"ws":19,"points":9001},{"level":1,"ws":18,"points":6001},{"level":2,"ws":4,"points":3002},{"level":1,"ws":17,"points":3001},{"level":1,"ws":16,"points":1001},{"level":1,"ws":15,"points":151},{"level":1,"ws":14,"points":141},{"level":2,"ws":3,"points":132},{"level":1,"ws":13,"points":131},{"level":1,"ws":12,"points":121},{"level":1,"ws":11,"points":111},{"level":1,"ws":10,"points":101},{"level":1,"ws":9,"points":91},{"level":2,"ws":2,"points":82},{"level":1,"ws":8,"points":81},{"level":1,"ws":7,"points":71},{"level":1,"ws":6,"points":61},{"level":1,"ws":5,"points":51},{"level":1,"ws":4,"points":41},{"level":1,"ws":3,"points":31},{"level":1,"ws":2,"points":21},{"level":3,"ws":1,"points":13},{"level":2,"ws":1,"points":12},{"level":1,"ws":1,"points":11}];
    const waitForProfileHTML = function() {
        if(document.querySelectorAll('div label.checkbox-fixed').length == 0 && document.querySelectorAll('div.col-xs-4').length > 7) {
            window.currList4 = document.querySelectorAll('div.col-xs-4');
            window.currList8 = document.querySelectorAll('div.col-xs-8');
            // TP display
            /*var TPsources = [0,0,0];
                                var currXP = allTimeObject.exp;
                                for(i = 0; i < TPcostfromXP.length; i++) {
                                    if(currXP >= 10*TPcostfromXP[i]) {
                                        currXP -= 10*TPcostfromXP[i];
                                        TPsources[0] += 10;
                                    }
                                    else {
                                        TPsources[0] += Math.floor(currXP/TPcostfromXP[i]);
                                        currXP -= TPcostfromXP[i]*(1+Math.floor(currXP/TPcostfromXP[i]));
                                        break;
                                    }
                                };
                                if(currXP > 0) {
                                    var maxTPcost = TPcostfromXP[TPcostfromXP.length-1];
                                    TPsources[0] += Math.floor(currXP/maxTPcost);
                                    currXP -= maxTPcost*(1+Math.floor(currXP/maxTPcost));
                                }
                                TPsources[1] = allTimeObject.items[108] ? allTimeObject.items[108] : 0;
                                var equipmentLevels = document.getElementsByClassName("perfect-level-small ");
                                for(i=0; i<equipmentLevels.length; i++) {
                                    TPsources[2] += 5*equipmentLevels[i].innerText.substr(1);
                                }
                                //TPsources[2] = allTimeObject.items[109] ? allTimeObject.items[109] : 0;
                                //TPsources[3] = allTimeObject.items[107] ? allTimeObject.items[107] : 0;
                                if(TPsources[0]+TPsources[1]+TPsources[2] > 0) {
                                    var currNode = document.createElement("span");
                                    currNode.innerHTML = '&nbsp;&nbsp;&nbsp;<img src="/img/other/tp.svg" class="tp-icon icon-right"><span class="help text-nowrap">';
                                    currNode.innerHTML += (TPsources[0]+TPsources[1]+TPsources[2]);
                                    $(currNode).popover({
                                        trigger: "hover",
                                        placement: "top",
                                        html: !0,
                                        content: () => 'Sources:' + (TPsources[0] ? '<br><img src="/img/other/xp.svg" class="exp-icon icon-right" alt="⭐"> ' + TPsources[0] : '')
                                                                  + (TPsources[1] ? '<br><img src="/img/other/hp.svg" class="hp-icon icon-right" alt="🌟"> ' + TPsources[1] : '')
                                                                  + (TPsources[2] ? '<br><img src="/img/other/eq.svg" class="eq-icon icon-right"> ' + TPsources[2] : '')
                                                                  //+ (TPsources[2] ? '<br><img src="/img/other/coin.svg" class="coin-icon icon-right" alt="🟡"> ' + TPsources[2] : '')
                                                                  //+ (TPsources[3] ? '<br><img src="/img/gems/0.svg" class="gem gem0 icon-right" alt="💎"> ' + TPsources[3] : '')
                                    });
                                    var currList = document.querySelectorAll('td');
                                    currList[currList.length-3].appendChild(currNode);
                                    console.log(currNode);
                                }*/
            // Battle pass icon
            if(allTimeObject.items[14] && allTimeObject.items[14] > allTimeObject.exp/1e6) {
                var battlePassIcon = allTimeObject.items[14] >= 1e5 ? 3 : allTimeObject.items[14] == 1 ? 1 : 2;
                for(var i=0; i<currList4.length; i++) {
                    if(currList4[i].innerText == 'Experience:') {
                        currNode = document.createElement('span');
                        currNode.innerHTML = '&nbsp;<img src="/img/other/battle-pass-'+battlePassIcon+'.svg" class="turbo-boost-icon icon-right" alt="\u{1F51D}">';
                        $(currNode).popover({
                            trigger: "hover",
                            placement: "top",
                            html: !0,
                            content: () => '&nbsp;<img src="/img/other/battle-pass-'+battlePassIcon+'.svg" class="turbo-boost-icon icon-right" alt="\u{1F51D}">'
                            + '<b>' + (battlePassIcon == 3 ? 'Unlimited battle pass' : battlePassIcon == 2 ? 'Battle pass' : 'Starter battle pass')
                            + '<hr class="medium-hr">'
                            + '</b>Experience: +100%<br>Minecoins: +100%<br>Gems: +100%<br>Arena tickets: +100%<br>Elite chance: +10%'
                            + (battlePassIcon < 3 ? '<br>Expires at: ' + allTimeObject.items[14] + 'M<img src="/img/other/xp.svg" class="exp-icon icon-right" alt="⭐">' : '')
                            + '<br><br>The bonuses stack additively with your equipment bonuses.'
                        });
                        currList8[i].childNodes[currList8[i].childNodes.length-1].after(currNode);
                        break;
                    }
                }
            }
            // NF time PB
            if(allTimeObject.nfPoints > 0) {
                for(i=0; i<currList4.length; i++) {
                    if(currList4[i].innerText == 'Best time:') {
                        var currDate = new Date(allTimeObject.nfFinishedAt);
                        currNode = document.createElement('span');
                        currNode.innerHTML = '&nbsp;&nbsp;&nbsp;<a class="black-link" href="/game/'+allTimeObject.nfId+'"><i class="fa fa-clock-o time-icon level'+allTimeObject.nfLevel+'"></i>'+Math.floor(allTimeObject.nfDuration/1000)+'</a>';
                        $(currNode).popover({
                            trigger: "hover",
                            placement: "top",
                            html: !0,
                            content: () => 'Category: NF Time'
                            + '<br>Level: ' + diffArray[allTimeObject.nfLevel] + (allTimeObject.nfLevel == 4 ? ' ' + allTimeObject.nfSizeX + 'x' + allTimeObject.nfSizeY + '/' + allTimeObject.nfMines : '')
                            + '<br>Time: <b>' + allTimeObject.nfDuration/1000 + '</b> sec'
                            + '<br>3bv: ' + allTimeObject.nfBbbv
                            + '<br>3bv/s: ' + (allTimeObject.nfBbbvs/1000000).toFixed(3)
                            + '<br><span class="gray">' + currDate.getDate() + ' ' + monthArray[currDate.getMonth()] + ' ' + currDate.getFullYear() + ', ' + currDate.getHours().toString().padStart(2, "0") + ':' + currDate.getMinutes().toString().padStart(2, "0") + '</span>'
                        });
                        $(currNode).click(function(r){r.preventDefault(),history.pushState(null, null, this.children[0].href),history.go(-1),history.go(1)});
                        currList8[i].childNodes[currList8[i].childNodes.length-1].after(currNode);
                        break;
                    }
                }
            }
            // Legacy mastery/WS scores
            if(allTimeObject.masteryLPoints > allTimeObject.masteryPoints) {
                // Get mastery score
                var currIndex = 0;
                for(i=0; i<masterySkillPoints.length; i++) {
                    if(allTimeObject.masteryLPoints == masterySkillPoints[i].points) {
                        currIndex = i;
                        break;
                    }
                }
                for(i=0; i<currList4.length; i++) {
                    if(currList4[i].innerText == 'Mastery:') {
                        currNode = document.createElement('span');
                        currNode.innerHTML = '&nbsp;&nbsp;&nbsp;<a class="black-link" href="/mastery/'+allTimeObject.masteryLId+'"><i class="glyphicon glyphicon-flash mastery-icon mastery'+masterySkillPoints[currIndex].level+'"></i>'+masterySkillPoints[currIndex].mastery+'</a>';
                        $(currNode).popover({
                            trigger: "hover",
                            placement: "top",
                            html: !0,
                            content: () => 'Category: Hinted Mastery'
                            + '<br>Level: ' + diffArray[masterySkillPoints[currIndex].level]
                            + '<br>Wins: <b>' + masterySkillPoints[currIndex].mastery + '</b> / 100'
                            + '<br>Hints Used: <b>' + Math.floor(allTimeObject.masteryLTime/10000000) + '</b>'
                            + '<br>Average Time: ' + (allTimeObject.masteryLTime%10000000)/1000
                        });
                        $(currNode).click(function(r){r.preventDefault(),history.pushState(null, null, this.children[0].href),history.go(-1),history.go(1)});
                        currList8[i].childNodes[currList8[i].childNodes.length-1].after(currNode);
                        break;
                    }
                }
            }
            if(allTimeObject.wsLPoints > allTimeObject.wsPoints) {
                // Get WS score
                var currIndex2 = 0;
                for(i=0; i<wsSkillPoints.length; i++) {
                    if(allTimeObject.wsLPoints == wsSkillPoints[i].points) {
                        currIndex2 = i;
                        break;
                    }
                }
                for(i=0; i<currList4.length; i++) {
                    if(currList4[i].innerText == 'Win streak:') {
                        currNode = document.createElement('span');
                        currNode.innerHTML = '&nbsp;&nbsp;&nbsp;<a class="black-link" href="/winstreak/'+allTimeObject.wsLId+'"><i class="fa fa-crosshairs ws-icon ws'+wsSkillPoints[currIndex2].level+'"></i>'+wsSkillPoints[currIndex2].ws+'</a>';
                        $(currNode).popover({
                            trigger: "hover",
                            placement: "top",
                            html: !0,
                            content: () => 'Category: Hinted WS'
                            + '<br>Level: ' + diffArray[wsSkillPoints[currIndex2].level]
                            + '<br>Wins: <b>' + wsSkillPoints[currIndex2].ws + '</b>'
                            + '<br>Hints Used: <b>' + Math.floor(allTimeObject.wsLTime/10000000) + '</b>'
                            + '<br>Average Time: ' + (allTimeObject.wsLTime%10000000)/1000
                        });
                        $(currNode).click(function(r){r.preventDefault(),history.pushState(null, null, this.children[0].href),history.go(-1),history.go(1)});
                        currList8[i].childNodes[currList8[i].childNodes.length-1].after(currNode);
                        break;
                    }
                }
            }
            // Arena duration
            for(i=0; i<currList4.length; i++) {
                if(currList4[i].innerText == 'Arena points:') {
                    currNode = document.createElement('span');
                    currNode.innerText = Math.floor(allTimeObject.arenaDuration/3600000).toString().padStart(2, "0")+':'+Math.floor(allTimeObject.arenaDuration/60000%60).toString().padStart(2, "0")+':'+Math.floor(allTimeObject.arenaDuration/10000%60).toString().padStart(2, "0");
                    $(currNode).click(function(r){toggleArenas();});
                    currList8[i].childNodes[currList8[i].childNodes.length-1].after(currNode);
                    // Specific arena links
                    window.arenaResults = arenaResults;
                    currNode = document.createElement('div');
                    currNode.id = 'specificArenas';
                    currList4[i+1].before(currNode);
                    currNode = document.createElement('span');
                    currNode.innerHTML = '<span>   </span>';
                    currList8[i].childNodes[0].insertBefore(currNode,currList8[i].childNodes[0].childNodes[currList8[i].childNodes[0].childNodes.length]);
                    break;
                }
            }
            // PvP hidden rating
            for(i=0; i<currList4.length; i++) {
                if(currList4[i].innerText == 'League:') {
                    currList8[i].childNodes[2].appendData(' (' + mmrToRating(allTimeObject.xmmr) + ')');
                    break;
                }
            }
            // Lower diff endurance
            for(i=0; i<currList4.length; i++) {
                if(currList4[i].innerText == 'Endurance:') {
                    for(var j=allTimeObject.endLevel-1; j>0; j--) {
                        if(allTimeObject['end'+j+'Id'] > 0) {
                            var currEndTime = (86400000-allTimeObject['end'+j])/1000;
                            var currEndText = currEndTime>3599 ? Math.floor(currEndTime/3600)+'h '+Math.floor(currEndTime/60%60)+'m' : Math.floor(currEndTime/60)+'m '+currEndTime%60+'s';
                            currNode = document.createElement('span');
                            currNode.innerHTML = '<span class="profile-space-wide"> </span>';
                            document.querySelectorAll('div.col-xs-8')[i].prepend(currNode);
                            currNode = document.createElement('span');
                            currNode.innerHTML = '<span class="custom-popover" data-original-title="" title=""><a class="black-link" href="/endurance/'+allTimeObject['end'+j+'Id']+'"><i class="fa fa-history end-icon end'+j+'"></i>'+currEndText+'</a></span>';
                            $(currNode).click(function(r){r.preventDefault(),history.pushState(null, null, this.children[0].children[0].href),history.go(-1),history.go(1)});
                            document.querySelectorAll('div.col-xs-8')[i].prepend(currNode);
                        }
                    }
                    break;
                }
            }
            // Statistics
            var profileLength = 0;
            for(i=0; i<currList8.length; i++) {
                if(currList4[i].innerText == 'Information:') {profileLength = i; break;}
            }
            currNode = document.createElement('div');
            currNode.innerHTML = '<div class="pull-left"><label class="checkbox-fixed"><input id="current_season" type="checkbox" onclick="flipStatistics()"><span>Current Season</span></label></div><br>';
            currList4[profileLength].parentElement.insertBefore(currNode,currList4[profileLength]);
            currNode = document.createElement('div');
            currNode.id = 'aggregate';
            currList4[profileLength].parentElement.insertBefore(currNode,currList4[profileLength]);
            window.allTimeObject = allTimeObject;
            window.seasonObject = seasonObject;
            showStatistics(allTimeObject);
            // Other items (AP/EP/VIP coins)
            let a = jQuery("<div>");
            allTimeObject.items[15] > 0 && a.append(jQuery("<div>").append(allTimeObject.items[15], '<img src="/img/activity/activity-' + (seasonObject.season % 12 + 1) + '.svg" class="activity-icon icon-right" alt="\u26A1"/>'));
            for(i=535; i<=546; i++) {
                if(allTimeObject.items[i] > 0) {
                    let r='candy';
                    switch(i-534) {
                        case 1: r='snowflake'; break;
                        case 2: r='heart'; break;
                        case 3: r='shard'; break;
                        case 4: r='egg'; break;
                        case 5: r='flower'; break;
                        case 6: r='like'; break;
                        case 7: r='icecream'; break;
                        case 8: r='drink'; break;
                        case 9: r='fruit'; break;
                        case 10: r='pumpkin'; break;
                        case 11: r='cake'; break;
                        case 12: r='candy'; break;
                    }
                    let EPimg = document.createElement('img');
                    EPimg.setAttribute('src','/img/candies/' + r + '/' + i + '.svg?v5');
                    EPimg.setAttribute('class', r + " " + r + i + " small icon-right");
                    EPimg.setAttribute('height','18px');
                    a.append(jQuery("<div>").append(allTimeObject.items[i],EPimg/*,' [S'+(i-24191)+']'*/));
                    break;
                }
            }
            allTimeObject.items[104] > 0 && a.append(jQuery("<div>").append(allTimeObject.items[104], ' <img src="/img/item/vip-coin.svg" class="vip-coin-icon " alt="\u{1F451}"/>'));
            if(a[0].innerHTML.length > 0) {
                currNode = document.createElement('img');
                currNode.setAttribute('src',"/img/other/other-items.svg");
                currNode.setAttribute('class',"other-items-icon");
                for(i=0; i<currList4.length; i++) {
                    if(currList4[i].innerText == 'Resources:') {
                        currList8[i].childNodes[0].childNodes[currList8[i].childNodes[0].childNodes.length-1].after(currNode);
                        $(currNode).popover({
                            container: "body",
                            trigger: "hover",
                            placement: "top",
                            html: !0,
                            content: a
                        });
                        currNode = document.createElement('span');
                        currList8[i].childNodes[0].insertBefore(currNode,currList8[i].childNodes[0].childNodes[currList8[i].childNodes[0].childNodes.length-1]);
                        break;
                    }
                }
            }
        }
        else {
            setTimeout(waitForProfileHTML,10);
        }
    }
    const OriginalWebSocket = window.WebSocket;

    window.WebSocket = function () {
        const ws = new OriginalWebSocket(...arguments);
        const originalAddEventListener = ws.addEventListener;

        ws.addEventListener = function (event, cb) {
            if (event === "message") {
                const proxiedCallback = function (e) {
                    //console.log(e.data.slice(0, 45));
                    if (e.data.startsWith('42[') && e.data.slice(0, 65).includes('user')) {
                        const o = JSON.parse(e.data.slice(2));
                        console.log(o);
                        if (o[1] && o[1][2] && o[1][2][0] && typeof o[1][2][0].userStat == 'object' && window.location.href.indexOf('player') > 0) {
                            allTimeObject = o[1][2][0].userStat;
                            seasonObject = o[1][2][0].seasonUserStat;
                            arenaResults = o[1][2][0].arenaResults;
                            waitForProfileHTML();
                        }
                    }
                    else if (e.data.startsWith('42[') && e.data.slice(0, 55).includes('"/pvp"')) {
                        // pvp data
                        const o = JSON.parse(e.data.slice(2));
                        console.log(o);
                        if (o[1] && o[1][2] && Array.isArray(o[1][2][0].rows)) {
                            o[1][2][0].rows.forEach(x => {
                                xmmrs[x.userId] = mmrToRating(x.xmmr);
                            });
                            waitForTable();
                        }
                    }
                    return cb.apply(this, arguments);
                };
                arguments[1] = proxiedCallback;
            }
            return originalAddEventListener.apply(this, arguments);
        };

        Object.defineProperty(ws, "onmessage", {
            set(func) {
                return ws.addEventListener("message", func, false);
            }
        });

        return ws;
    };
})();
