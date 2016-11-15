
### What we are building

#### Microservices running in Docker on Triton

![image](./images/final.png)

### Running the slides

```sh
npm run build-slides
npm start
```

### Syllabus

a. Part 1 - Docker and Triton background
  1. Install Docker and Node.js
  1. Docker introduction
  1. Docker on Triton
  1. Triton CLI setup
  1. Deploying a Docker container to Triton
  1. Troubleshooting Docker on Triton

b. Part 2 - Microservices with Node.js and Docker
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

c. Part 3 - Running Docker on Triton
  1. Deploy containers to Triton
  1. Understanding CNS
  1. Reviewing my.joyent.com

d. Part 4 - Manta
  1. Pushing objects to Manta
  1. Executing Manta jobs


## Next Up: [Challenge 1](./challenge1/README.md)
