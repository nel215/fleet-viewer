const ports = []
function handleConnect(port) {
  console.log('port added', port);
  ports.push(port);
}
browser.runtime.onConnect.addListener(handleConnect);

browser.webRequest.onBeforeRequest.addListener(function(details){
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();
  let body = "";

  filter.onstart = event => {
    console.log("started");
  }

  filter.ondata = event => {
    let str = decoder.decode(event.data);
    body += str;
    filter.write(event.data);
  }

  filter.onstop = event => {
    console.log("finished");
    try {
      ports.forEach((port) => {
        port.postMessage({
          'body': body,
          'url': details.url,
        });
      });
    } catch (e) {
      console.log(e);
    }
    filter.disconnect();
  }
}, {
  urls: ['http://203.104.209.55/*'],
  types: ['xmlhttprequest'],
}, [
  'blocking',
]
);

browser.browserAction.onClicked.addListener((tab) => {
  browser.windows.create({
    type: 'panel',
    url: '/dist/index.html',
  });
});
