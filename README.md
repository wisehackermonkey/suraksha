# suraksha
Goal: Our mission is to empower migrant women (especially in low resource regions) to have a community of people to reach out to and resources to access.

What we learned:

How to implement a text based network
State Management using SMS
Migrant women's needs
Existing Cultural Networks with India
Leveraging resources such as NGOs
Developing self sustainable models for a non-profit
How we built it: We used Twillio's API to enable text messaging and used node js as our server/business logic

Challenges we faced:

To make our product available in low connectivity settings - opted for the text based option
Making our revenue model self sustainable while being non-exploitative (i.e. not relying on too many external resources for funding) - partnered with local business and telecom companies while also hiring a full time grant writer to source grants
Safety for migrant women - partnered with existing NGOs to train and vet local women who could act as guides
Managing a large population on our platform and localizing matches between migrant and local women
Maintaining a simple/cohesive user flow while meeting the addressing the most significant use cases


Built using
Javascript, node.js, and twilio api

Docker how to run
```bash

https://github.com/CloudNativeJS/docker
https://www.lynda.com/Node-js-tutorials/Liveness-readiness-endpoints/808675/2228137-4.html
https://helm.sh/docs/using_helm/#installing-helm
https://chocolatey.org/install
https://hub.helm.sh/charts?q=database
https://github.com/CloudNativeJS/helm

https://blog.machinebox.io/deploy-machine-box-in-digital-ocean-385265fbeafd

docker build -t sura-server -f Dockerfile .
docker run -i -p 80:8080 -t sura-server

in browser go to http://localhost/




RUN IN BUILD MODE
docker build -t sura-server-tools -f Dockerfile-tools .


docker run -i -v "$PWD"/package.json:/tmp/package.json -v "$PWD"/node_modules:/tmp/node_modules -w /tmp -t node:10 npm install


docker run -i -p 80:8080  -v "$PWD"/:/app -v "$PWD"/node_modules:/app/node_modules -t sura-server-tools /bin/run-dev


DEBUG
docker run -i -p 3000:8080 -p 9229:9229 -t sura-server-tools /bin/run-debug


DOCKER FILE RUN
wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/Dockerfile-run

docker build -t sura-server-run -f Dockerfile-run ./
docker run -i -p 80:8080 -t sura-server-run


docker files
wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/


docker tag sura-server-run wisehackermonkey/suraksha:1.0.0
docker login
docker push wisehackermonkey/suraksha:1.0.0
docker rmi wisehackermonkey/suraksha:1.0.0


docker pull wisehackermonkey/suraksha:1.0.0
docker run -i -p 80:8080 -t wisehackermonkey/suraksha:1.0.0


Helm:
https://helm.sh
install via chocolaty
choco install kubernetes-helm
download https://github.com/CloudNativeJS/helm
copy the /helm/chart to project
helm install --name

run helm chart
helm install --name suraksha-server chart/nodeserver
helm status suraksha-server

delete the deployment
helm delete --purge suraksha-server
helm install  --name suraksha-server  chart/nodeserver

update cluster while running
helm upgrade suraksha-server  chart/nodeserver
helm history suraksha-server
helm rollback  suraksha-server 1


deploy to digial ocean
docker-machine create --digitalocean-size "s-1vcpu-1gb" --driver digitalocean --digitalocean-access-token <PERSONAL_ACCESS_TOKEN> sura

#eval $(docker-machine env sura)
windows only
& "C:\Program Files\Docker\Docker\Resources\bin\docker-machine.exe" env sura | Invoke-Expression
run on server 
docker run -i -p 80:8080 -t wisehackermonkey/suraksha:1.0.0
docker run -d -p 80:8080 -t wisehackermonkey/suraksha:1.0.0
http://localhost:31322/ 
http://159.203.87.52/

```
