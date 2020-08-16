import * as contentful from 'contentful'

export default (context, inject) => {
  const config = {
    space: context.env.ctfSpaceId,
    accessToken: context.env.ctfCdaAccessToken
  }

  const ctfClient = contentful.createClient(config)
  inject('ctfClient', ctfClient)
}