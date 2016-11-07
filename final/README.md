## Solution to Challenge 11

1. Add the following information to each service other than consul and influx

  ```
links:
  - consul:consul
environment:
  - CONSUL_HOST=consul
  ```
2. Update the `sensors.env` with the `CONSUL_HOST=consul` entry (if not done in `docker-compose.yml`)
3. Build and run the containers `docker-compose up -d`
4. Launch the frontend and view the charts flowing-in


## Bonus

Scale the services independently (`docker-compose scale`). You can also kill individual services (`docker stop` or `docker kill`) and watch their dependent services respond gracefully.

## Next Up: [Bonus](../bonus/README.md)