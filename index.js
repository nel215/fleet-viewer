function handleMessage(message) {
  console.log(message);
}
const port = browser.runtime.connect();
port.onMessage.addListener(handleMessage);
