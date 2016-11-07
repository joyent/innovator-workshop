
### What we are building

#### Microservices running in Docker on Triton

![image](./images/final.png)

#### Logging to Manta


### Running the slides

```sh
npm run build-slides
npm start
```

### Syllabus

#### Microservices running in Docker on Triton

1. Install dependencies and start frontend
1. Pull InfluxDB and run inside Docker
1. Connect InfluxDB to serializer service
1. Connect frontend to serializer service
1. Use docker-compose to run services
1. Connect temperature service to serializer
1. Connect humidity service to serializer
1. Connect motion service to serializer and use environment_file
1. Try to scale serializer service
1. Implement ContainerPilot and scale services


## Next Up: [Challenge 1](./challenge1/README.md)