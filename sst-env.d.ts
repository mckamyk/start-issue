/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "MyWeb": {
      "type": "sst.aws.TanstackStart"
      "url": string
    }
    "TestSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}
export {}
