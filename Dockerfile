FROM ubuntu:latest
RUN apt-get update && apt-get install npm -y && apt-get install nodejs -y
RUN cd /opt/ && mkdir project && cd project
COPY . /opt/project/
RUN npm install
EXPOSE 8080
ENTRYPOINT ["/usr/sbin/npm"]
CMD ["start"]

