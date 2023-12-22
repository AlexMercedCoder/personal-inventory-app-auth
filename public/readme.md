## Public Folder

### Documentation: Use of "public" Folder in Express.js

#### Purpose:
- The `public` folder in an Express.js project serves as a directory for static files like images, CSS, and client-side JavaScript. These files don't change per request and are essential for the front-end of a web application.

#### Implementation:
- It's registered using `app.use(express.static("public"))`. This middleware function tells Express to serve static files from the `public` directory.

#### URL Mapping:
- When Express receives a request for a static file, it looks for the file in the `public` directory.
- For example, if there's a request for `/style.css`, Express searches for `public/style.css`.
- The URL path directly maps to the file structure within the `public` folder.

#### Benefits:
- Organizes front-end resources in a single location.
- Improves performance by efficiently serving static content.
- Simplifies URLs (no need to include `/public` in the path).
