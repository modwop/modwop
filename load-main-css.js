(function(){
  async function syncMainCSS() {
    const targetUrl = '/'; 
    const cssId = 'main-stylesheet';
    const currentLink = document.getElementById(cssId);
    if (!currentLink) return;
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const htmlString = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const remoteLink = doc.getElementById(cssId);
      if (remoteLink) {
        const remoteHref = remoteLink.getAttribute('href');
        if (remoteHref && currentLink.getAttribute('href') !== remoteHref) {
          currentLink.href = remoteHref;
          console.log(`CSS synced to: ${remoteHref}`);
        }
      } else {
        console.warn(`ID #${cssId} not found on ${targetUrl}`);
      }
    } catch (error) {
      console.error('Error syncing CSS:', error);
    }
  }
  syncMainCSS();
})()
