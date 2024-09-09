/// <reference path="./.sst/platform/config.d.ts" />

const postMessage = async (
  stage: string,
  commitMessage: string,
  commitHash: string,
) => {
  const webhook =
    'https://discord.com/api/webhooks/1282742099787251866/7VYfPWVON2tDT-rYAXcpdm445fjPoiF3bRzJIRhojgYEYN5VuPb7TP9X4ljRWp_E1ta2'

  const content: string[] = [
    `## Updating **Start** on ${stage}.`,
    `Commit Message: ${commitMessage}`,
    `Links:`,
    `- [SST Console](https://console.sst.dev/foobarbinbaz/start/${stage}/resources)`,
    `- [Deployment CICD](https://console.sst.dev/foobarbinbaz/start/${stage}/autodeploy)`,
    `- [GH Commit](https://github.com/mckamyk/start-issue/commit/${commitHash})`,
  ]

  fetch(webhook, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      content: content.join('\n'),
    }),
  })
}

export default $config({
  console: {
    autodeploy: {
      target: (e) => {
        if (e.action === 'pushed' && e.type === 'branch') {
          const stage = e.branch === 'main' ? 'prod' : e.branch

          postMessage(stage, e.commit.message, e.commit.id)
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
