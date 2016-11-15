### Tools required

* Docker
* Node.js (tested on version 6)



## Setup
Clone the workshop repository to your local machine:

```bash
git clone https://github.com/joyent/innovator-workshop
cd innovator-workshop
yarn/npm install
# Install Docker if you haven't already
```


### Concepts Presented

* Microservices with Node.js
* Containers with Docker
* Service discovery with Consul
* Autopilot Pattern with ContainerPilot



### Syllabus: Part 1

1. Install Docker and Node.js
1. Docker introduction
1. Docker on Triton
1. Triton CLI setup
1. Deploying a Docker container to Triton
1. Troubleshooting Docker on Triton



### Syllabus: Part 2

1. Install dependencies and start frontend
1. Pull InfluxDB and run inside Docker
1. Connect InfluxDB to serializer service
1. Connect frontend to serializer service
1. Use docker-compose to run services
1. Connect temperature service to serializer
1. Connect humidity service to serializer
1. Connect motion service to serializer and use environment_file
1. Try to scale serializer service



### Syllabus: Part 3

1. Implement ContainerPilot and scale services
1. Deploying containers to Triton
1. Reviewing my.joyent.com
1. Understanding CNS



### Syllabus: Part 4 - Manta

1. Pushing objects to Manta
1. Executing Manta jobs



## Part 1 - Docker and Triton



### Install Docker & Node.js

* https://www.docker.com/products/docker
* nvm - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash`



### Docker Introduction

* OS level virtualization
* Allows containers close access to hardware
* Increased performance over KVM/other hardware virtualization solutions



### Docker Terminology

* Image: result of `docker build`, can be layered on top of each other, are basis for containers
* Container: runtime instance of an image: `docker run`
* Registry: hosted service for storing and serving images: `docker push` and `docker pull`
* Host: VM or physical machine running the docker daemon process, where containers will be running



### Dockerfile

* Defines manual steps to build an image

```
FROM mhart/alpine-node:6.9.1
COPY package.json /opt/slides/
RUN cd /opt/slides && npm install
WORKDIR /opt/slides/
CMD ["node", "server.js"]
```



### Docker on Triton

* The datacenter is the docker host
* Specify RAM/CPU/storage for each container
* Docker containers can be managed by Docker CLI or CloudAPI



### Docker Networking with Triton

* Ability to assign a real public IP to containers
* Firewall setup for containers
* Integration with container naming service (CNS). Name server configured with address records for containers. More later!



### Docker Registry Support

* Triton supports the use of Docker images maintained in the following types of registries
  - Docker Hub's public registry
  - Docker Hub's private registry
  - Self-hosted v1 and v2 Docker registry, including Docker Trusted Registry
  - quay.io v1 Docker registry
  - jFrog Artifactory v1 and v2 Docker registry
* You may connect to multiple registries at the same time and pull images from them simultaneously



### Triton CLI setup

* Install triton cli: `npm i -g triton`
* Create profile: `triton profile create`
* Verify profile works: `triton info`
* Configure docker environment: `eval $(triton env)`



### Deploying a Docker container to Triton

* Run an existing image:
```
docker run -it --rm busybox
```
* Check the instances running: `triton instances`
* Exit the container and it will be removed.



### Troubleshooting Docker on Triton

* Examine docker logs for the container `docker logs`
* Monitor resource usage in my.joyent.com



## Part 2 - Node.js Microservices and Docker



### Challenges

* Each challenge has its own folder
* Read the README.md for each challenge
* Each subsequent challenge has the solution to the previous challenge



### What we are Building

* Microservices that pull data from a service running on Triton
* Data is serialized and saved in InfluxDB
* Frontend presents the data as charts with live updates using WebSockets



### Challenge 1

* Start the frontend so that it's listening on port 10001.
* Verify the results by pointing your browser to [http://localhost:10001]().
* You should see a chart. Simple!



### Modules used for frontend

* WebSocket Stream - realtime data updates from server
* hapi - server framework (ask me if you have ?)
* rickshaw charts - charting for UI



### hapi

* plugin architecture
* works well for serving frontend assets and RESTful services



### Challenge 2

* Use docker to pull the tutum/influxdb image
* Create and run an influxdb container and create a `sensors` database
* Verify results in dashboard (port 8083)



### Why InfluxDB?

* Good Node.js support
* Time-series database, perfect for sensor data stream



### Docker run recap

* -e for environment variables
* -p for port mapping
* -d for detached mode



### Challenge 3 - microservices?

* Not a new concept; see the unix way
* Small, focused, decoupled components
* Independently deployable
* Well suited for Node.js



### Accelerated Development
* Small components (easily grokked)
* Independently deployable
* Easily replaceable



### Some Benefits
* Accelerated development
* [Optimized for delete](http://vimeo.com/108441214)
* Resilient, easy to scale



### Microservices tools used in the workshop

* Seneca
* Consul
* ContainerPilot
* Docker-compose



### Seneca?

* Node.js toolkit for microservices
* Uses actor model
* Transport agnostic, just JSON messages



### Challenge 3

* Start serializer with env variables to talk to influx
* Send serializer data and verify in influx dashboard
* ... stopping slides until challenge 11, refer to each README ....



### Challenge 11

* When ready to learn about Consul and ContainerPilot, open the next slide



## Part 3 - Autopilot Pattern with ContainerPilot



### Consul

* Service catalog/registry
* Simple API and works well with ContainerPilot



### ContainerPilot

* Implements [Autopilot Pattern](http://autopilotpattern.io/)
* Hooks for application running in docker (preStart, preStop, postStop)
* Register services with Consul
* Notifies application when dependencies change in Consul



### Combining Consul & ContainerPilot

* Alternative to loadbalancer (managed by developers)
* Need to be notified when dependent service changes
* Health monitoring our service
* Register our services with Consul and make it easy to find our dependencies



### Challenge 11

* All services are mostly updated to use Consul and ContainerPilot
* Update `docker-compose.yml` entries to link consul and set the `CONSUL_HOST` environment variable



### Challenge 12

* Use `docker compose scale` to scale individual services
* (scaling in this case means running more instances of a service)



### Triton

* Install triton cli: `npm i -g triton`
* Create profile: `triton profile create`
* Verify profile works: `triton info`



### Challenge 13

* Setup docker environment variables for triton
```
eval $(triton env)
```

* Deploy services to triton



### Triton Docker Build

* Avoid building images using triton
* Instead, pull from a docker registry, like docker hub
* Faster, and more stable



### Challenge 14

* Configure services to use CNS for locating consul service
* Scale consul cluster



### CNS

* Creates an Address record for each service with a cns label (`triton instance get`)
* Static value tied to user ID
* Can setup CNAME records to make the names friendlier (consul.workshop.host)



### Building and publishing slides example

* `docker build -t USER/slides:latest .`
* `docker push USER/slides:latest`
* `docker run -d -l "triton.cns.services=slides" -e "PORT=80" USER/slides:latest`



### my.joyent.com

* View usage
* View docker images in use
* View labels and tags



## Part 4 - Manta




### Contact Details

Email with questions:

* wyatt.preul@joyent.com
* shubhra.kar@joyent.com
