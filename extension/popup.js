window.onload = function () {
    $('#cc').click(() => {
        console.log(1)
        chrome.windows.getCurrent(function (currentWindow) {
            //根据指定属性查找tabs
            chrome.tabs.query({
                    active: true,
                    windowId: currentWindow.id
                },
                function (activeTabs) {
                    //注入script
                    chrome.tabs.executeScript(
                        activeTabs[0].id, {
                            file: 'send_links.js'
                        });
                });
        });
    });
};


chrome.extension.onRequest.addListener(function (urls) {
    //url打印在popup框
    var linksTable = document.getElementById('urls');
    for (var i = 0; i < urls.length; ++i) {
        var row = document.createElement('li');
        row.innerText = urls[i];
        row.style.whiteSpace = 'nowrap';
        linksTable.appendChild(row);
    }

    var JsonUrls = JSON.stringify(urls);
    console.log(JsonUrls)

    // var demoUrls = JSON.parse(JsonUrls);
    // console.log(demoUrls)

    fetch('http://syy.geovisweb.cn:10087/kg-0.2.4/records', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(urls)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            alert(1);
        })

    // $.ajax({
    //     url: '${pageContext.request.contextPath }/rest/jsonBody',
    //     type: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json;charset=UTF-8',
    //     data: JSON.stringify(urls),
    //     success: function (data, status) {

    //     }
    // });


});