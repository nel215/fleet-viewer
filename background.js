const ports = {};
function handleConnect(port) {
  console.log('port added', port);
  ports[port.name] = port;
  port.onDisconnect.addListener((p) => {
    console.log('port deleted', p);
    delete ports[p.name];
  });
}
browser.runtime.onConnect.addListener(handleConnect);

function handleBeforeRequest(details) {
  const filter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder('utf-8');
  let body = '';
  console.log(details);

  filter.onstart = () => {
    console.log('started');
  };

  filter.ondata = (event) => {
    const str = decoder.decode(event.data);
    body += str;
    filter.write(event.data);
  };

  filter.onstop = () => {
    console.log('finished');
    try {
      if (details.url.endsWith('/kcsapi/api_start2/getData')) {
        browser.storage.local.set({ master: body }).then(
          () => {
            console.log('set master');
            filter.disconnect();
          },
          (e) => {
            console.log(e);
            filter.disconnect();
          },
        );
      } else {
        for (name in ports) {
          ports[name].postMessage({
            body,
            url: details.url,
          });
        }
        filter.disconnect();
      }
    } catch (e) {
      console.log(e);
      filter.disconnect();
    }
  };
}

browser.webRequest.onBeforeRequest.addListener(
  handleBeforeRequest,
  {
    urls: ['http://203.104.209.55/*'],
    types: ['xmlhttprequest'],
  },
  ['blocking'],
);

browser.browserAction.onClicked.addListener(() => {
  browser.windows.create({
    type: 'panel',
    url: '/dist/index.html',
    height: 960,
    width: 480,
  });
});
