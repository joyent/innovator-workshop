echo "Killing all node procs"
pkill -9 node
echo "Stopping all containers"
docker stop $(docker ps -a -q)
echo "Removing all containers"
docker rm $(docker ps -a -q)
echo "Removing any <none> images"
docker rmi $(docker images | grep '<none>' | awk '{print $3}') -f
echo "Removing any containersummit images"
docker rmi $(docker images | grep 'containersummit' | awk '{print $3}') -f
echo "Removing challenge images"
docker rmi $(docker images | grep 'challenge' | awk '{print $3}') -f
echo "Removing final images"
docker rmi $(docker images | grep 'final' | awk '{print $3}') -f

# echo "Removing tutum image"
# docker rmi $(docker images | grep '^tutum' | awk '{print $3}')
# echo "Removing node image"
# docker rmi $(docker images | grep '^node' | awk '{print $3}')
