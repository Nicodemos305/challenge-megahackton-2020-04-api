# challenge-megahackton-2020-04-api


#Requirements:
npm and nodejs

#Start server
npm start

#Make docker image
docker build -t financialapi:latest .

#Docker run
docker run -p80:8080 financialapi:latest


#TWILIO
Para testar a API do TWILIO, deverá configurar as seguinte váriaves de Ambiente:

TWILIO_ACCOUNT_SID: É o SID que existe na conta Twilio, referente ao seu cadastro
TWILIO_AUTH_TOKEN: É o TOKEN que existe na conta Twilio, referente ao seu cadastro
SEND_TOKEN: true: envia o token para o celular cadastrado, mas para isso, as duas váriaves devem exister e com valores válidos
           false: Não envia o token, mas grava no banco um valor padrão, para poder simular na tela de cadastro. Valor padrão: "123456"
