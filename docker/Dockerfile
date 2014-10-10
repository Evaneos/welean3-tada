FROM debian:squeeze
MAINTAINER Evaneos <whatsup@evaneos.com>

RUN echo "deb http://ftp.fr.debian.org/debian/ squeeze main"         >  /etc/apt/sources.list
RUN echo "deb http://ftp.fr.debian.org/debian/ squeeze-updates main" >> /etc/apt/sources.list
RUN echo "deb http://security.debian.org squeeze/updates main"       >> /etc/apt/sources.list

RUN apt-get update && apt-get install -y wget python-software-properties
RUN wget -qO - http://www.dotdeb.org/dotdeb.gpg | apt-key add -

RUN echo "deb http://packages.dotdeb.org squeeze all"                >> /etc/apt/sources.list
RUN echo "deb-src http://packages.dotdeb.org squeeze all"            >> /etc/apt/sources.list

# RUN apt-get update && apt-get --reinstall install -y --force-yes libc6=2.11.3-4 libc-bin=2.11.3-4
RUN apt-get update && apt-get install -y python-pip
RUN apt-get install -y openssh-server vim nano htop git curl
RUN pip install supervisor

RUN echo 'root:evaneos' | chpasswd

RUN apt-get update && apt-get install -y php5-fpm php-pear nginx \
    memcached imagemagick php5-apc php5-curl php5-gd php5-imagick php5-memcached php5-intl \
    php5-suhosin php5-pgsql php5-xdebug libcurl3-dev php5-dev libc6-dev build-essential php5-memcache

# NodeJS (via NVM)
RUN git clone https://github.com/creationix/nvm.git /.nvm
RUN echo ". /.nvm/nvm.sh" >> /etc/bash.bashrc
RUN /bin/bash -c '. /.nvm/nvm.sh && nvm install v0.10.24 && nvm use v0.10.24 && nvm alias default v0.10.24 && ln -s /.nvm/v0.10.24/bin/node /usr/bin/node && ln -s /.nvm/v0.10.24/bin/npm /usr/bin/npm'

##################
# CONFIGURE PHP
##################

# Http extension
RUN pecl install http://pecl.php.net/get/pecl_http-1.7.6.tgz
RUN echo "extension=http.so" > /etc/php5/fpm/conf.d/http.ini

# Php conf
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/g" /etc/php5/fpm/php.ini
RUN sed -i "s/upload_max_filesize = 2M/upload_max_filesize = 15M/g" /etc/php5/fpm/php.ini
RUN sed -i "s/post_max_size = 8M/post_max_size = 15M/g" /etc/php5/fpm/php.ini
RUN sed -i "s/session.save_handler = files/session.save_handler = memcache/g" /etc/php5/fpm/php.ini
RUN echo "session.save_path = \"tcp://127.0.0.1:11111?persistent=1&timeout=1&retry_interval=15\"" >> /etc/php5/fpm/php.ini

##################
# TOOLS
##################

RUN wget http://getcomposer.org/composer.phar -qO /usr/local/bin/composer && chmod +x /usr/local/bin/composer
RUN composer global require 'phpunit/phpunit=~4.0' 'squizlabs/php_codesniffer=~1.0'
RUN composer config -g github-oauth.github.com 4369aee16f2c23066e237b76a92a19ab5b25f2da
RUN npm install -g grunt grunt-cli bower

RUN rm /etc/nginx/sites-enabled/default && rm /etc/nginx/sites-available/default

##################
# DAEMONS CONFIG
##################

ADD slash/etc/nginx/nginx.conf                      /etc/nginx/nginx.conf
ADD slash/etc/php5/fpm/pool.d/fpm-pool.conf         /etc/php5/fpm/pool.d/www.conf
ADD slash/etc/php5/fpm/php-fpm.conf                 /etc/php5/fpm/php-fpm.conf
ADD slash/etc/php5/fpm/conf.d/suhosin.ini           /etc/php5/fpm/conf.d/suhosin.ini
ADD slash/etc/php5/fpm/conf.d/xdebug.ini            /etc/php5/fpm/conf.d/xdebug.ini

##################
# SUPERVISOR.D
##################

RUN mkdir /etc/supervisord.conf.d
ADD supervisord.conf /etc/supervisord.conf
ADD slash/etc/supervisord.conf.d/nginx.conf         /etc/supervisord.conf.d/nginx.conf
ADD slash/etc/supervisord.conf.d/php5-fpm.conf      /etc/supervisord.conf.d/php5-fpm.conf
ADD slash/etc/supervisord.conf.d/ssh.conf           /etc/supervisord.conf.d/ssh.conf
ADD slash/etc/supervisord.conf.d/memcached.conf     /etc/supervisord.conf.d/memcached.conf
ADD slash/etc/supervisord.conf.d/nodejs.conf        /etc/supervisord.conf.d/nodejs.conf

##################
# AUTHENTICATION
##################

RUN mkdir -p /root/.ssh
RUN mkdir -p /root/.composer

RUN echo 'root:welean' | chpasswd

##################
# REQUIRED DIRECTORIES
##################

RUN mkdir -p /var/run/sshd/
RUN mkdir -p /var/log/memcached/

EXPOSE 80
EXPOSE 22
EXPOSE 3000
EXPOSE 3001

CMD [ supervisord ]