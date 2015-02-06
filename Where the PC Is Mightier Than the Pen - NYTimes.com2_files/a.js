/************ TAGX dynamic tags ************************/

(function() {
var tagger = new TAGX.Tagger();
TAGX.config = {};
tagger.tag().run(function() {var static_jsHost_tmp = "http" === 'https' ? "static.nytimes.com" : "graphics8.nytimes.com";

window.bi_analytics_js_path = "//" + static_jsHost_tmp + "/bi/js/analytics/nyt4/";;});
tagger.define("page.dom.custom", function (callback) {
    TAGX.$.domReady(function () {
        callback(function (params, callback) {
            var tagCtx = this;
            if (params.length > 0) {
                TAGX.$(TAGX).one(params[0], function (eventData) {
                    if (typeof tagCtx.eventsData === 'undefined') {
                        tagCtx.eventsData = {};
                    }
                    tagCtx.eventsData[params[0]] = eventData || {};
                    callback(true);
                });
            }
        });
    });
}
);
tagger.tag().repeat('many').condition(function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["module-impression"], callback); }).run(function() {var evtData = this.eventsData['module-impression'];
var moduleName = evtData.module.toLowerCase();
	
if (moduleName !== "ad") {

	var priorityObj = {
		gateway: 1,
		growl : 1,
        notification : 1
	};
	if(priorityObj.hasOwnProperty(moduleName)) {
		evtData.priority = true;
	}

	NYTD.pageEventTracker.addModuleImpression(evtData);	
};});
tagger.tag().repeat('many').condition(function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["module-interaction"], callback); }).run(function() {/* ET module interactions tag */
var evtData = this.eventsData["module-interaction"];
NYTD.EventTracker().track(evtData);
;});
tagger.tag().repeat('many').condition(function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["track-page-view"], callback); }).run(function() {/* tracking page view via the proxy */
var datum = this.eventsData["track-page-view"];
if(datum) {
    // move // moduleData out of the way
    if(JSON) {
        var mData = JSON.parse(datum.moduleData), attr;
        for(attr in mData) {
            if(mData.hasOwnProperty(attr) && !datum.hasOwnProperty(attr)) {
                datum[attr] = mData[attr];
            }
        }
    } else {
        // rename it to event data for now
        datum.eventData = datum.moduleData;
    }
    delete datum.moduleData;
    var extras = {
        sendMeta: true,
        useFieldOverwrites: true,
        buffer: false,
        collectClientData: true
    }
    datum.totalTime = 0;
    NYTD.EventTracker().track(datum, extras);
};});
tagger.tag().run(function() {/* if this page is not the top document it should not be counted as a site wide page */
if (window.top != window.self) {
    NYTD = window.NYTD || {};
    NYTD.EventTrackerPageConfig = {
        event: {
            siteWide: {
                value: 0
            },
            subject: {
                value: "iframedNYTpage"
            }
        }
    }
}

;});
tagger.tag().run(function() {(function () {
    // cache tools
    var meta = TAGX.Utils.getMetaTag;

    // record social sign on click
    TAGX.$(document).on('mousedown', '.oauth-ew5_btn, .oauth-button', function (e) {

        var el = TAGX.$(this);
        var elHtml = el.html();

        // find out which provider was used
        var provider = 'Unknown';
        if (elHtml.indexOf('Google') !== -1) {
            provider = 'Google';
        }

        if (elHtml.indexOf('Facebook') !== -1) {
            provider = 'Facebook';
        }

        var data = {
            'module': 'social-signon',
            'version': provider,
            'action': 'signon',
            'pgType': meta('PT')
        };

        TAGX.EventProxy.trigger('SocialSignOn', data, 'interaction');
    });

    // switch from login to regi or vice versa
    TAGX.$(document).on('mousedown', 'a.log-in, .login-modal .registration-modal-trigger, .registration-modal .login-modal-trigger', function (e) {

        var el = TAGX.$(this);

        // find out which action
        var action;
        elHtml = el.html();
        if (elHtml.indexOf('Create') !== -1 || elHtml.indexOf('Sign Up') !== -1 || elHtml.indexOf('Register') !== -1) {
            action = 'switchtoregi';
        } else {
            action = 'switchtologin';
        }

        var data = {
            'module': 'social-signon',
            'version': 'NYTimes',
            'action': action,
            'pgType': meta('PT')
        };

        TAGX.EventProxy.trigger('NYTimesSignOn', data, 'interaction');
    });

    // traditional login and regi
    TAGX.$(document).on('mousedown', '#main .loginButton, #main .login-button, .login-modal .login-button, .registration-modal .register-button', function (e) {

        var el = TAGX.$(this);

        // find out which action
        var action;
        elHtml = el.html();

        if (elHtml.indexOf('CREATE') !== -1 || elHtml.indexOf('Create') !== -1) {
            action = 'register';
        } else {
            action = 'login';
        }

        var data = {
            'module': 'social-signon',
            'version': 'NYTimes',
            'action': action,
            'pgType': meta('PT')
        };

        // capture newsletters if regi
        if (action === 'register') {
            var newsletters = [];
            TAGX.$('.registrationForm input[type="checkbox"]:checked').each(function (element, index) {
                var el = TAGX.$(element);
                newsletters.push(el.val());
            });
            data.mData = newsletters.toString();
        }

        TAGX.EventProxy.trigger('NYTimesSignOn', data, 'interaction');
    });
})();;});
tagger.tag().run(function() {var script = document.createElement("script");
var html = "window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);" +
    "(function(){ var k=document.createElement('script');k.type='text/javascript';k.async=true;var m,src=(m=location.href.match(/\bkxsrc=([^&]+)\b/))&&decodeURIComponent(m[1]); k.src=src||(location.protocol==='https:'?'https:':'http:')+'//cdn.krxd.net/controltag?confid=HrUwtkcl'; var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s); })();";
TAGX.$(script).attr({
    "class": "kxct",
    "data-id": "HrUwtkcl",
    "data-version": "async:1.7",
    "type": "text/javascript"
});
script.text = html;
TAGX.$("head").append(script);});
tagger.tag().run(function() {/****** start of DY tag *****/
TAGX.$("<div id='DYSCR'></div>").appendTo('body');
window.DY = {scsec : 8765260 ,API: function(){(DY.API.actions = DY.API.actions || []).push(arguments)}};
(function(){
	var d=document,e='createElement',a='appendChild',g='getElementsByTagName',m='getElementById',i=d[e]('iframe'); 
	i.id=i.name='DY-iframe'; i.style.display='none'; i.width=i.height='1px';d[m]('DYSCR')[a](i);
	DY.x = function(w) { var d=w.document, s=d[e]('script');s.type='text/javascript'; s.async=true;          s.src=('https:'==d.location.protocol?'http://st.dynamicyield.com'.replace('http:','https:') : 'http://st.dynamicyield.com')+'/ast?sec='+DY.scsec; 
	d[g]('head')[0][a](s);}; var c = i.contentWindow.document;
	c.open().write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><body onload="parent.DY.x(window)" style="margin:0"></'+'body></html>');
	c.close();
})();
/******* end of DY tag *******/ 
;});
tagger.tag().repeat('many').condition(function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["page-interaction"], callback); }).run(function() {var eData = this.eventsData["page-interaction"];
if(eData) {
    delete eData.module; // to prevent confussion.
    NYTD.pageEventTracker.updateData(eData);
    if ((eData.depth && typeof eData.depth === 'number') || eData.priority === true) { // ideally we get priority flag in the event
        delete eData.priority; // to prevent confussion
        NYTD.pageEventTracker.shortCircuit();  
    }
};});
tagger.tag().run(function() {if (undefined !== window._missingController) {
    var stat = "anon";
    var static_jsHost = "http" === "https" ? "static.nytimes.com" : "graphics8.nytimes.com";
    
    TAGX.Utils.addMetaTag("WT.sourceapp", "nyt4");
    TAGX.Utils.addMetaTag("WT.z_stcap", []);
    if (stat) {
        TAGX.Utils.addMetaTag("WT.z_stat", stat);
    }

    TAGX.Utils.includeFile("//" + static_jsHost + "/bi/js/analytics/nyt4/controller.js", false, "body", true, "loaded:controller.js");
};});
tagger.tag().run(function() {(function () {
    var addCategory = function(category, valueToAppend) {
        if (valueToAppend !== "") {
            return category + " > " + valueToAppend;
        } else {
            return category;
        }
    }

    window.DM_prepClient = function(csid, client) {
        if ("H07707" == csid) {
            var contentGroup = "Technology";
			if (contentGroup === "" ) {
				contentGroup = TAGX.Utils.getMetaTag("CG");
			}
            if (contentGroup !== "Homepage" && contentGroup !== "Home Page") {
				var scg = "";
				if (scg === "" ) {
					scg = TAGX.Utils.getMetaTag("SCG");
				}
				var catValue = "NYTimesglobal";
                catValue = addCategory(catValue, contentGroup);
                catValue = addCategory(catValue, scg);
                client.DM_cat(catValue);    
            }
        } // if H07707     
    }

    // AudienceScience script tag 
    TAGX.Utils.includeFile("//js.revsci.net/gateway/gw.js?csid=H07707&auto=t", true, 'body', false, null);
}());;});
tagger.tag().condition(function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["loaded:controller.js"], callback); }).run(function() {if("nyt-noSourceApp" === "mobileWeb") {
    return
}

var intervalId, howManyTimes = 0, maxChecks = 5;
var WTData = ["WT.z_dcsm", "1"];
var meterIsReady = function(mtr) {
    // check if the NYTD.Meter.loaded
    if (mtr && typeof mtr === 'object' && mtr.final === true && window.dcsMultiTrack) {
        // remove the interval
        clearInterval(intervalId);
        
        var meterValue = TAGX.Utils.getMeterValue(["imv", "ica"]);
        if (meterValue && meterValue.imv !== null) {
            WTData.push("WT.z_imv");
            WTData.push("" + meterValue.imv);
        }
        if (meterValue && meterValue.ica !== null) {
            WTData.push("WT.z_ica");
            WTData.push("" + meterValue.ica);
        }

        // make tha call
        dcsMultiTrack.apply(window, WTData);
    } else {
        // howManyTimes
        if(howManyTimes > maxChecks) {
            clearInterval(intervalId); // don't do it no more    
        }
    }
};

var getMeterObj = function(root, meterReadyCallBack) {
        'use strict';
        if (typeof root.NYTD === 'object' && root.NYTD.Meter) {
            meterReadyCallBack(NYTD.Meter);
        }
};

intervalId = setInterval(function() {
        // check if the meter is ready again.
        howManyTimes++;
        getMeterObj(window, meterIsReady);
    }, 300)
;});
tagger.tag().repeat('many').condition(function (callback) { (TAGX.Ops.or.call(this, function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["gateway-load"], callback); }, function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["gateway-login-click"], callback); }))(callback); }).run(function() {var mapping = {
    "common": [
        'WT.cg_n', 'Digital Subscription',
        'WT.z_gpt', 'E-Commerce',
        'WT.z_gpst', 'Purchase',
        'WT.si_n', 'Digital Subscription',
        'WT.si_x', '1',
        'WT.cg_s', (/edition|GLOBAL/.test(document.cookie) ? 'IHT' : 'NYT'),
        'WT.rv', (false === true ? "1" : "0"),
        'WT.z_ica', "0",
        'WT.z_imv', "0",
        'WT.es', document.location.host + document.location.pathname
    ],
    "impression" : { dcsuri: '/mem/purchase/gateway', ti: 'Gateway', dcsid: 'dcsv96qcv000008alp4trgo0q_7h8h' },
    "login-click" : { dcsuri: '/mem/purchase/gateway/login', ti: 'Gateway - Login', z_dcsm: '1', dcsid: 'dcsv96qcv000008alp4trgo0q_7h8h' }
};
var eventData = this.eventsData["gateway-load"] || this.eventsData["gateway-login-click"];
var evtData, dcssip, dcsuri, dcsid, addition;
var dcs = window.webtrendsAsyncInit;
var map = mapping[eventData.eventName.toLowerCase()];

if (/*!dcs || */!eventData || !map) { return; } // need to have proper data

addition = mapping.common.concat(["DCS.dcsuri", map.dcsuri, "WT.ti", map.ti, "DCS.dcssip", "myaccount.nytimes.com"]);

if(map.z_dcsm) { 
    addition = addition.concat(["WT.z_dcsm", map.z_dcsm]); 
}

evtData = TAGX.Utils.jsonObjToDCSparams(eventData); // event data to array

if(dcs) {
    // save originals
    dcsid = dcs.dcsid;

    // overwrite values
    dcs.dcsid = map.dcsid;
} else {
    //save originals
    dcsid = dcsInit.dcsid;
    // overwrite
    dcsInit.dcsid = map.dcsid
    
}

// make the call
dcsMultiTrack.apply(this, evtData.concat(addition));

if(dcs) {
    // restore
    dcs.dcsid = dcsid;
} else {
    dcsInit.dcsid = dcsid
};});
tagger.tag().repeat('many').condition(function (callback) { (TAGX.Ops.or.call(this, function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["growl-load"], callback); }, function (callback) { TAGX.Ops.on.call(this, "page.dom.custom", ["growl-login-click"], callback); }))(callback); }).run(function() {
var mapping = {
   "common": [
        'WT.cg_n',            'Digital Subscription',
        'WT.z_gpt',           'E-Commerce',
        'WT.z_gpst',          'Purchase',
        'WT.si_n',            'Digital Subscription',
        'WT.si_x',            '8',
        'WT.cg_s',            (/edition\|GLOBAL/.test(document.cookie) ?  'IHT' : 'NYT'),
        'WT.rv',              (false === true ? "1" : "0"),
        'WT.es',              document.location.host + document.location.pathname,
        'WT.z_dcsm',          '1',
        'WT.z_ica',           '0',
        'WT.z_imv',           '0'
    ],
    "growl-load" : { dcsuri: '/mem/purchase/growl', ti: 'Growl', dcsid: 'dcsv96qcv000008alp4trgo0q_7h8h'},
    "impression" : { dcsuri: '/mem/purchase/growl', ti: 'Growl', dcsid: 'dcsv96qcv000008alp4trgo0q_7h8h'},
    "login-click": { dcsuri: '/mem/purchase/growl/login', ti: 'Growl - Login', dcsid: 'dcsv96qcv000008alp4trgo0q_7h8h'}
};

var excludeCampaingList = {
    "nyt2013_abTest_regiAt6_growl_container" : 1, 
    "nyt2013_abTest_regiAt6_setup" : 1, 
    "nyt2013_abTest_regiAt6_display" : 1, 
    "nyt2013_abTest_regiAt6_display_10Plus" : 1, 
    "nyt2013_abTest_regiAt6_finalize}" : 1
}

var eventData = this.eventsData["growl-load"] || this.eventsData["growl-login-click"];
var evtData, dcssip, dcsuri, dcsid, addition, specifics;
var dcs = window.webtrendsAsyncInit;
var map = mapping[eventData.eventName.toLowerCase()];
if ( !eventData || !map) { return; } // need to have proper data

// check exlude list
if (eventData.contentId && excludeCampaingList && excludeCampaingList[eventData.contentId] === 1 ) {
    // return, we dont want to count these hits
    return;    
}

addition = mapping.common.concat(["DCS.dcsuri", map.dcsuri, "WT.ti", map.ti, "DCS.dcssip", "myaccount.nytimes.com"]);

evtData = TAGX.Utils.jsonObjToDCSparams(eventData); // event data to array

if(dcs) {
    // save originals
    dcsid = dcs.dcsid;

    // overwrite values
    dcs.dcsid = map.dcsid;
} else {
    //save originals
    dcsid = dcsInit.dcsid;
    // overwrite
    dcsInit.dcsid = map.dcsid
    
}

// make the call
dcsMultiTrack.apply(this, evtData.concat(addition));

if(dcs) {
    // restore
    dcs.dcsid = dcsid;
} else {
    dcsInit.dcsid = dcsid
}
;});
TAGX.taggerReady=true;
})();
