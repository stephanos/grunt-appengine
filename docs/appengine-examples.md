# Usage Example

```js
appengine: {
  options: {
    manageFlags: {
      oauth2: true
    },
    runFlags: {
      port: 8080
    }
  },
  
  frontend: {
  	options: {
    	root: "frontend/"
		}
  },
  backend: {
    options: {
      backend: true,
      backendName: "crawler",

      root: "backend/"
    }
  }
}
```

All options are optional.


**Running the dev server**

```shell
$ grunt appengine:frontend:run
```


**Update the frontend**

```shell
$ grunt appengine:frontend:update
```


**Update the backend**

```shell
$ grunt appengine:backend:update
```