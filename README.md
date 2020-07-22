# COVID Map - Map to view COVID-19 cases on Mexico

Map to view COVID-19 cases on Mexico, developed with ReactJs.

![Luxelare](./src/assets/images/logo.png)


### 🛠️ Installation

📌**Development Environment**

Require Docker

#### Creating Network
```
docker network create --attachable covidnet
```

#### Backend API
Creating Docker Image and running the container
```
docker build -t covid-api .
docker run --name covid-api --net=covidnet -it --rm -p 8000:8000 covid-api
```
>Uncomment RUN echo "ALLOWED_HOSTS = ['*']" >> covid_api/settings.py
>This project runs on **http://localhost:8000**

#### Frontend
*For running local frontend with Hot Reloading
```
npm install
npm run dev
```
Create a **.env** file at root level following the example file (.env-example).
```
PORT=9000
NODE_ENV=development
API_URL=http://localhost:8000
```
>This project runs on **http://localhost:9000** or the specified **PORT** on the .env file.

*For running local frontend from the container
```
docker build -t covid-frontend .
docker run --name covid-frontend --net=covidnet --rm -p 9000:9000 covid-frontend
```


#### Reverse Proxy

*For running local proxy from the container
```
docker build -t covid-proxy .
docker run --name covid-proxy --net=covidnet --rm -p 5000:5000 covid-proxy
```


### 🖥 Execution

📌**Development as Production Environment**
```
npm run dev
```

>This project runs on **http://localhost:9000** or the specified **PORT** on the .env file.


### 💻 Technologies

  * React
  * ESLint
  * Webpack
  * Docker


### ✒️ Author

* **William Velazquez** - [WilliamVelazquez](https://williamvelazquez.com/)

If you want to know about the insights [click here!](https://github.com/WilliamVelazquez/covid-map/pulse/monthly)


## 📄License

This project is licensed under the terms of the **MIT license**.


### 🎁 Contribute

Feel free to contribute to the project!
