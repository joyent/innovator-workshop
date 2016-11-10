## Solution to Challenge 13

```sh
eval $(triton env)
docker-compose up -d
```

Now everything is running on the Joyent Public Cloud!

To find your frontend use:

```sh
triton ip frontend
```


## Challenge 14

Consul is now available using an alias setup by CNS. You can use `triton instances` to list your instances and `triton instance get` to get the CNS records for an instance. Get the alias used for consul and update the `CONSUL_HOST` records and `CONSUL` record to use the CNS value. Deploy the changes and scale the number of consul instances to 3.


## Next Up: Have Fun!