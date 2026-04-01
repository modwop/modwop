(function(){
  async function syncMainCSS() {
    const targetUrl = '/'; // Your main home page
    const cssId = 'main-stylesheet'; // The ID on your <link rel="stylesheet"> tag
    
    // 1. Find the existing link tag on the current page
    const currentLink = document.getElementById(cssId);
    if (!currentLink) {
      console.warn(`Local link with ID #${cssId} not found.`);
      return;
    }

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const htmlString = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      
      // 2. Find the link tag in the fetched HTML
      const remoteLink = doc.getElementById(cssId);
      
      if (remoteLink && remoteLink.href) {
        // 3. Update the local href to match the remote href
        // This effectively "reloads" the CSS if the filename changed (e.g., main.css?v=2)
        currentLink.href = remoteLink.href;
      } else {
        console.warn(`Could not find #${cssId} on ${targetUrl}`);
      }
    } catch (error) {
      console.error('Error syncing CSS:', error);
    }
  }

  syncMainCSS();
})()
