/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  console: {
    autodeploy: {
      target: (e) => {
        if (
          e.action === 'pushed' &&
          e.type === 'pull_request' &&
          e.base === 'main'
        ) {
          return {
            stage: `pr-${e.number}`,
          }
        }

        if (
          e.action === 'pushed' &&
          e.type === 'branch' &&
          e.branch === 'main'
        ) {
          return {
            stage: 'prod',
          }
        }
      },
    },
  },
  app(input) {
    return {
      name: 'start',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    new sst.aws.TanstackStart('MyWeb')
  },
})
