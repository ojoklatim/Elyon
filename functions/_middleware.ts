export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // List of file extensions that should be served as-is
    const staticExtensions = [
      '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2',
      '.ttf', '.eot', '.ico', '.json', '.map', '.webp', '.webm', '.mp4', '.pdf'
    ];

    // Check if the requested path is a static file
    const isStaticFile = staticExtensions.some(ext => pathname.endsWith(ext));
    
    // If it's a static file or the assets folder, serve it as-is
    if (isStaticFile || pathname.startsWith('/assets/')) {
      return fetch(request);
    }

    // For all other routes, serve index.html (SPA routing)
    const indexUrl = new URL('/index.html', url.origin);
    return fetch(new Request(indexUrl, {
      method: 'GET',
      headers: request.headers
    }));
  }
};
