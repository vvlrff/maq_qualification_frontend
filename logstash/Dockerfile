FROM docker.elastic.co/logstash/logstash:7.10.2

RUN logstash-plugin install logstash-filter-geoip
RUN /usr/share/logstash/bin/logstash-plugin install logstash-filter-maxminddb

COPY GeoLite2-City.mmdb /usr/share/logstash