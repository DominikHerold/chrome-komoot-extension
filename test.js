javascript:(function() {
function ripData(){
   var scripts = document.getElementsByTagName("script");
    var findRe = /(kmtBoot.setProps)/;
    var jsonRe = /kmtBoot.setProps\("(.*)"\)/;
    for (i = 0; i < scripts.length; i++) {
        var test = scripts[i].innerHTML.match(findRe);
        if (test && test.length > 0)
        {
            var jsonTest = scripts[i].innerHTML.match(jsonRe);
            
            if (jsonTest && jsonTest.length > 0) {
                var myjson = jsonTest[1];
                myjson = myjson.replace(/\\"/g, '"');
                myjson = myjson.replace(/"*\\\\\\"*"/g, '"');
                
                myjson = myjson.replace(/"{/g, '{');
                myjson = myjson.replace(/(}"),"d/g, '},"d');
                myjson = myjson.replace(/\\\\"/g, '"');
                var mydata = myjson.match(/"coordinates":{"items":\[(.*?)]/g);
                var data = "{" + mydata[0]+ "}}";
                var rJson = JSON.parse(data);
                var pre = '<gpx><trk><trkseg>';
                var track = '';
                rJson.coordinates.items.forEach(function (point) {
                    track += '<trkpt lat="' + point.lat + '" lon="' + point.lng + '"><ele>' + point.alt + '</ele></trkpt>';
                });
                var past = '</trkseg></trk></gpx>';
                addToPage(pre + track + past);
            }
        }
    }
	return pre + track + past;
}
function addToPage(gpx) {
    var aTags = document.getElementsByTagName("li");
    var searchText = "Für GPS-Gerät herunterladen";
    var found =[];
    
	for (var i = 0; i < aTags.length; i++) {
		if (aTags[i].textContent.indexOf(searchText) > -1) {            
			found.push( aTags[i]);			
        }
    }

    
    
    for (var i = 0; i < found.length; i++) {
        var newListitem = document.createElement("li");
    var newTextarea = document.createElement("textarea");
    newTextarea.value = gpx;

    newListitem.appendChild(newTextarea);
		found[i].parentNode.appendChild(newListitem);		
    }
    
    setTimeout(function(){ 

    }, 3000);
}

ripData();
})();