/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  console: {
    autodeploy: {
      target: (e) => {
        if (e.action === 'pushed' && e.type === 'branch') {
          return {
            stage: e.branch === 'main' ? 'prod' : e.branch,
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
    const secret = new sst.Secret('TestSecret')

    new sst.aws.TanstackStart('MyWeb')
  },
})
