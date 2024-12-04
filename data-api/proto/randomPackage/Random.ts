// Original file: proto/random.proto

import type * as grpc from "@grpc/grpc-js";
import type { MethodDefinition } from "@grpc/proto-loader";
import type {
  DataResponse as _randomPackage_DataResponse,
  DataResponse__Output as _randomPackage_DataResponse__Output,
} from "../randomPackage/DataResponse";
import type {
  Empty as _randomPackage_Empty,
  Empty__Output as _randomPackage_Empty__Output,
} from "../randomPackage/Empty";

export interface RandomClient extends grpc.Client {
  GetDataByDepartment(
    argument: _randomPackage_Empty,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  GetDataByDepartment(
    argument: _randomPackage_Empty,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  GetDataByDepartment(
    argument: _randomPackage_Empty,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  GetDataByDepartment(
    argument: _randomPackage_Empty,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  getDataByDepartment(
    argument: _randomPackage_Empty,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  getDataByDepartment(
    argument: _randomPackage_Empty,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  getDataByDepartment(
    argument: _randomPackage_Empty,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
  getDataByDepartment(
    argument: _randomPackage_Empty,
    callback: grpc.requestCallback<_randomPackage_DataResponse__Output>
  ): grpc.ClientUnaryCall;
}

export interface RandomHandlers extends grpc.UntypedServiceImplementation {
  GetDataByDepartment: grpc.handleUnaryCall<_randomPackage_Empty__Output, _randomPackage_DataResponse>;
}

export interface RandomDefinition extends grpc.ServiceDefinition {
  GetDataByDepartment: MethodDefinition<
    _randomPackage_Empty,
    _randomPackage_DataResponse,
    _randomPackage_Empty__Output,
    _randomPackage_DataResponse__Output
  >;
}
