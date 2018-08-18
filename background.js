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
    console.log(body);
    filter.disconnect();
  }
}, {
  urls: ['http://203.104.209.55/*'],
  types: ['xmlhttprequest'],
}, [
  'blocking',
]
);
