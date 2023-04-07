
# E-Commerce CURD

Several of its metrics are taken from this dashboard. The superadmin adds the store owner (seller) as well as Amin and the customers to it.

A super admin can add admins, sellers, customers, delivery agents ,delete admins, sellers and customers,delivery agents and update the information of admins, sellers, customers and delivery agents. 

The Admin only will have to add sellers, customers, categories and subcategories, products, and ratings&reviews.

The Seller only will have to Add and Edit products, and ratings&reviews.

## JSON DB was used as the data base.
To run JSON DB: 
Open CMD on db.json file
Run the Command: json-server --watch db.json
## Technologies
 - [Bootstrap 4]()
- [Angular 12]()
- [Angular Material 12]()
- [Typescript 4]()
- [HTML 5]()
- [CSS 3]()
- [SCSS]()
## To Login Dashboard

userName: superadmin@gmail.com
password: 123456

## USER's API Reference

#### Create Users

```http
  POST http://localhost:3000/tenets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formData` | `Object` | **Required**. |

#### Get All Users

```http
  GET http://localhost:3000/tenets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `Object` | **Required**. |

#### Get User By ID

```http
  GET /http://localhost:3000/tenets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Update User By ID

```http
  PUT /http://localhost:3000/tenets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

#### Delete User By ID

```http
  DELETE /http://localhost:3000/tenets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |


## Categories API Reference

```http
  POST http://localhost:3000/categories
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formData` | `Object` | **Required**. |

#### Get All Categories

```http
  GET http://localhost:3000/categories
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `Object` | **Required**. |

#### Get Categories By ID

```http
  GET /http://localhost:3000/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of Categories to fetch |

#### Update Categories By ID

```http
  PUT /http://localhost:3000/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of Categories to fetch |

#### Delete Categories By ID

```http
  DELETE /http://localhost:3000/categories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of Categories to fetch |

## Sub Categories API Reference

```http
  POST http://localhost:3000/subcategories
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `formData` | `Object` | **Required**. |

#### Get All Sub Categories

```http
  GET http://localhost:3000/subcategories
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `Object` | **Required**. |

#### Get Sub Categories By ID

```http
  GET /http://localhost:3000/subcategories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of subcategories to fetch |

#### Update Sub Categories By ID

```http
  PUT /http://localhost:3000/subcategories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of subcategories to fetch |

#### Delete Categories By ID

```http
  DELETE /http://localhost:3000/subcategories/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of subcategories to fetch |

#### Get All Prodcuts

```http
  GET http://localhost:3000/prodcuts
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `Object` | **Required**. |

#### Get Sub Categories By ID

```http
  GET /http://localhost:3000/prodcuts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of prodcuts to fetch |

#### Update Prodcuts By ID

```http
  PUT /http://localhost:3000/prodcuts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of prodcuts to fetch |

#### Delete Prodcuts By ID

```http
  DELETE /http://localhost:3000/prodcuts/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of prodcuts to fetch |
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#0080ff](https://via.placeholder.com/10/0a192f?text=+) #0080ff |
| Seconday Color | ![#191d33](https://via.placeholder.com/10/f8f8f8?text=+) #191d33 |


## Demo

Insert gif or link to demo


## Deployment
To run the project run
```bash
ng serve
```
To test  the project run
```bash
ng test
```
To build this project run

```bash
  npm build --prod
```


## Features

- Live previews
- Cross platform
- Responsive
- Role Base access



## Installation

Install E-Commerce Curd with npm

```bash
  cd E-Commerce Curd
  npm install
  ng serve
```
    
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## Run Locally

Clone the project

```bash
  git clone https://github.com/ayodya1206/ecommerce-crud
```

Go to the project directory

```bash
  cd ecommerce-crud
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Tech Stack

**Client:** Angular 12, Typescript,HTML5,CSS3,SCSS,

**Server:** JSON


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

