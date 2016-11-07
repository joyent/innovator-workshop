## Solution to Bonus

```
docker-compose scale serializer=2
```


## Take Home Assignment

Deploy everything to Triton.

*** Solution ***

```sh
eval $(triton env)
docker-compose up -d
```

Now everything is running on the Joyent Public Cloud!

To find your frontend use:

```sh
triton ip frontend
```

## Next Up: Have Fun!