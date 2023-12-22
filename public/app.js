const $items = $(".item");
const $show = $("#show");

$items.on("click", (event) => {
  const $item = $(event.target);
  const data = {
    _id: $item.attr("data-id"),
    title: $item.attr("data-title"),
    description: $item.attr("data-description"),
  };

  const html = `
        <div class="show">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <a href="/inventory/${data._id}/edit"><button>Edit</button></a>
        <form action="/inventory/${data._id}?_method=DELETE" method="post">
        <button>Delete</button>
        </form>
        </div>
    `;
  $show.html(html);
});
