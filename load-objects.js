async function loadEvents(eventTargets) {
  // 1. Group IDs by URL to prevent redundant fetches
  const urlMap = new Map();

  eventTargets.forEach(({ targetUrl, targetId }) => {
    if (!urlMap.has(targetUrl)) {
      urlMap.set(targetUrl, []);
    }
    urlMap.get(targetUrl).push(targetId);
  });

  // 2. Iterate over the unique URLs
  for (const [url, ids] of urlMap) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();

      // 3. Update every element associated with this specific URL
      ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          // Replace this with your specific rendering logic
          element.innerHTML = `Event: ${data.name}`; 
        }
      });
    } catch (error) {
      console.error(`Failed to load ${url}:`, error);
    }
  }
}
