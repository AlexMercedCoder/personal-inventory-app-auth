# Views Folder Documentation

## head.ejs

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><%= title %></title>
  <!-- EXTERNAL JS LIBRARIES YOU MAY WANT TO USE (Just Comment Out to Use) -->

  <!-- Jquery -->
  <!-- <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script> -->

  <!-- HTMX -->
  <!-- <script src="https://unpkg.com/htmx.org@1.9.9"></script> -->

  <!-- AlpineJS -->
  <!-- <script src="//unpkg.com/alpinejs" defer></script> -->

  <!-- JS AND CSS from public folder -->
  <link rel="stylesheet" href="/style.css" />
  <script src="/app.js" defer></script>
</head>
```

### Explanation of `head.ejs` File

The `head.ejs` file is a partial template for the `<head>` section of HTML documents in an Express.js application using EJS templating. It sets up several essential elements:

- **Character Set and Viewport**: The file specifies the character set (UTF-8) and the viewport settings for responsive design, ensuring compatibility across different devices and screen sizes.

- **Dynamic Title**: The title of the HTML document is dynamically set using EJS templating (`<%= title %>`), allowing different titles for different pages.

- **External JavaScript Libraries**: There are commented-out links to external JS libraries like jQuery, HTMX, and AlpineJS. These can be uncommented and used as needed.

- **Local CSS and JavaScript**: The file links to a stylesheet (`style.css`) and a JavaScript file (`app.js`) from the public folder, which are used for styling and functionality across the website.

This structure allows for a consistent and reusable head section across various pages of the web application.

## views/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("./partials/head.ejs", {title: "Main Page"}) %>

  <body>
    <h1>Main Page or "/"</h1>

    <a href="/sample"><button>Sample Page</button></a>
  </body>
</html>
```
### Explanation of HTML Template

This HTML template is structured for a basic web page:

- **DOCTYPE and Language**: It starts with the `<!DOCTYPE html>` declaration and specifies English (`lang="en"`) as the language.

- **Head Section**: The `<head>` section is included from a separate EJS partial file (`head.ejs`). The title for this page is set to "Main Page" through the passed parameter.

- **Body Content**: 
  - The body contains a heading (`<h1>`) that labels the page as "Main Page or '/'".
  - It also includes a link (`<a>`) with a button inside it. The button is labeled "Sample Page" and links to the `/sample` route.

This structure creates a simple and clean main page with navigation to a sample page.


## views/samples/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs", {title: "Samples Index Page"}) %>

  <body>
    <h1>Samples Index Page - views/samples/index.ejs</h1>

    <a href="/samples/new"><button>create new sample</button></a>

    <% samples.forEach((sample) => { %>

    <a href="/samples/<%= sample._id %>"> <h3><%= sample._id %></h3> </a>

    <% }) %>

    <a href="/sample"><button>Sample Page</button></a>
  </body>
</html>
```

This HTML document is a template for the "Samples Index Page." It includes a head section from head.ejs with the title "Samples Index Page". The body has a heading indicating its purpose and file location. There's a button linking to a route for creating a new sample. The page lists all samples, each represented by an ID. For each sample, there's a link that leads to a detailed view of that sample. Additionally, there's a button linking to a generic "Sample Page." This setup allows for easy navigation and management of sample items.

## views/samples/show.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs", {title: "Samples Show Page"}) %>

  <body>
    <h1>Samples Show Page - views/samples/show.ejs</h1>

    <h2>prop1: <%= sample.prop1 %></h2>
    <h2>prop2: <%= sample.prop2 %></h2>

    <a href="/samples/<%= sample._id %>/edit"><button>Edit</button></a>

    <form action="/samples/<%= sample._id %>?_method=DELETE" method="post">
      <button>delete</button>
    </form>

    <a href="/sample"><button>Sample Page</button></a>
  </body>
</html>
```

This HTML template is for a "Samples Show Page" in an Express.js application using EJS. It displays detailed information about a specific 'sample' item. The page includes a head section with a dynamic title, a header indicating the page's function and location (views/samples/show.ejs), and it displays properties prop1 and prop2 of the sample. There are options to edit the sample, linked via a button to an edit page, and a form for deleting the sample, using a POST request with a method override to DELETE. There's also a link to a general "Sample Page."

## views/samples/new.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs", {title: "Samples new Page"}) %>

  <body>
    <h1>Samples new Page - views/samples/new.ejs</h1>

    <form action="/samples" method="post">
      <label>prop1:<input type="text" name="prop1" /></label>
      <label>prop2:<input type="text" name="prop2" /></label>
      <button>Submit</button>
    </form>
  </body>
</html>
```

This HTML document is a template for a "New Sample" creation page in an Express.js application using EJS templating. It includes a head section from head.ejs with the title "Samples new Page". The body contains a heading, indicating the purpose and location of the template file (views/samples/new.ejs). The main feature is a form for creating a new sample, with two input fields (prop1 and prop2). The form submits these values via a POST request to the /samples route. This setup is used for adding new sample items to the application.

## views/samples/edit.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <%- include("../partials/head.ejs", {title: "Samples new Page"}) %>

  <body>
    <h1>Samples new Page - views/samples/new.ejs</h1>

    <form action="/samples/<%= sample._id %>?_method=PUT" method="post">
      <label
        >prop1:<input type="text" name="prop1" value="<%= sample.prop1 %>"
      /></label>
      <label
        >prop2:<input type="text" name="prop2" value="<%= sample.prop2 %>"
      /></label>
      <button>Submit</button>
    </form>
  </body>
</html>
```
This HTML document represents a web page for editing a 'sample' item. It includes the head section from head.ejs, setting the page title to "Samples new Page". The body of the page contains a heading indicating the page's purpose and its location in the views directory. The form is designed to edit properties of a sample item. It submits to the /samples/[sample_id] route using a POST request, but with a method override to PUT, indicating an update operation. Two input fields are provided for editing properties prop1 and prop2 of the sample, with their current values prefilled. A submit button is included to complete the action.
