(function(){
  async function syncNextEvent() {
    const targetUrl = '/home/';
    const targetId = 'next-event';
    const currentDiv = document.getElementById(targetId);
    if (!currentDiv) return;
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const htmlString = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const remoteDiv = doc.getElementById(targetId);
      if (remoteDiv) {
        currentDiv.innerHTML = remoteDiv.innerHTML;
      } else {
        console.warn(`Could not find #${targetId} on ${targetUrl}`);
      }
    } catch (error) {
      console.error('Error syncing event data:', error);
    }
  }
  syncNextEvent();
}()
