export REACT_APP_API_URL=http://34.150.242.227:8090/admin
export REACT_APP_PAGE_LIMIT=10
export REACT_APP_SQUARE_APP_ID=sandbox-sq0idb-raZSqkk_Wfa0Xt8QFgBoWw
export REACT_APP_SQUARE_LOCATION_ID=L8RXWHYKF6EW0
export REACT_APP_SOCKET_URL=http://34.150.242.227:8090
export REACT_APP_SOCKET_KEY=b536235a-053f-11ec-9a03-0242ac130003

#rm -rf node_modules package-lock.json

#npm i

npm run build

rm admin.tar.gz

tar -czf admin.tar.gz ./build

scp admin.tar.gz erodrigues@wellness-production:/var/www

ssh wellness-production -t "cd /var/www/admin.wellness.com; rm -rf *; mv ../admin.tar.gz ./; tar -xzvf admin.tar.gz; mv build/* ./; rm -rf ./build;"
