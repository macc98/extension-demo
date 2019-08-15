var LocalUrl = document.location.href
var urls = []

if (LocalUrl.indexOf("https://www.baidu.com") == 0) {
    console.log("符合")
    var links = [].slice.apply(document.getElementsByTagName('h3'));
    for (var i = 0; i < links["length"]; i++) {
        var sum = links[i].lastElementChild.href
        urls.push(sum)
    }
} else {
    console.log("不符合")
    urls[0] = LocalUrl
}


chrome.extension.sendRequest(urls);


// var links = [].slice.apply(document.getElementsByTagName('a'));
// for (var i = 0; i < links["length"]; i++) {
//     if((links[i].href.indexOf("https://www.baidu.com/link?url")==0 ||links[i].href.indexOf("http://www.baidu.com/link?url")==0) && (links[i].dataset.click != null)  )
//         urls.push(links[i].href)
//  }