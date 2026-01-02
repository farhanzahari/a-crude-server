# A CRUDe Server
A simple server to store item code, name, tags, and it's decription.

## How to deploy
You can either use Codespaces.

Or deploy locally into your PC:

1. Clone this repo.
2. Make sure [Node.js](https://nodejs.org/en) is installed.
3. Navigate the terminal into this file

Then

1. Run `npm install`.
2. Run `npx tsx index.ts`
3. Type 'http://localhost:3000/' to confirm it is alive.

*Note:
- For Codespaces. After `npm install` if Node version error is shown, try `npm rebuild` and run again.

## How to CRUD
You can use [curl](https://curl.se/) or if you deploy locally - [Postman](https://www.postman.com/downloads/) desktop.

Available endpoints:

1. POST http://localhost:3000/apiv1/item/create
2. GET http://localhost:3000/apiv1/item/all
3. GET http://localhost:3000/apiv1/item/id/:id
4. GET http://localhost:3000/apiv1/item/code/:code
5. GET http://localhost:3000/apiv1/item/tags/:tags
6. PUT http://localhost:3000/apiv1/item/update/:id
7. DELETE http://localhost:3000/apiv1/item/delete/:id

### 1. Create item (http://localhost:3000/apiv1/item/create) (POST)
The (POST) endpoint will receive the item (JSON) data and store it into a database. 

Example payload (JSON):
```json
{
    "code": "SKU000001", // Required and must be unique.
    "name": "Item 1", // Optional
    "tags": "electronics", // Optional
    "description": "Item 1 description." // Optional
}
```
Upon success the response will send the payload back with status `201`.

Example `curl`:

`curl -X POST http://localhost:3000/apiv1/item/create -H "Content-Type: application/json" -d '{"code":"SKU000001", "name":"Item 1", "tags":"electronics", "description":"Item 1 description."}'`

will return

```json
{
    "id": 1,
    "code": "SKU000001",
    "name": "Item 1",
    "tags": "electronics",
    "description": "Item 1 description."
}
```
as the response payload with status `201`.

### 2. Get all item (http://localhost:3000/apiv1/item/all) (GET)
The (GET) endpoint will send back a list of all item.

Example `curl`:
`curl http://localhost:3000/apiv1/item/all`
will return
```json
[
    {
        "id": 1,
        "code": "SKU000001",
        "name": "Item 1",
        "tags": "electronics",
        "description": "Item 1 description."
    },
    {
        "id": 2,
        "code": "SKU000002",
        "name": "Item 2",
        "tags": "electronics",
        "description": "Item 2 description."
    }
]
```
as the response payload with status `200`.

### 3. Get item by `id` (http://localhost:3000/apiv1/item/id/:id) (GET)
The (GET) endpoint will send back an item with the supplied `id` in the url.

Example `curl`:
`curl http://localhost:3000/apiv1/item/id/1`
will return
```json
{
    "id": 1,
    "code": "SKU000001",
    "name": "Item 1",
    "tags": "electronics",
    "description": "Item description."
}
```
as the response payload with status `200`.

### 4. Get item by `code` (http://localhost:3000/apiv1/item/code/:id) (GET)
The (GET) endpoint will send back an item with the supplied `code` in the url.

Example `curl`:
`curl http://localhost:3000/apiv1/item/code/SKU000001`
will return
```json
{
    "id": 1,
    "code": "SKU000001",
    "name": "Item 1",
    "tags": "electronics",
    "description": "Item description."
}
```
as the response payload with status `200`.

### 5. Get item by `tags` (http://localhost:3000/apiv1/item/tags/:tags) (GET)
The (GET) endpoint will send back items with the supplied `code` in the url.

Example `curl`:
`curl http://localhost:3000/apiv1/item/tags/electronics`
will return
```json
[
    {
        "id": 1,
        "code": "SKU000001",
        "name": "Item 1",
        "tags": "electronics",
        "description": "Item 1 description."
    },
    {
        "id": 2,
        "code": "SKU000002",
        "name": "Item 2",
        "tags": "electronics",
        "description": "Item 2 description."
    }
]
```
as the response payload with status `200`.

### 6. Update item by `id` (http://localhost:3000/apiv1/item/id/:id) (PUT)
The (PUT) endpoint will update an item with the supplied `id` in the url.

Example update payload (JSON):
```json
{
    "code": "SKU000001",
    "name": "Item 1",
    "tags": "essentials",
    "description": "Item 1 description."
}
```

Example `curl`:
`curl -X PUT http://localhost:3000/apiv1/item/update/id/1 -H "Content-Type: application/json" -d '{"code":"SKU000001", "name":"Item 1", "tags":"essentials", "description":"Item 1 description."}'`
will return
```json
{
    "id": 1,
    "code": "SKU000001",
    "name": "Item 1",
    "tags": "essentials",
    "description": "Item 1 description."
}
```
as the response payload with status `201`.

### 7. Delete item by `id` (http://localhost:3000/apiv1/item/delete/id/:id) (DELETE)
The (DELETE) endpoint will delete a resource with the supplied `id`.

Example `curl`:
`curl -X DELETE http://localhost:3000/apiv1/item/delete/id/1`
will delete the resource with `"id": 1` and return status `204` (nothing).