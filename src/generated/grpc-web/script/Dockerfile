FROM node:16

WORKDIR /home/node/protoc
RUN wget https://github.com/protocolbuffers/protobuf/releases/download/v24.4/protoc-24.4-linux-x86_64.zip && unzip protoc-24.4-linux-x86_64.zip
RUN mv bin/protoc /usr/local/bin/ && mv include/* /usr/local/include/

WORKDIR /home/node/protoc/js
RUN wget https://github.com/protocolbuffers/protobuf-javascript/releases/download/v3.21.2/protobuf-javascript-3.21.2-linux-x86_64.zip && unzip protobuf-javascript-3.21.2-linux-x86_64.zip
RUN mv bin/protoc-gen-js /usr/local/bin/

WORKDIR /home/node/protoc/web
RUN wget https://github.com/grpc/grpc-web/releases/download/1.4.2/protoc-gen-grpc-web-1.4.2-linux-x86_64
RUN mv protoc-gen-grpc-web-1.4.2-linux-x86_64 /usr/local/bin/protoc-gen-grpc-web && chmod +x /usr/local/bin/protoc-gen-grpc-web

WORKDIR /home/node/app
RUN echo "Test for protoc installation\n" && protoc --version && protoc-gen-grpc-web --version
COPY ./js_output.sh .
ENTRYPOINT ["bash","./js_output.sh"]
