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
		root: 'frontend/'
  },
  backend: {
  	root: 'backend/',
		backend: true,
		backendName: 'crawler'
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