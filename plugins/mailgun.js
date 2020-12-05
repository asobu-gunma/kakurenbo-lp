import mailgun from 'mailgun.js'

export default (context, inject) => {
  const config = {
    username: 'api',
    key: context.env.mailgunKey,
  }

  const mgClient = mailgun.client(config)
  inject('mgClient', mgClient)
}