/// <reference path="./.sst/platform/config.d.ts" />

const webhook =
  'https://discord.com/api/webhooks/1282742099787251866/7VYfPWVON2tDT-rYAXcpdm445fjPoiF3bRzJIRhojgYEYN5VuPb7TP9X4ljRWp_E1ta2'

export default $config({
  console: {
    autodeploy: {
      target: (e) => {
        if (e.action === 'pushed' && e.type === 'branch') {
          const stage = e.branch === 'main' ? 'prod' : e.branch

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

    const web = new sst.aws.TanstackStart('MyWeb', {
      link: [secret],
    })

    return {
      url: web.url,
    }
  },
})
