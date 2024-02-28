proto=/usr/local/mnt/proto
output=/usr/local/mnt/output
protoc Message2Clients.proto --proto_path=$proto --js_out=import_style=commonjs:$output
protoc Message2Clients.proto --proto_path=$proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:$output
protoc MessageType.proto --proto_path=$proto --js_out=import_style=commonjs:$output
protoc MessageType.proto --proto_path=$proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:$output
protoc Message2Server.proto --proto_path=$proto --js_out=import_style=commonjs:$output
protoc Message2Server.proto --proto_path=$proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:$output
protoc Services.proto --proto_path=$proto --js_out=import_style=commonjs:$output
protoc Services.proto --proto_path=$proto --grpc-web_out=import_style=typescript,mode=grpcwebtext:$output
