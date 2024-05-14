FROM docker.elastic.co/logstash/logstash:7.10.2

RUN logstash-plugin install logstash-filter-geoip

RUN apt-get update && \
    apt-get install -y libmaxminddb0 libmaxminddb-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY GeoLite2-City.mmdb /usr/share/logstash