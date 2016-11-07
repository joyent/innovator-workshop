### Tools required

* Docker
* Node.js (tested on version 6)



## Setup
Clone the workshop repository to your local machine:

```bash
git clone https://github.com/joyent/containersummit-workshop
cd containersummit-workshop
yarn/npm install
# Install Docker if you haven't already
```



## Building and scaling microservices with ContainerPilot and Node.js

* Adapted from [_microservices-iot_](https://github.com/nearform/micro-services-tutorial-iot)
* Adapted from [_microservices-workshop_](https://github.com/lloydbenson/microservices-workshop)

Presented by Wyatt Preul & Shubhra Kar



### Challenges

* Each challenge has its own folder
* Read the README.md for each challenge
* Each subsequent challenge has the solution to the previous challenge



### What we are Building

* Microservices that pull data from SmartThings service
* Data is serialized and saved in InfluxDB
* Frontend presents the data as charts with live updates using WebSockets



### Concepts Presented

* Containers
* Service discovery
* Microservices
* Autopilot Pattern



### Challenge 1

* Start the frontend so that it's listening on port 10001.
* Verify the results by pointing your browser to [http://localhost:10001]().
* You should see a chart. Simple!



### Modules used for frontend

* WebSockets - realtime data updates from server
* hapi - server framework (ask me if you have ?)
* rickshaw charts - charting for UI



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

* Not a new concept; see unix
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



### Consul

* Service catalog/registry
* Simple API and works well with ContainerPilot



### ContainerPilot

* Implements [Autopilot Pattern](http://autopilotpattern.io/)
* Hooks for application running in docker (preStart, preStop, postStop)
* Makes it trivial to register service with Consul
* Notifies application when dependencies change in Consul



### Combining Consul & ContainerPilot

* Alternative to loadbalancer (managed by developers)
* Need to be notified when dependent service changes
* Health monitoring our service
* Register our services with consul and make it easy to find our dependencies



### Challenge 11

* All services are mostly updated to use consul and ContainerPilot
* Update `docker-compose.yml` entries to link consul and set the `CONSUL_HOST` environment variable



### Contact Details

Email with questions:

* wyatt.preul@joyent.com
* shubhra.kar@joyent.com
