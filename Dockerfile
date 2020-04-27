FROM alpine:latest
RUN apk add --update npm 
RUN apk add --update nodejs
RUN cd /opt/ && mkdir project && cd project
COPY . /opt/project/
RUN npm install
EXPOSE 8080
WORKDIR /opt/project
ENTRYPOINT ["npm"]
CMD ["start"]

