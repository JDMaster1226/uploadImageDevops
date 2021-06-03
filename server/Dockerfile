FROM ubuntu:20.04

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get --assume-yes update && \
apt-get --assume-yes install \
git \
make \
build-essential \
wget \
curl \
npm && \
curl -fsSL https://deb.nodesource.com/setup_16.x && apt-get install -y nodejs

WORKDIR /app

RUN git clone https://github.com/pjreddie/darknet.git
RUN cd darknet && wget https://pjreddie.com/media/files/yolov3.weights

RUN cd darknet && make

COPY package.json .
RUN npm i
COPY . .

CMD ["node", "index"]
