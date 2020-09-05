# COVID Map - Map to view COVID-19 cases on Mexico

Map to view COVID-19 cases on Mexico, developed with ReactJs.

![Luxelare](./src/assets/images/logo.png)


## 🛠️ Installation

📌**Development Environment**

Require Docker

### Creating Network
```
docker network create --attachable covidnet
```

### Backend API
Creating Docker Image and running the container
```
docker build -t covid-api .
docker run --name covid-api --net=covidnet -it --rm -p 8000:8000 covid-api
```
>Run over the Server Folder inside the Backend Project

>Uncomment RUN echo "ALLOWED_HOSTS = ['*']" >> covid_api/settings.py

>This project runs on **http://localhost:8000**

### Frontend
*For running local frontend with Hot Reloading
Require NodeJs
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


### Reverse Proxy

*For running local proxy from the container
```
docker build -t covid-proxy .
docker run --name covid-proxy --net=covidnet --rm -p 5000:5000 covid-proxy
```
>Run over the nginx Folder inside the Frontend Project

>This project runs on **http://localhost:5000** and shows the frontend over **http://localhost:5000/app** and the backend api over **http://localhost:5000/api**


## 🖥 Execution

📌**Development as Production Environment**

### Docker Compose
Creating cluster, network and running the containers
```
docker-compose up
```

>This project runs on **http://localhost:8080/** to see the traefik dashboard and shows the frontend over **http://localhost:5000/** and the backend api over **http://localhost:5000/api**

For stopping the services run:
```
docker-compose down
```

### Docker Swarm
Creating cluster, network and running the containers
```
docker swarm init
docker network create --driver=overlay traefik-public
docker stack deploy -c docker-swarm.yml covid
```

>This project runs on **http://localhost:8080/** to see the traefik dashboard and shows the frontend over **http://localhost:5000/** and the backend api over **http://localhost:5000/api**

For stopping the cluster run:
```
docker swarm leave --force 
```

### Kubernetes

Require Kind and Kubectl

🔹 Creating cluster using [kind](https://kind.sigs.k8s.io/)
```
kind create cluster --config kind-config.yaml
kind get clusters
```
>*Default cluster context name is `kind`.

🔹 Creating services, deployments and running the containers locally with [kind](https://kind.sigs.k8s.io/docs/user/quick-start/)
```
kubectl get nodes

kind load docker-image covid-api
kubectl apply -f kube/covid-api.yaml

kind load docker-image covid-frontend
kubectl apply -f kube/covid-frontend.yaml

kind load docker-image covid-proxy
kubectl apply -f kube/covid-proxy.yaml
```

🔹 Deleting deployments, services and the cluster 
```
kubectl delete deploy/covid-proxy
kubectl delete service/covid-proxy


kubectl delete deploy/covid-api
kubectl delete service/covid-api


kubectl delete deploy/covid-frontend
kubectl delete service/covid-frontend

kind delete cluster --name kind
```

🔹 Other Useful Commands (Not necessary)
```
kubectl cluster-info
kubectl get nodes
kubectl get services -o wide --watch
kubectl get pods -o wide
kubectl get all -o wide

kubectl describe pod covid-frontend

kubectl port-forward service/covid-api 8000:8000
kubectl port-forward service/covid-frontend 9000:9000
kubectl port-forward service/covid-proxy 5000:5000

kubectl expose deployment covid-frontend --port=9000

kubectl exec -it service/covid-frontend -n covid-frontend -- bash
kubectl exec -it service/covid-frontend -- bash

ClusterIP  -  ContainerPort
curl http://10.97.199.118:9000

docker exec -it kind-control-plane bash
```


### 💻 Technologies

  * React
  * ESLint
  * Webpack
  * Traefik
  * Docker
  * Docker Swarm
  * Kind
  * Kubernetes


### ✒️ Author

* **William Velazquez** - [WilliamVelazquez](https://williamvelazquez.com/)

If you want to know about the insights [click here!](https://github.com/WilliamVelazquez/covid-map/pulse/monthly)


📷 Screenshots

![Map](./.readme-static/map.png)
![Data](./.readme-static/data.png)
![Dashboard](./.readme-static/traefik-dashboard.png)
![Routers](./.readme-static/traefik-routers.png)
![Services](./.readme-static/traefik-services.png)


## 📄License

This project is licensed under the terms of the **MIT license**.


### 🎁 Contribute

Feel free to contribute to the project!
