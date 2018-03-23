# Yugastore

This is a sample, end-to-end functional bookstore (or more generally, an e-commerce app) built using YugaByte DB. This app show how YugaByte-DB makes this development very simple by providing a Redis API, as well as a traditional tables/rows/structured query-language based API.

The app is continuously being improved. It currently features:
- products catalog listing
- product details page
- static product grouping (such as "business books", "mystery books", etc)
- dynamic product grouping (such as "most reviewed", "highest rated", etc)
- tracking for pageviews (both counts and referral for firther analysis)
- Coming soon: a shopping cart, online checkout, order history tracking.

![YugaStore](https://raw.githubusercontent.com/YugaByte/yugastore/master/screenshots/yugastore-screenshot.png)

This app is built using the following stack:
* Frontend: ReactJS
* Backend: Express and NodeJS
* Database: YugaByte DB

# Understanding the app

Review the design of the app in [YugaByte DB Docs](https://docs.yugabyte.com/develop/realworld-apps/ecommerce-app/).

# Running the sample app

## Run using docker

You can see the app at http://localhost:3001 after doing the following:

1. [Install YugaByte DB in docker](https://docs.yugabyte.com/quick-start/install/#docker) on your localhost.

2. Run the Yugastore app using the followign command:
```
docker run -p 3001:3001 -d --network yb-net --name yugastore yugabytedb/yugastore
```

## Run locally

1. [Install YugaByte DB](https://docs.yugabyte.com/quick-start/install/).

2. Run the following to initialize. Tweak the `config.json` file if needed.
```
$ cd yugastore
$ npm install # First time only
```

3. Run the following to populate data:
```
node models/yugabyte/db_init.js
```

4. Start the REST API server using:
```
$ npm start
```

5. Start the webserver using - this is optional:
```
$ cd yugastore/ui
$ npm install # First time only
$ npm start
```

## Run using kubernetes

1. [Install YugaByte DB in kubernetes](https://docs.yugabyte.com/quick-start/install/#kubernetes). Do not forget to initialize the Redis API using the following command after bringing up a local cluster:
```
kubectl exec -it yb-master-0 /home/yugabyte/bin/yb-admin -- --master_addresses yb-master-0.yb-masters.default.svc.cluster.local:7100,yb-master-1.yb-masters.default.svc.cluster.local:7100,yb-master-2.yb-masters.default.svc.cluster.local:7100 setup_redis_table
```

2. Bring up the ExpressJS + NodeJS + React app in a Kubernetes pod using the following command:
```
kubectl run yugastore --image=yugabytedb/yugastore:latest --port=3001 --command -- /usr/local/yugastore/bin/start-for-kubernetes.sh
```

You can verify this deployment is running using the following:
```
$ kubectl get deployments
NAME        DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
yugastore   1         1         1            1           13m
```

You can check all the running pods by doing:
```
$ kubectl get pods
NAME                        READY     STATUS    RESTARTS   AGE
yb-master-0                 1/1       Running   0          7h
yb-master-1                 1/1       Running   0          7h
yb-master-2                 1/1       Running   0          7h
yb-tserver-0                1/1       Running   0          7h
yb-tserver-1                1/1       Running   0          7h
yb-tserver-2                1/1       Running   0          7h
yugastore-55d7c6965-ql95t   1/1       Running   0          13m
```

3. Viewing the UI

- On localhost (minikube) cluster
On localhost minikube, do the following and see ui at http://localhost:3001:
```
kubectl port-forward yugastore-55d7c6965-ql95t 3001
```
Remember to substitute the pod name `yugastore-55d7c6965-ql95t` based on the output of `kubectl get pods` above.


- On a managed Kubernetes cluster (GKE, AKS, EKS)
These have integrated load-balancers. You can expose the app by performing the following:
```
$ kubectl expose deployment yugastore --type=LoadBalancer
service "yugastore" exposed
```
You can view the services with
```
$ kubectl get services
NAME          TYPE           CLUSTER-IP   EXTERNAL-IP   PORT(S)                               AGE
kubernetes    ClusterIP      10.0.0.1     <none>        443/TCP                               109d
yb-masters    ClusterIP      None         <none>        7000/TCP,7100/TCP                     7m
yb-tservers   ClusterIP      None         <none>        9000/TCP,9100/TCP,9042/TCP,6379/TCP   7m
yugastore     LoadBalancer   10.0.0.154   <pending>     3001:31141/TCP                        42s
```

You can open the UI using:
```
minikube service yugastore
```


2. Deploy the app 


# Run a load tester

The app comes with a load tester which mimics the behavior of an end user at a very high rate. You can run this as follows:

- Docker
```
docker exec -it yugastore node /usr/local/yugastore/test/sample-user.js
```

- Binary
```
node test/sample-user.js
```

- Kubernetes
```
kubectl exec -it yugastore-84d7479766-xwxml node /usr/local/yugastore/test/sample-user.js
```

You should be able to see the IOPS on the YugaByte DB UI. If you have installed it on your localhost, with default settings, you can see this on the [/tablet-servers](http://localhost:7000/tablet-servers) page. It should look something as follows.

![YugaByte DB load from Yugastore and load tester](https://raw.githubusercontent.com/YugaByte/yugastore/master/screenshots/yugastore-yb-iops-ui.png)


# Development against the app

To build a new docker image:

1. Rebuild the ui if something has changed.
```
cd ui && rm -rf build/ && npm run build
```

2. Rebuild the docker image:
```
docker build -t yugastore .
```
