# challenge-megahackton-2020-04-api


#Requirements:
npm and nodejs

#Start server
npm start

#Make docker image
docker build -t financialapi:latest .

#Docker run
docker run -p80:8080 financialapi:latest
