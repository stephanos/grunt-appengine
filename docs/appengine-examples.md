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
$ grunt appengine:run:frontend
```


**Update the frontend**

```shell
$ grunt appengine:update:frontend
```


**Update the backend**

```shell
$ grunt appengine:update:backend
```