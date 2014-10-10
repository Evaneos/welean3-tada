```
git clone git@github.com:Evaneos/welean3-tada /projects/welean3-tada

cd /projects/welean3-tada/docker
docker build -t tada .
cd /projects/welean3-tada

docker run -t -i -d -p 80:80 -p 23:22 -v /projects/welean3-tada/:/welean3-tada/ tada supervisord
```
