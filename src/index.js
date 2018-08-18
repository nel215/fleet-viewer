import uuid from 'uuid/v4';

function handleMessage(message) {
  console.log(message);
}
const port = browser.runtime.connect({
  name: uuid(),
});
port.onMessage.addListener(handleMessage);
