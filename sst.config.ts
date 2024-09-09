/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  console: {
    autodeploy: {
      target: (e) => {
        if (e.action === 'pushed' && e.type === 'branch') {
          const stage = e.branch === 'main' ? 'prod' : e.branch

          const webhook = process.env.WEBHOOK!
          fetch(webhook, {
            method: 'post',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              content: `Updating start on the \`${stage}\` stage.\n${e.commit.message}`,
            }),
          })
          return {
            stage,
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

    new sst.aws.TanstackStart('MyWeb', {
      link: [secret],
    })
  },
})
