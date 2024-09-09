/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  console: {
    autodeploy: {
      target: (e) => {
        if (
          e.action === 'pushed' &&
          e.type === 'branch' &&
          e.branch === 'main'
        ) {
          return {
            stage: 'main',
          }
        }
      },
    },
  },
  app(input) {
    return {
      name: 'start-issue',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    }
  },
  async run() {
    new sst.aws.TanstackStart('MyWeb')
  },
})
