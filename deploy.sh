source .env

npm run build
scp -r ./build/* $SERVER_USER:/root/ohmycology/build/
ssh $SERVER_USER '/root/.nvm/versions/node/v14.18.1/bin/pm2 restart 0'