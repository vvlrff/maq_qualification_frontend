FROM docker.elastic.co/logstash/logstash:7.10.2

RUN logstash-plugin install logstash-filter-geoip

RUN apt-get update && \
    apt-get install -y build-essential libmaxminddb0 libmaxminddb-dev

RUN /usr/share/logstash/bin/logstash-plugin install --no-verify --local /usr/share/logstash/plugins/maxminddb-1.3.0.gem

COPY GeoLite2-City.mmdb /usr/share/logstash