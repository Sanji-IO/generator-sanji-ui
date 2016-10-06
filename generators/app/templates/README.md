# <%= appname %>

## Environment Variables
`API_TOKEN` for accessing ThingsPro RESTful API token
`BASE_PATH` for setting ThingsPro RESTful API base url. e.g. `https://localhost:8080/api/v1`

## Get Started
```sh
API_TOKEN=xxxx BASE_PATH=https://192.168.31.11/api/v1 npm start
```

## Build Component
```sh
npm run build
```

## Form Configuration
Modify `component.resource.json` file to create form elements by editing `fields` property.
You can reference [build-in form element](https://github.com/Sanji-IO/sanji-core-ui#form-config)
