# create image from dockerfile
docker build -t compiuo:1.0.0 .

# run container from compiuo image
docker run -i -p 8000:8000 --name compiuo-app compiuo:1.0.0