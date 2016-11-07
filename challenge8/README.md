## Solution to Challenge 7

1. Add the following to the `docker-compose.yml` file

  ```
  temperature:
    build: ./temperature
    links:
      - serializer:serializer
    environment:
      - SERIALIZER_HOST=serializer
      - SERIALIZER_PORT=10000
      - SMARTTHINGS_HOST=smartthings.svc.30f62ec2-24a2-6f8e-8fad-d46b04c8a0b9.us-sw-1.triton.zone
      - SMARTTHINGS_PORT=8000
    restart: always
  ```
2. Build and run the containers `docker-compose up -d`
3. Point your browser to [http://localhost:10001/]() to see the chart.
4. Write data to the serializer using the `serializer/testWrite.sh` script.

Stop the containers by using the `docker-compose down`.


## Challenge 8

![image](../images/challenge8.png)

The frontend is updated with a chart for 'humidity', and now there is a new humidity service that behaves like the temperature service. It will pull data from our MultiSensor and report it to the serializer.

Update the `docker-compose.yml` file to include the `humidity` service.

__hint__ look at the existing temperature service for an example

## Next Up: [Challenge 9](../challenge9/README.md)
