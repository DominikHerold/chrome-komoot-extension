window.onload = function () {
    ripData();
    
//    document.getElementById('rip').addEventListener('click', goRip);pop
}

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
                var mydata = myjson.match(/"coordinates":{"items":\[(.*?)]/g)
                var data = "{" + mydata[0]+ "}}";
                var rJson = JSON.parse(data);
                var pre = '<gpx><trk>';
                var track = '';
                rJson.coordinates.items.forEach(function (point) {
                    track += '<trkpt lat="' + point.lat + '" lon="' + point.lng + '"><ele>' + point.alt + '</ele></trkpt>';
                })
                var past = '</trk></gpx>';
                addToPage(pre + track + past);
//                console.log(pre + track + past);
                
            }
        }
    }
    return pre + track + past;
}

function goRip(){
    
    var myTextArea = document.getElementById('gpx');
    myTextArea.value = ripData();
    console.log("rip");
}

function addToPage(gpx) {
    var aTags = document.getElementsByTagName("li");
    var searchText = "Für GPS-Gerät herunterladen";
    var found =[];

    for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
            found.push( aTags[i]);

//            break;
        }
    }
//    console.log(found);

    var newListitem = document.createElement("li");
    var newTextarea = document.createElement("textarea");
    newTextarea.value = gpx;

    newListitem.appendChild(newTextarea);
    
    for (var i = 0; i < found.length; i++) {
//        found[i].parentNode.insertBefore(newListitem, found[i]);
        found[i].parentNode.appendChild(newListitem);
    }
    
    setTimeout(function(){ 

    }, 3000)

//    var body = document.getElementsByTagName('body');
//    body[0].appendChild(newListitem);


}
